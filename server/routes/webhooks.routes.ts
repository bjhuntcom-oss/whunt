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
import * as webhooksController from "../controllers/webhooks.controller";

export function registerWebhookRoutes(app: Express) {
  // Get webhook configs
  app.get("/api/webhook-configs-channel-id/:id", webhooksController.getWebhookConfigsByChannelId);

  app.get("/api/webhook-configs", webhooksController.getWebhookConfigs);
  
  // Create webhook config
  app.post("/api/webhook-configs", webhooksController.createWebhookConfig);
  
  // Update webhook config
  app.patch("/api/webhook-configs/:id", webhooksController.updateWebhookConfig);
  
  // Delete webhook config
  app.delete("/api/webhook-configs/:id", webhooksController.deleteWebhookConfig);
  
  // Test webhook
  app.post("/api/webhook-configs/:id/test", webhooksController.testWebhook);

  // Get global webhook URL
  app.get("/api/webhook/global-url", webhooksController.getGlobalWebhookUrl);

  // Global webhook endpoint
  app.all("/webhook/global", webhooksController.handleWebhook);
  app.all("/webhook/:id", webhooksController.handleWebhook);

  // ==================== PAYMENT WEBHOOKS ====================

  app.post('/webhooks/razorpay', webhooksController.razorpayWebhook);

  // Stripe Webhook
  app.post('/webhooks/stripe', webhooksController.stripeWebhook);

  // PayPal Webhook
  app.post('/webhooks/paypal', webhooksController.paypalWebhook);

  // Paystack Webhook
  app.post('/webhooks/paystack', webhooksController.paystackWebhook);

  // Mercado Pago Webhook
  app.post('/webhooks/mercadopago', webhooksController.mercadopagoWebhook);
} 
