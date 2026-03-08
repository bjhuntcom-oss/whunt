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

import type { Express } from "express";
import { whuntLogger, HTTP_STATUS, WHUNT_BRAND } from "@whunt/core";
import * as dashboardController from "../controllers/dashboard.controller";
import { extractChannelId } from "../middlewares/channel.middleware";
import { requireAuth, requirePermission } from "../middlewares/auth.middleware";
import { PERMISSIONS } from "@shared/schema";


export function registerDashboardRoutes(app: Express) {
  // Get dashboard statistics
  app.get("/api/dashboard/stats",
    extractChannelId,
    dashboardController.getDashboardStats
  );


  app.get("/api/dashboard/admin/stats", dashboardController.getDashboardStatsForAdmin)
  app.get("/api/dashboard/user/stats", dashboardController.getDashboardStatsForUser);

  // Get analytics data
  app.get("/api/analytics",
    extractChannelId,requireAuth,
    requirePermission(PERMISSIONS.ANALYTICS_VIEW),
    dashboardController.getAnalytics
  );

  // Create analytics entry
  app.post("/api/analytics", dashboardController.createAnalytics);
}