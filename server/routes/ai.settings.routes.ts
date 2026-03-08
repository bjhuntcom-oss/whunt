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

import express from "express";
import { whuntLogger, HTTP_STATUS, WHUNT_BRAND } from "@whunt/core";
import {
  getAISettings,
  createAISettings,
  updateAISettings,
  deleteAISettings,
  getAISettingByChannelId
} from "../controllers/ai.settings.controller";
import type { Express } from "express";

export function registerAISettingsRoutes(app: Express) {

app.get("/api/ai-settings", getAISettings);
app.post("/api/ai-settings", createAISettings);
app.put("/api/ai-settings/:id", updateAISettings);
app.delete("/api/ai-settings/:id", deleteAISettings);
app.get("/api/ai-settings/channel/:channelId", getAISettingByChannelId);

}
