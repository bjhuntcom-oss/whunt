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

import { z } from "zod";

// Schema for user data stored in localStorage
export const StoredUserSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  role: z.string().min(1),
  permissions: z.array(z.string()),
  avatar: z.string().optional(),
  createdAt: z.string().optional(),
  tenantId: z.string().uuid().optional(),
  createdBy: z.string().nullable().optional(),
});

export type StoredUser = z.infer<typeof StoredUserSchema>;

// Schema for site ID
export const SiteIdSchema = z.string().uuid();

/**
 * Safely parse and validate user data from localStorage
 * Returns null if data is invalid or missing
 */
export function getValidatedUser(): StoredUser | null {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    const userData = JSON.parse(userStr);
    const result = StoredUserSchema.safeParse(userData);
    
    if (!result.success) {
      console.warn("[Storage] Invalid user data in localStorage:", result.error.errors);
      // Clear invalid data
      localStorage.removeItem("user");
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error("[Storage] Failed to parse user data:", error);
    localStorage.removeItem("user");
    return null;
  }
}

/**
 * Safely parse and validate site ID from localStorage
 * Returns null if data is invalid or missing
 */
export function getValidatedSiteId(): string | null {
  try {
    const siteId = localStorage.getItem("selectedSiteId");
    if (!siteId) return null;
    
    const result = SiteIdSchema.safeParse(siteId);
    
    if (!result.success) {
      console.warn("[Storage] Invalid site ID in localStorage");
      localStorage.removeItem("selectedSiteId");
      return null;
    }
    
    return result.data;
  } catch (error) {
    console.error("[Storage] Failed to parse site ID:", error);
    localStorage.removeItem("selectedSiteId");
    return null;
  }
}

/**
 * Safely set user data in localStorage with validation
 */
export function setValidatedUser(user: StoredUser): boolean {
  try {
    const result = StoredUserSchema.safeParse(user);
    
    if (!result.success) {
      console.error("[Storage] Cannot store invalid user data:", result.error.errors);
      return false;
    }
    
    localStorage.setItem("user", JSON.stringify(result.data));
    return true;
  } catch (error) {
    console.error("[Storage] Failed to store user data:", error);
    return false;
  }
}

/**
 * Safely set site ID in localStorage with validation
 */
export function setValidatedSiteId(siteId: string): boolean {
  try {
    const result = SiteIdSchema.safeParse(siteId);
    
    if (!result.success) {
      console.error("[Storage] Cannot store invalid site ID");
      return false;
    }
    
    localStorage.setItem("selectedSiteId", result.data);
    return true;
  } catch (error) {
    console.error("[Storage] Failed to store site ID:", error);
    return false;
  }
}
