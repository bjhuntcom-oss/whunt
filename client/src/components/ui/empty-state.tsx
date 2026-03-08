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

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-[#0a0a0a] border border-[#1a1a1a] rounded-none flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-[#555]" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{title}</h3>
      <p className="text-[#999] text-center max-w-md mb-8 font-mono text-xs leading-relaxed uppercase opacity-80">{description}</p>
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-[#00ff88] text-black font-bold uppercase tracking-wider rounded-none px-8 h-11 hover:bg-[#00cc6e] transition-all"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
