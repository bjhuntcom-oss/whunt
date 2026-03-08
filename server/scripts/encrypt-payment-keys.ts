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

/**
 * Migration script to encrypt existing payment provider secrets
 * 
 * Usage:
 *   ENCRYPTION_KEY=<your-key> tsx server/scripts/encrypt-payment-keys.ts
 * 
 * Generate key with:
 *   openssl rand -hex 32
 */

import { db } from "../db";
import { paymentProviders } from "@shared/schema";
import { encryptSecret, isEncrypted } from "../utils/encryption";

async function encryptPaymentKeys() {
  console.log("[Migration] Starting payment key encryption...");
  
  if (!process.env.ENCRYPTION_KEY) {
    console.error("❌ ENCRYPTION_KEY environment variable is required");
    console.error("Generate one with: openssl rand -hex 32");
    process.exit(1);
  }
  
  try {
    const providers = await db.select().from(paymentProviders);
    
    let encrypted = 0;
    let skipped = 0;
    
    for (const provider of providers) {
      const config = provider.config as any;
      if (!config) continue;
      
      let updated = false;
      const newConfig = { ...config };
      
      // Encrypt API keys
      if (config.apiKey && !isEncrypted(config.apiKey)) {
        newConfig.apiKey = encryptSecret(config.apiKey);
        updated = true;
      }
      
      if (config.apiKeyTest && !isEncrypted(config.apiKeyTest)) {
        newConfig.apiKeyTest = encryptSecret(config.apiKeyTest);
        updated = true;
      }
      
      // Encrypt secrets
      if (config.apiSecret && !isEncrypted(config.apiSecret)) {
        newConfig.apiSecret = encryptSecret(config.apiSecret);
        updated = true;
      }
      
      if (config.apiSecretTest && !isEncrypted(config.apiSecretTest)) {
        newConfig.apiSecretTest = encryptSecret(config.apiSecretTest);
        updated = true;
      }
      
      // Encrypt public keys (for completeness)
      if (config.publicKey && !isEncrypted(config.publicKey)) {
        newConfig.publicKey = encryptSecret(config.publicKey);
        updated = true;
      }
      
      if (updated) {
        await db
          .update(paymentProviders)
          .set({ config: newConfig })
          .where(eq(paymentProviders.id, provider.id));
        
        console.log(`✅ Encrypted keys for provider: ${provider.providerKey}`);
        encrypted++;
      } else {
        console.log(`⏭️  Skipped ${provider.providerKey} (already encrypted or no keys)`);
        skipped++;
      }
    }
    
    console.log("\n[Migration] Complete!");
    console.log(`  Encrypted: ${encrypted} providers`);
    console.log(`  Skipped: ${skipped} providers`);
    
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

// Import eq for the update query
import { eq } from "drizzle-orm";

encryptPaymentKeys()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
