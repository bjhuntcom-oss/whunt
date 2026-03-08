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
import * as messagesController from "../controllers/messages.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { insertMessageSchema } from "@shared/schema";
import { handleDigitalOceanUpload, upload } from "../middlewares/upload.middleware";

export function registerMessageRoutes(app: Express) {
  // Get messages for conversation
  app.get("/api/conversations/:conversationId/messages",upload.single("media"),handleDigitalOceanUpload, messagesController.getMessages);

  // Create message in conversation
  app.post("/api/conversations/:conversationId/messages",upload.single("media"),handleDigitalOceanUpload,
    messagesController.createMessage
  );

  // Send WhatsApp message
  app.post("/api/messages/send", messagesController.sendMessage);

  // get media url
  app.get("/api/messages/media-url", messagesController.getMediaUrl);
  
  
  // get media proxy
  app.get("/api/messages/media-proxy", messagesController.getMediaProxy);
  
}