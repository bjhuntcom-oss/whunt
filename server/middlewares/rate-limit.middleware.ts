import { Request, Response, NextFunction } from "express";
import { getRedisClient } from "../services/redis";

const DEFAULT_RATE_LIMIT = 100;
const WINDOW_MS = 60_000;

// Fallback in-memory store for when Redis is unavailable
interface SlidingWindowEntry {
  timestamps: number[];
}

const memoryStore = new Map<string, SlidingWindowEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of memoryStore) {
    entry.timestamps = entry.timestamps.filter((t) => t > now - WINDOW_MS);
    if (entry.timestamps.length === 0) {
      memoryStore.delete(key);
    }
  }
}, 30_000).unref();

function getLimit(): number {
  const envVal = process.env.API_RATE_LIMIT;
  if (envVal) {
    const parsed = parseInt(envVal, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return DEFAULT_RATE_LIMIT;
}

function getTenantKey(req: Request): string {
  const user = (req as any).session?.user;
  if (user?.id) return `user:${user.id}`;

  const apiUser = req.apiUser;
  if (apiUser?.userId) return `apiuser:${apiUser.userId}`;

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";
  return `ip:${ip}`;
}

function isExempt(path: string): boolean {
  if (path.startsWith("/api/webhooks")) return true;
  if (path.startsWith("/webhooks")) return true;
  if (path === "/api/version") return true;
  if (path === "/api/health") return true;
  if (path.startsWith("/api/agents/online")) return true;
  return false;
}

async function checkRateLimitRedis(key: string, limit: number, now: number): Promise<{ allowed: boolean; remaining: number; oldestTimestamp?: number }> {
  const redisClient = getRedisClient();
  if (!redisClient) {
    return checkRateLimitMemory(key, limit, now);
  }
  
  const redisKey = `ratelimit:${key}`;
  const windowStart = now - WINDOW_MS;

  try {
    // Use Redis pipeline for atomic operations
    const pipeline = redisClient.pipeline();
    
    // Remove old timestamps
    pipeline.zremrangebyscore(redisKey, 0, windowStart);
    
    // Count current requests in window
    pipeline.zcard(redisKey);
    
    // Add current timestamp
    pipeline.zadd(redisKey, now, `${now}-${Math.random()}`);
    
    // Set expiry
    pipeline.expire(redisKey, Math.ceil(WINDOW_MS / 1000));
    
    // Get oldest timestamp for retry-after calculation
    pipeline.zrange(redisKey, 0, 0, "WITHSCORES");
    
    const results = await pipeline.exec();
    
    if (!results) throw new Error("Redis pipeline failed");
    
    const count = (results[1][1] as number) || 0;
    const oldestEntry = results[4][1] as string[];
    const oldestTimestamp = oldestEntry && oldestEntry.length > 1 ? parseInt(oldestEntry[1], 10) : now;
    
    return {
      allowed: count < limit,
      remaining: Math.max(0, limit - count - 1),
      oldestTimestamp
    };
  } catch (error) {
    console.error("[RateLimit] Redis error, falling back to memory:", error);
    return checkRateLimitMemory(key, limit, now);
  }
}

function checkRateLimitMemory(key: string, limit: number, now: number): { allowed: boolean; remaining: number; oldestTimestamp?: number } {
  let entry = memoryStore.get(key);
  if (!entry) {
    entry = { timestamps: [] };
    memoryStore.set(key, entry);
  }

  entry.timestamps = entry.timestamps.filter((t) => t > now - WINDOW_MS);

  if (entry.timestamps.length >= limit) {
    return {
      allowed: false,
      remaining: 0,
      oldestTimestamp: entry.timestamps[0]
    };
  }

  entry.timestamps.push(now);

  return {
    allowed: true,
    remaining: limit - entry.timestamps.length,
    oldestTimestamp: entry.timestamps[0]
  };
}

export async function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.path.startsWith("/api")) return next();
  if (isExempt(req.path)) return next();

  const limit = getLimit();
  const key = getTenantKey(req);
  const now = Date.now();

  const result = await checkRateLimitRedis(key, limit, now);

  res.setHeader("X-RateLimit-Limit", String(limit));
  res.setHeader("X-RateLimit-Remaining", String(result.remaining));
  res.setHeader("X-RateLimit-Reset", String(Math.ceil((now + WINDOW_MS) / 1000)));

  if (!result.allowed) {
    const oldestInWindow = result.oldestTimestamp || now;
    const retryAfter = Math.ceil((oldestInWindow + WINDOW_MS - now) / 1000);

    res.setHeader("Retry-After", String(retryAfter));

    return res.status(429).json({
      error: "Too many requests. Please try again later.",
      retryAfter,
    });
  }

  next();
}
