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

import { PERMISSIONS, PermissionMap } from "@shared/schema";

export function resolveUserPermissions(
  role: string,
  dbPermissions?: string[]
): PermissionMap {
  if (role === "admin") {
    // Admin gets all permissions dynamically from PERMISSIONS
    const all: PermissionMap = {} as PermissionMap;
    Object.values(PERMISSIONS).forEach((perm) => {
      (all as any)[perm] = true;
    });
    return all;
  }

  // For other roles → convert DB array to PermissionMap
  if (!dbPermissions || dbPermissions.length === 0) {
    return {} as PermissionMap;
  }

  return dbPermissions.reduce((acc, perm) => {
    (acc as any)[perm] = true;
    return acc;
  }, {} as PermissionMap);
}
