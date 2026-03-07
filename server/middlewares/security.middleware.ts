import type { Request, Response, NextFunction } from "express";

const isProd = process.env.NODE_ENV === "production";

/**
 * Security headers middleware (replaces Helmet for zero-dep setup).
 * Sets all OWASP-recommended HTTP response headers.
 */
export function securityHeaders(_req: Request, res: Response, next: NextFunction): void {
  // Prevent MIME sniffing
  res.setHeader("X-Content-Type-Options", "nosniff");
  // Block framing (clickjacking protection)
  res.setHeader("X-Frame-Options", "DENY");
  // XSS filter (legacy browsers)
  res.setHeader("X-XSS-Protection", "1; mode=block");
  // Referrer policy
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  // Permissions policy — restrict sensitive browser features
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
  );
  // Content Security Policy — strict in production
  if (isProd) {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",  // needed for React inline scripts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https:",
        "connect-src 'self' wss: ws:",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join("; ")
    );
    // Force HTTPS for 1 year
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  // Remove fingerprinting header
  res.removeHeader("X-Powered-By");
  next();
}

/**
 * CORS middleware with environment-based allowlist.
 * Falls back to same-origin when no ALLOWED_ORIGINS is configured.
 */
const rawOrigins = process.env.ALLOWED_ORIGINS ?? "";
const allowedOrigins: Set<string> = rawOrigins
  ? new Set(rawOrigins.split(",").map((o) => o.trim()).filter(Boolean))
  : new Set();

export function corsMiddleware(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;

  if (!origin) {
    // Same-origin or server-to-server — allow
    return next();
  }

  // Allow if in allowlist OR if in dev mode
  if (!isProd || allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Requested-With"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Max-Age", "86400");
    res.setHeader("Vary", "Origin");
  }

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  next();
}
