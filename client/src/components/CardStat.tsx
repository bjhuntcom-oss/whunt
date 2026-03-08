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

// components/dashboard/CardStat.tsx
import { Card, CardContent } from "@/components/ui/card";

interface CardStatProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  subtitle?: string;
  iconClassName?: string;
  valueClassName?: string;
  borderColor?: string;
}

export function CardStat({
  label,
  value,
  icon,
  subtitle,
  iconClassName = "bg-[rgba(0,255,136,0.07)] text-[#00ff88]",
  valueClassName = "text-white",
  borderColor = "border-l-[#00ff88]",
}: CardStatProps) {
  return (
    <Card
      className={`border-l-4 ${borderColor} bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#252525] transition-all duration-200`}
    >
      <CardContent className="px-5 py-4">
        {/* Icon and Label Row */}
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2.5 ${iconClassName}`}>{icon}</div>
          <h3 className="text-[11px] font-mono uppercase tracking-wider text-[#555]">{label}</h3>
        </div>

        {/* Value */}
        <div className={`text-3xl font-black tracking-tight ${valueClassName}`}>{value}</div>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-[11px] font-mono text-[#444] mt-1">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
