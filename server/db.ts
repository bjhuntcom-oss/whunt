/**
 * ============================================================
 * © 2025 Whunt — WhatsApp Marketing Platform
 * Original Author: BTPL Engineering Team
 * Website: https://whunt.io
 * Contact: support@whunt.io
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */

import { Pool } from "pg";
import { WHUNT_BRAND } from "@whunt/core";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import "dotenv/config";


if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: parseInt(process.env.DB_POOL_MAX || '25', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    allowExitOnIdle: true,
  });

  pool.on('error', (err) => {
    console.error(`[${WHUNT_BRAND.name}] Unexpected database pool error:`, err.message);
  });
  
  export const db = drizzle(pool, { schema });

  const readPool = process.env.DATABASE_READ_URL
    ? new Pool({
        connectionString: process.env.DATABASE_READ_URL,
        max: parseInt(process.env.DB_POOL_MAX || '25', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
        allowExitOnIdle: true,
      })
    : pool;

  if (process.env.DATABASE_READ_URL) {
    readPool.on('error', (err) => {
      console.error(`[${WHUNT_BRAND.name}] Unexpected read replica pool error:`, err.message);
    });
    console.log(`[${WHUNT_BRAND.name}] Read replica database configured`);
  }

  export const dbRead = process.env.DATABASE_READ_URL
    ? drizzle(readPool, { schema })
    : db;

