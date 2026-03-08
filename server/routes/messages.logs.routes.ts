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

import type { Express } from 'express';
import { whuntLogger, HTTP_STATUS, WHUNT_BRAND } from "@whunt/core";
import { getMessageLogs, updateMessageStatus } from '../controllers/messages.logs.controller';
import { requireAuth } from '../middlewares/auth.middleware';

export function registerMessageLogsRoutes(app: Express) {
  app.get('/api/messages/logs', requireAuth, getMessageLogs);

  app.put('/api/messages/:messageId/status', requireAuth, updateMessageStatus);
}