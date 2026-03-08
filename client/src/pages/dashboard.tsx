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
import Header from "@/components/layout/header";
import { Loading } from "@/components/ui/loading";
import { MessageChart } from "@/components/charts/message-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Megaphone,
  CheckCircle,
  Users,
  TrendingUp,
  Clock,
  Activity,
  Zap,
  Upload,
  FileText,
  BarChart3,
  ExternalLink,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Eye,
  Target,
  LayoutGrid,
} from "lucide-react";
import { useDashboardStats, useAnalytics } from "@/hooks/use-dashboard";
import { useTranslation } from "@/lib/i18n";
import { useState } from "react";
import { User, LogOut, LogIn, Edit, PlusCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useLocation } from "wouter";
import { DashboardStarApiDataType } from "./types/type";
import { useAuth } from "@/contexts/auth-context";
import { apiRequest } from "@/lib/queryClient";
import AdminStats from "@/components/AdminStats";

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const { data: activeChannel } = useQuery({
    queryKey: ["/api/channels/active"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/channels/active");
      if (!response.ok) return null;
      return await response.json();
    },
  });

  const isAdmin = user?.role === "superadmin";

  const { data: activityLogs = [], isLoading } = useQuery({
    queryKey: ["/api/team/activity-logs"],
    queryFn: async () => {
      const response = await fetch("/api/team/activity-logs");

      // BUG-M10 FIX: Check response.ok before parsing JSON
      if (!response.ok) {
        console.error('Failed to fetch activity logs:', response.status);
        return [];
      }
      return await response.json();
    },
  });




  // console.log("activity logs response ", activityLogs);

  const [timeRange, setTimeRange] = useState<number>(30);

  // Fetch campaign analytics
  // BUG-M05 FIX: Added enabled guard to prevent query with undefined channelId
  const { data: campaignAnalytics, isLoading: campaignLoading } = useQuery({
    queryKey: ["/api/analytics/campaigns", activeChannel?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(activeChannel?.id && { channelId: activeChannel.id }),
      });
      const response = await fetch(`/api/analytics/campaigns?${params}`);
      if (!response.ok) throw new Error("Failed to fetch campaign analytics");
      return await response.json();
    },
    enabled: !!activeChannel?.id, // Only run when activeChannel.id is defined
  });

  const { data: stats, isLoading: statsLoading } = useDashboardStats(
    activeChannel?.id
  );
  // const { data: analytics, isLoading: analyticsLoading } = useAnalytics(7, activeChannel?.id);

  // Fetch message analytics
  const { data: messageAnalytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["/api/analytics/messages", activeChannel?.id, timeRange],

    queryFn: async () => {
      const params = new URLSearchParams({
        days: timeRange.toString(),
        ...(user?.role !== "superadmin" && activeChannel?.id && {
          channelId: activeChannel.id,
        }),
      });

      const response = await fetch(`/api/analytics/messages?${params}`);
      if (!response.ok) throw new Error("Failed to fetch message analytics");
      return await response.json();
    },

    enabled:
      user?.role === "superadmin"
        ? true
        : !!activeChannel?.id,
  });


  // console.log("this is stats ", stats);

  if (statsLoading) {
    return (
      <div className="flex-1 dots-bg">
        <Header title="Dashboard" subtitle="Loading dashboard data..." />
        <div className="p-6">
          <Loading size="lg" text="Loading dashboard..." />
        </div>
      </div>
    );
  }

  // const chartData = analytics || [];
  const chartData =
    messageAnalytics?.dailyStats?.map((stat: any) => ({
      date: new Date(stat.date).toLocaleDateString(),
      sent: stat.totalSent || 0,
      delivered: stat.delivered || 0,
      read: stat.read || 0,
      failed: stat.failed || 0,
    })) || [];

  const messageMetrics = messageAnalytics?.overall || {};

  // Calculate rates — use outbound-only counts, capped at 100%
  const totalOutbound = Number(messageMetrics.totalOutbound) || 0;
  const deliveryRate =
    totalOutbound > 0
      ? Math.min(((messageMetrics.totalDelivered || 0) / totalOutbound) * 100, 100)
      : 0;

  const getActivityMeta = (action: string) => {
    switch (action) {
      case "login":
        return {
          icon: <LogIn className="w-4 h-4 text-green-600" />,
          color: "bg-green-100",
          label: "User logged in",
        };
      case "logout":
        return {
          icon: <LogOut className="w-4 h-4 text-[#999]" />,
          color: "bg-[#0a0a0a]",
          label: "User logged out",
        };
      case "user_created":
        return {
          icon: <PlusCircle className="w-4 h-4 text-blue-600" />,
          color: "bg-blue-100",
          label: "User created",
        };
      case "user_updated":
        return {
          icon: <Edit className="w-4 h-4 text-yellow-600" />,
          color: "bg-yellow-100",
          label: "User updated",
        };
      default:
        return {
          icon: <Activity className="w-4 h-4 text-purple-600" />,
          color: "bg-purple-100",
          label: "Activity",
        };
    }
  };

  const getWeekComparison = (stats: DashboardStarApiDataType) => {
    const thisWeek = stats?.weekContacts || 0;
    const lastWeek = stats?.lastWeekContacts || 0;

    if (lastWeek === 0) {
      return {
        percentage: thisWeek > 0 ? "+100.0" : "0.0",
        isUp: thisWeek > 0,
      };
    }

    const change = ((thisWeek - lastWeek) / lastWeek) * 100;
    const sign = change >= 0 ? "+" : "";

    return {
      percentage: `${sign}${change.toFixed(1)}`,
      isUp: change >= 0,
    };
  };

  type ActivityLog = {
    action: string;
    createdAt: string; // or Date
    [key: string]: any; // other optional fields
  };

  const getMonthlyGrowth = (stats: DashboardStarApiDataType) => {
    const thisMonth = stats?.thisMonthMessages || 0;
    const lastMonth = stats?.lastMonthMessages || 0;

    if (lastMonth === 0) {
      return {
        growth: thisMonth > 0 ? 100 : 0,
        isPositive: thisMonth > 0,
        isFlat: thisMonth === 0,
      };
    }

    const growthRate = ((thisMonth - lastMonth) / lastMonth) * 100;

    return {
      growth: Math.abs(growthRate).toFixed(1),
      isPositive: growthRate >= 0,
      isFlat: growthRate === 0,
    };
  };

  return (
    <div className="flex-1 min-h-screen bg-[#050505] text-white">
      {user?.role === "superadmin" ? (
        <Header
          title={t("dashboard.title")}
          subtitle={t("dashboard.subtitle")}
        />
      ) : (
        <Header
          title={t("dashboard.title")}
          subtitle={t("dashboard.subtitle")}
          action={{
            label: t("dashboard.newCampaign"),
            onClick: () => setLocation("/campaigns"),
          }}
        />
      )}

      <main className="p-6 space-y-6">
        {/* KPI Cards / Admin Stats */}
        <AdminStats />

        {user?.role !== "superadmin" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
                <CardContent className="pt-6 pb-4 px-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-[rgba(0,255,136,0.1)] text-[#00ff88]">
                      <Send className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-medium text-[#777]">Delivery Rate</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.totalMessages > 0
                      ? Math.min(((stats.messagesDelivered || 0) / stats.totalMessages) * 100, 100).toFixed(1)
                      : "0.0"}%
                  </div>
                  <div className="w-full bg-[#1a1a1a] h-1.5">
                    <div
                      className="bg-[#00ff88] h-full transition-all duration-500 shadow-[0_0_10px_rgba(0,255,136,0.3)]"
                      style={{
                        width: `${stats.totalMessages > 0
                          ? Math.min(((stats.messagesDelivered || 0) / stats.totalMessages) * 100, 100)
                          : 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#444] mt-3">
                    {stats.messagesDelivered ?? 0} / {stats.totalMessages ?? 0} DELIVERED
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
                <CardContent className="pt-6 pb-4 px-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-[rgba(139,92,246,0.1)] text-[#8b5cf6]">
                      <Eye className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-medium text-[#777]">Read Rate</h3>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {stats.totalMessages > 0
                      ? Math.min(((stats.messagesRead || 0) / stats.totalMessages) * 100, 100).toFixed(1)
                      : "0.0"}%
                  </div>
                  <div className="w-full bg-[#1a1a1a] h-1.5">
                    <div
                      className="bg-[#8b5cf6] h-full transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                      style={{
                        width: `${stats.totalMessages > 0
                          ? Math.min(((stats.messagesRead || 0) / stats.totalMessages) * 100, 100)
                          : 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#444] mt-3">
                    {stats.messagesRead ?? 0} / {stats.totalMessages ?? 0} READ
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
                <CardContent className="pt-6 pb-4 px-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-[rgba(245,158,11,0.1)] text-[#f59e0b]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-medium text-[#777]">Monthly Growth</h3>
                  </div>
                  {(() => {
                    const growth = getMonthlyGrowth(stats);
                    return (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl font-bold text-white">
                            {growth.growth}%
                          </span>
                          {!growth.isFlat && (
                            growth.isPositive ? (
                              <ArrowUpRight className="w-6 h-6 text-[#00ff88]" />
                            ) : (
                              <ArrowDownRight className="w-6 h-6 text-[#ef4444]" />
                            )
                          )}
                        </div>
                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#444] mt-3">
                          {stats.thisMonthMessages ?? 0} THIS MONTH VS {stats.lastMonthMessages ?? 0} LAST
                        </p>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
                <CardHeader className="pb-2 border-b border-[#1a1a1a] mb-4">
                  <CardTitle className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[#555]">
                    <Target className="w-4 h-4 text-[#3b82f6]" />
                    Contact Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const comparison = getWeekComparison(stats);
                    return (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-tighter text-[#444] mb-1">THIS WEEK</p>
                          <p className="text-2xl font-black text-white">{stats.weekContacts ?? 0}</p>
                        </div>
                        <div className="text-center bg-[#050505] p-2 border border-[#1a1a1a]">
                          <div className={`flex items-center gap-1 text-sm font-mono ${comparison.isUp ? "text-[#00ff88]" : "text-[#ef4444]"}`}>
                            {comparison.isUp ? "+" : ""}{comparison.percentage}%
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-mono uppercase tracking-tighter text-[#444] mb-1">LAST WEEK</p>
                          <p className="text-2xl font-black text-[#222]">{stats.lastWeekContacts ?? 0}</p>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>

              <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
                <CardHeader className="pb-2 border-b border-[#1a1a1a] mb-4">
                  <CardTitle className="flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[#555]">
                    <LayoutGrid className="w-4 h-4 text-[#ec4899]" />
                    Campaign Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-around">
                    <div className="text-center">
                      <div className="p-3 bg-[rgba(236,72,153,0.05)] text-[#ec4899] mb-2 flex justify-center">
                        <Megaphone className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-black text-white">{stats.totalCampaigns ?? 0}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#444]">CAMPAIGNS</p>
                    </div>
                    <div className="h-10 w-px bg-[#1a1a1a]" />
                    <div className="text-center">
                      <div className="p-3 bg-[rgba(168,85,247,0.05)] text-[#a855f7] mb-2 flex justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="text-2xl font-black text-white">{stats.totalTemplates ?? 0}</p>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-[#444]">TEMPLATES</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Charts and Recent Activity */}
        <div
          className={`grid grid-cols-1 gap-6 ${user?.role === "superadmin" ? "lg:grid-cols-3" : "lg:grid-cols-1"
            }`}
        >
          {/* Message Analytics Chart */}
          <Card className="lg:col-span-2 min-w-0 overflow-hidden hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <CardTitle>{t("dashboard.messageAnalytics")}</CardTitle>
                <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 gap-2 mt-2 sm:mt-0">
                  {[
                    { value: 1, label: t("dashboard.today") },
                    { value: 7, label: t("dashboard.7Days") },
                    { value: 30, label: t("dashboard.30Days") },
                  ].map((range) => (
                    <Button
                      key={range.value}
                      variant={
                        timeRange === range.value ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setTimeRange(range.value)}
                      className={
                        timeRange === range.value ? "bg-[#00ff88] text-black hover:bg-[#00cc6e]" : "border-[#1a1a1a] text-white hover:bg-[#111]"
                      }
                    >
                      {range.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>

            <CardContent className="overflow-hidden">
              {analyticsLoading ? (
                <Loading text="Loading chart data..." />
              ) : (
                <div className="h-[300px]">
                  <MessageChart data={chartData} />
                </div>
              )}

              {/* Chart Legend */}
              <div className="flex items-center justify-center space-x-6 mt-6 flex-wrap">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#3b82f6] mr-2" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                    {t("dashboard.sent")}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#00ff88] mr-2" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                    {t("dashboard.delivered")}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#f59e0b] mr-2" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                    {t("dashboard.read")}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-[#8b5cf6] mr-2" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#555]">
                    {t("dashboard.replied")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          {user?.role === "superadmin" && (
            <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
              <CardHeader>
                <CardTitle className="flex items-center text-sm font-mono uppercase tracking-widest text-[#555]">
                  <Activity className="w-4 h-4 mr-2" />
                  {t("dashboard.recentActivities")}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {isLoading ? (
                    <p className="text-xs text-[#444] font-mono uppercase">
                      {t("dashboard.loadingActivities")}
                    </p>
                  ) : activityLogs.length === 0 ? (
                    <p className="text-xs text-[#444] font-mono uppercase">
                      {t("dashboard.noRecentActivities")}
                    </p>
                  ) : (
                    (activityLogs as ActivityLog[])
                      .sort(
                        (a: ActivityLog, b: ActivityLog) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      )
                      .slice(0, 5)
                      .map((log: ActivityLog) => {
                        const meta = getActivityMeta(log.action);
                        return (
                          <div
                            key={log.id}
                            className="flex items-start space-x-3"
                          >
                            <div
                              className={`w-8 h-8 ${meta.color} flex items-center justify-center flex-shrink-0`}
                            >
                              {meta.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-white">
                                {meta.label} by {log.userName}
                              </p>
                              <p className="text-[10px] text-[#444] font-mono uppercase">
                                {formatDistanceToNow(new Date(log.createdAt), {
                                  addSuffix: true,
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>

                <Button
                  variant="ghost"
                  className="w-full mt-6 text-[#00ff88] hover:bg-[rgba(0,255,136,0.05)] text-xs font-mono uppercase tracking-widest"
                  onClick={() => setLocation("/team")}
                >
                  {t("dashboard.viewAllActivities")}{" "}
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions and API Status for non-superadmin */}
        {user?.role !== "superadmin" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
              <CardHeader className="border-b border-[#1a1a1a] mb-4">
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-[#555]">{t("dashboard.quickActions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="p-4 h-auto text-left flex flex-col items-center md:items-start space-y-2 border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#333] transition-all rounded-none"
                    onClick={() => setLocation("/contacts")}
                  >
                    <div className="p-2 bg-[rgba(59,130,246,0.1)] text-[#3b82f6]">
                      <Upload className="w-4 h-4" />
                    </div>
                    <h4 className="text-white text-[10px] font-mono uppercase tracking-widest text-center md:text-left">
                      {t("dashboard.importContacts")}
                    </h4>
                  </Button>

                  <Button
                    variant="outline"
                    className="p-4 h-auto text-left flex flex-col items-start space-y-2 border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#333] transition-all rounded-none"
                    onClick={() => setLocation("/templates")}
                  >
                    <div className="p-2 bg-[rgba(0,255,136,0.1)] text-[#00ff88]">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h4 className="text-white text-[10px] font-mono uppercase tracking-widest">
                      {t("dashboard.newTemplate")}
                    </h4>
                  </Button>

                  <Button
                    variant="outline"
                    className="p-4 h-auto text-left flex flex-col items-start space-y-2 border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#333] transition-all rounded-none"
                    onClick={() => setLocation("/automation")}
                  >
                    <div className="p-2 bg-[rgba(139,92,246,0.1)] text-[#8b5cf6]">
                      <Zap className="w-4 h-4" />
                    </div>
                    <h4 className="text-white text-[10px] font-mono uppercase tracking-widest">
                      {t("dashboard.buildFlow")}
                    </h4>
                  </Button>

                  <Button
                    variant="outline"
                    className="p-4 h-auto text-left flex flex-col items-start space-y-2 border-[#1a1a1a] bg-[#0a0a0a] hover:bg-[#111] hover:border-[#333] transition-all rounded-none"
                    onClick={() => setLocation("/analytics")}
                  >
                    <div className="p-2 bg-[rgba(249,115,22,0.1)] text-[#f97316]">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <h4 className="text-white text-[10px] font-mono uppercase tracking-widest">
                      {t("dashboard.viewReports")}
                    </h4>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift fade-in border-[#1a1a1a] bg-[#0a0a0a]">
              <CardHeader className="border-b border-[#1a1a1a] mb-4">
                <CardTitle className="text-sm font-mono uppercase tracking-widest text-[#555]">{t("dashboard.apiStatusConnection")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-4 border ${activeChannel?.isActive === true
                      ? "border-[rgba(0,255,136,0.1)] bg-[rgba(0,255,136,0.02)]"
                      : "border-[rgba(239,68,68,0.1)] bg-[rgba(239,68,68,0.02)]"
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 flex items-center justify-center ${activeChannel?.isActive ? "bg-[#00ff88] text-black" : "bg-[#ef4444] text-white"
                          }`}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-mono text-[10px] uppercase tracking-wider text-white truncate">
                          WHATSAPP CLOUD API
                        </h4>
                        <p className="text-[10px] font-mono text-[#444] truncate uppercase tracking-tight">
                          {activeChannel?.name || "DISCONNECTED"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[10px] font-mono uppercase tracking-widest ${activeChannel?.isActive === true
                          ? "text-[#00ff88]"
                          : "text-[#ef4444]"
                          }`}
                      >
                        {activeChannel?.isActive === true ? "CONNECTED" : "OFFLINE"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="text-center p-3 bg-[#050505] border border-[#1a1a1a]">
                      <p className="text-lg font-black text-white">
                        {activeChannel?.lastHealthCheck ? "100%" : "—"}
                      </p>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[#444]">
                        UPTIME
                      </p>
                    </div>
                    <div className="text-center p-3 bg-[#050505] border border-[#1a1a1a]">
                      <p className="text-lg font-black text-white">
                        {activeChannel?.healthDetails.name_status || "OK"}
                      </p>
                      <p className="text-[9px] font-mono uppercase tracking-widest text-[#444]">
                        STATUS
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 border border-[#1a1a1a] bg-[#050505]">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#444]">
                        DAILY QUOTA
                      </span>
                      <span className="text-[10px] font-mono text-white">
                        {stats?.todayMessages || 0} / 1,000
                      </span>
                    </div>
                    <div className="w-full bg-[#111] h-[2px]">
                      <div
                        className="bg-[#00ff88] h-full shadow-[0_0_8px_rgba(0,255,136,0.2)]"
                        style={{
                          width: `${Math.min(((stats?.todayMessages || 0) / 1000) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

