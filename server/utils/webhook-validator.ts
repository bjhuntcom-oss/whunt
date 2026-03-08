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

import crypto from "crypto";

export function validateWebhookSignature(
  body: any,
  signature: string | undefined,
  appSecret: string
): boolean {
  if (!signature) {
    return false;
  }

  const elements = signature.split("=");
  const signatureHash = elements[1];
  const expectedHash = crypto
    .createHmac("sha256", appSecret)
    .update(JSON.stringify(body))
    .digest("hex");

  return signatureHash === expectedHash;
}

export function getWebhookVerifyToken(): string {
  return process.env.WEBHOOK_VERIFY_TOKEN || "your_webhook_verify_token";
}
