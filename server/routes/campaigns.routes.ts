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
import { campaignsController } from "../controllers/campaigns.controller";
import { extractChannelId } from "../middlewares/channel.middleware";
import { requireAuth, requirePermission } from "../middlewares/auth.middleware";
import { PERMISSIONS } from "@shared/schema";
import { requireSubscription } from "server/middlewares/requireSubscription";

export function registerCampaignRoutes(app: Express) {
  // Get all campaigns
  app.get("/api/campaigns", 
    extractChannelId,
    requireAuth,
    requirePermission(PERMISSIONS.CAMPAIGNS_VIEW),
    campaignsController.getCampaigns
  );

  // Get campaign by ID
  app.get("/api/campaigns/:id",  requireAuth,
  requirePermission(PERMISSIONS.CAMPAIGNS_VIEW), 
    campaignsController.getCampaign
  );

  // Create new campaign
  app.post("/api/campaigns",   requireAuth,
  requirePermission(PERMISSIONS.CAMPAIGNS_CREATE), requireSubscription("campaign"), 
    campaignsController.createCampaign
  );



  app.post("/api/getCampaignsByUserId", requireAuth, campaignsController.getCampaignByUserID);

   

  // Update campaign status
  app.patch("/api/campaigns/:id/status", requireAuth,
  requirePermission(PERMISSIONS.CAMPAIGNS_EDIT),
    campaignsController.updateCampaignStatus
  );

  // Delete campaign
  app.delete("/api/campaigns/:id", requireAuth,
  requirePermission(PERMISSIONS.CAMPAIGNS_DELETE),
    campaignsController.deleteCampaign
  );

  // Start campaign execution
  app.post("/api/campaigns/:id/start", 
    campaignsController.startCampaign
  );

  // Get campaign analytics
  app.get("/api/campaigns/:id/analytics", 
    campaignsController.getCampaignAnalytics
  );

  // API campaign endpoint
  app.post("/api/campaigns/send/:apiKey", requireAuth,
  requirePermission(PERMISSIONS.CAMPAIGNS_SEND),
    campaignsController.sendApiCampaign
  );
}