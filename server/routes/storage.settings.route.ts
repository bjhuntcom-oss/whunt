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
  getStorageSettings,
  getActiveStorage,
  updateStorageSetting,
  deleteStorageSetting,
  testStorageConnection,
} from "../controllers/storage.settings.controller";
import type { Express } from "express";

export function registerStorageSettingsRoutes(app: Express) {
  app.get("/api/storage-settings", getStorageSettings);
  app.get("/api/storage-settings/active", getActiveStorage);
  app.post("/api/storage-settings/update", updateStorageSetting);
  app.post("/api/storage-settings/test", testStorageConnection);
  app.delete("/api/storage-settings/:id", deleteStorageSetting);
}
