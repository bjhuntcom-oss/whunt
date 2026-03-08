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

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/contexts/auth-context";
import type { DashboardStats } from "@/types/types";
import { CardStat } from "./CardStat";
import { useTranslation } from "@/lib/i18n";
import {
  Users,
  MessageSquare,
  Send,
  CheckCircle2,
  Eye,
  XCircle,
  CalendarDays,
  Megaphone,
  FileText,
  Radio,
  UserPlus,
  CreditCard,
  UsersRound,
} from "lucide-react";

export default function AdminStats() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const { data: activeChannel } = useQuery({
    queryKey: ["/api/channels/active"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/channels/active");
      if (!response.ok) return null;
      return await response.json();
    },
  });

  const isTeamOrAdmin = user?.role === "team" || user?.role === "admin";

  const url = isTeamOrAdmin && activeChannel?.id
    ? `/api/dashboard/user/stats?channelId=${activeChannel.id}`
    : isTeamOrAdmin
      ? null
      : "/api/dashboard/admin/stats";

  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: [url],
    queryFn: () => apiRequest("GET", url!).then((res) => res.json()),
    enabled: !!url,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-28 bg-[#0a0a0a] border border-[#1a1a1a] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  if (isTeamOrAdmin) {
    return (
      <div className="container mx-auto">
        <div className="px-4 py-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <CardStat
            label={t("dashboard.dashboardStates.Total_Contacts")}
            value={stats.totalContacts ?? 0}
            icon={<Users className="w-5 h-5" />}
            iconClassName="bg-[rgba(59,130,246,0.1)] text-[#3b82f6]"
            borderColor="border-l-[#3b82f6]"
          />
          <CardStat
            label={t("dashboard.dashboardStates.Total_Messages")}
            value={stats.totalMessages ?? 0}
            icon={<MessageSquare className="w-5 h-5" />}
            iconClassName="bg-[rgba(249,115,22,0.1)] text-[#f97316]"
            borderColor="border-l-[#f97316]"
          />
          <CardStat
            label="Messages Sent"
            value={stats.messagesSent ?? 0}
            icon={<Send className="w-5 h-5" />}
            iconClassName="bg-[rgba(6,182,212,0.1)] text-[#06b6d4]"
            borderColor="border-l-[#06b6d4]"
          />
          <CardStat
            label="Messages Delivered"
            value={stats.messagesDelivered ?? 0}
            icon={<CheckCircle2 className="w-5 h-5" />}
            iconClassName="bg-[rgba(0,255,136,0.07)] text-[#00ff88]"
            borderColor="border-l-[#00ff88]"
          />
        </div>
        <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <CardStat
            label="Messages Read"
            value={stats.messagesRead ?? 0}
            icon={<Eye className="w-5 h-5" />}
            iconClassName="bg-[rgba(139,92,246,0.1)] text-[#8b5cf6]"
            borderColor="border-l-[#8b5cf6]"
          />
          <CardStat
            label="Messages Failed"
            value={stats.messagesFailed ?? 0}
            icon={<XCircle className="w-5 h-5" />}
            iconClassName="bg-[rgba(239,68,68,0.1)] text-[#ef4444]"
            borderColor="border-l-[#ef4444]"
          />
          <CardStat
            label="Today's Messages"
            value={stats.todayMessages ?? 0}
            icon={<CalendarDays className="w-5 h-5" />}
            iconClassName="bg-[rgba(245,158,11,0.1)] text-[#f59e0b]"
            borderColor="border-l-[#f59e0b]"
          />
          <CardStat
            label={t("dashboard.dashboardStates.Total_Campaigns")}
            value={stats.totalCampaigns ?? 0}
            icon={<Megaphone className="w-5 h-5" />}
            iconClassName="bg-[rgba(236,72,153,0.1)] text-[#ec4899]"
            borderColor="border-l-[#ec4899]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="px-4 py-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {stats.totalContacts !== undefined && stats.totalContacts !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Contacts")}
            value={stats.totalContacts}
            icon={<Users className="w-5 h-5" />}
            iconClassName="bg-[rgba(59,130,246,0.1)] text-[#3b82f6]"
            borderColor="border-l-[#3b82f6]"
          />
        )}
        {stats.totalTemplates !== undefined && stats.totalTemplates !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Templates")}
            value={stats.totalTemplates}
            icon={<FileText className="w-5 h-5" />}
            iconClassName="bg-[rgba(168,85,247,0.1)] text-[#a855f7]"
            borderColor="border-l-[#a855f7]"
          />
        )}
        {stats.totalChannels !== undefined && stats.totalChannels !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Channels")}
            value={stats.totalChannels}
            icon={<Radio className="w-5 h-5" />}
            iconClassName="bg-[rgba(0,255,136,0.07)] text-[#00ff88]"
            borderColor="border-l-[#00ff88]"
          />
        )}
        {stats.totalMessages !== undefined && stats.totalMessages !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Messages")}
            value={stats.totalMessages}
            icon={<MessageSquare className="w-5 h-5" />}
            iconClassName="bg-[rgba(249,115,22,0.1)] text-[#f97316]"
            borderColor="border-l-[#f97316]"
          />
        )}
        {stats.totalUsers !== undefined && stats.totalUsers !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Users")}
            value={stats.totalUsers}
            icon={<UsersRound className="w-5 h-5" />}
            iconClassName="bg-[rgba(99,102,241,0.1)] text-[#6366f1]"
            borderColor="border-l-[#6366f1]"
          />
        )}
        {stats.totalCampaigns !== undefined && stats.totalCampaigns !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Campaigns")}
            value={stats.totalCampaigns}
            icon={<Megaphone className="w-5 h-5" />}
            iconClassName="bg-[rgba(236,72,153,0.1)] text-[#ec4899]"
            borderColor="border-l-[#ec4899]"
          />
        )}
        {stats.todaySignups !== undefined && stats.todaySignups !== null && (
          <CardStat
            label={t("dashboard.dashboardStates.Total_Signups")}
            value={stats.todaySignups}
            icon={<UserPlus className="w-5 h-5" />}
            iconClassName="bg-[rgba(20,184,166,0.1)] text-[#14b8a6]"
            borderColor="border-l-[#14b8a6]"
          />
        )}
        {stats.totalPaidUsers !== undefined && stats.totalPaidUsers !== null && (
          <CardStat
            label="Total Paid Users"
            value={stats.totalPaidUsers}
            icon={<CreditCard className="w-5 h-5" />}
            iconClassName="bg-[rgba(16,185,129,0.1)] text-[#10b981]"
            borderColor="border-l-[#10b981]"
          />
        )}
      </div>
    </div>
  );
}
