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
  subtitle?: string; // Optional subtitle (jaise "Across all algorithms")
  iconClassName?: string;
  valueClassName?: string;
  borderColor?: string;
}

export function CardStat({
  label,
  value,
  icon,
  subtitle,
  iconClassName = "bg-green-50 text-green-600",
  valueClassName = "text-[#e0e0e0]",
  borderColor = "border-l-green-500",
}: CardStatProps) {
  return (
    <Card
      className={`rounded-lg border-l-4 ${borderColor} shadow-sm hover:shadow-md transition-shadow duration-200 bg-[#0a0a0a]`}
    >
      <CardContent className="px-6 py-4">
        {/* Icon and Label Row */}
        <div className="flex items-center gap-3 mb-1">
          <div className={`rounded-lg p-2.5 ${iconClassName}`}>{icon}</div>
          <h3 className="text-sm font-medium text-[#999]">{label}</h3>
        </div>

        {/* Value */}
        <div className={`text-3xl font-bold  ${valueClassName}`}>{value}</div>

        {/* Optional Subtitle */}
        {subtitle && (
          <p className="text-sm text-[#555] font-normal">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}
