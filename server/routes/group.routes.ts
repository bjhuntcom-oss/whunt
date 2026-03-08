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

import { Express } from "express";
import { whuntLogger, HTTP_STATUS, WHUNT_BRAND } from "@whunt/core";
import {
  createGroup,
  getGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addContactsToGroup,
  removeContactsFromGroup,
  getGroupContactCount,
} from "../controllers/group.controller";
import { requireAuth } from "server/middlewares/auth.middleware";

export function registerGroupRoutes(app: Express) {
  app.post("/api/groups", requireAuth, createGroup);
  app.get("/api/groups", requireAuth, getGroups);
  app.get("/api/groups/contact-counts", requireAuth, getGroupContactCount);
  app.get("/api/groups/:id", requireAuth, getGroupById);
  app.put("/api/groups/:id", requireAuth, updateGroup);
  app.delete("/api/groups/:id", requireAuth, deleteGroup);
  app.post("/api/groups/add-contacts", requireAuth, addContactsToGroup);
  app.post("/api/groups/remove-contacts", requireAuth, removeContactsFromGroup);
}
