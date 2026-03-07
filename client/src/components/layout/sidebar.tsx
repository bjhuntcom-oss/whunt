import React, { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { MdOutlinePayment } from "react-icons/md";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  MessageSquare,
  Bot,
  BarChart3,
  Settings,
  Zap,
  LogOut,
  Bell,
  CheckCircle,
  SlidersHorizontal,
  User,
  Globe,
  Code,
  Smartphone,
  X,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChannelSwitcher } from "@/components/channel-switcher";
import { useChannelContext } from "@/contexts/channel-context";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import { useAuth } from "@/contexts/auth-context";
import { GiUpgrade } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineSupportAgent, MdGroups } from "react-icons/md";
import { useSidebar } from "@/contexts/sidebar-context";
import { AdminCreditBox } from "../AdminCreditBox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AppSettings } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

type Role = "superadmin" | "admin" | "user" | "team";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
  badge?: string | number;
  color?: string;
  alwaysVisible?: boolean;
  requiredPrefix?: string;
  allowedRoles?: Role[];
}

function getNavItems(role: string): NavItem[] {
  if (role === "admin") {
    return [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        labelKey: "navigation.dashboard",
        alwaysVisible: true,
        allowedRoles: ["superadmin", "admin", "user", "team"],
      },
      {
        href: "/inbox",
        icon: MessageSquare,
        labelKey: "navigation.inbox",
        allowedRoles: ["admin"],
      },
      {
        href: "/contacts",
        icon: Users,
        labelKey: "navigation.contacts",
        allowedRoles: ["superadmin", "admin"],
      },
      {
        href: "/groups",
        icon: MdGroups,
        labelKey: "navigation.groups",
        allowedRoles: ["admin"],
      },
      {
        href: "/campaigns",
        icon: Megaphone,
        labelKey: "navigation.campaigns",
        allowedRoles: ["superadmin", "admin"],
      },
      {
        href: "/templates",
        icon: FileText,
        labelKey: "navigation.templates",
        allowedRoles: ["superadmin", "admin"],
      },
      {
        href: "/automation",
        icon: Zap,
        labelKey: "navigation.automations",
        allowedRoles: ["superadmin", "admin"],
      },
      {
        href: "/analytics",
        icon: BarChart3,
        labelKey: "navigation.analytics",
        allowedRoles: ["superadmin", "admin"],
      },
      {
        href: "/widget-builder",
        icon: Bot,
        labelKey: "navigation.widgetBuilder",
        alwaysVisible: true,
        allowedRoles: ["superadmin", "admin", "user"],
      },
      {
        href: "/api-docs",
        icon: Code,
        labelKey: "navigation.apiDocs",
        allowedRoles: ["admin"],
      },
      {
        href: "/plans",
        icon: Bell,
        labelKey: "navigation.plans",
        allowedRoles: ["superadmin"],
      },
      {
        href: "/gateway",
        icon: Bell,
        labelKey: "navigation.plans",
        allowedRoles: ["superadmin"],
      },
      {
        href: "/languages",
        icon: Globe,
        labelKey: "navigation.languages",
        allowedRoles: ["superadmin"],
      },
      {
        href: "/support-tickets",
        icon: Bell,
        labelKey: "navigation.tickets_support",
        allowedRoles: ["superadmin"],
      },
    ];
  } else {
    return [
      {
        href: "/dashboard",
        icon: LayoutDashboard,
        labelKey: "navigation.dashboard",
        alwaysVisible: true,
        allowedRoles: ["superadmin", "admin", "user", "team"],
      },
      {
        href: "/inbox",
        icon: MessageSquare,
        labelKey: "navigation.inbox",
        requiredPrefix: "inbox.",
        allowedRoles: ["team"],
      },
      {
        href: "/contacts",
        icon: Users,
        labelKey: "navigation.contacts",
        requiredPrefix: "contacts.",
        allowedRoles: ["team"],
      },
      {
        href: "/groups",
        icon: MdGroups,
        labelKey: "Groups",
        requiredPrefix: "groups.",
        allowedRoles: ["team"],
      },
      {
        href: "/campaigns",
        icon: Megaphone,
        labelKey: "navigation.campaigns",
        requiredPrefix: "campaigns.",
        allowedRoles: ["team"],
      },
      {
        href: "/templates",
        icon: FileText,
        labelKey: "navigation.templates",
        requiredPrefix: "templates.",
        allowedRoles: ["team"],
      },
      {
        href: "/automation",
        icon: Zap,
        labelKey: "navigation.automations",
        requiredPrefix: "automations.",
        allowedRoles: ["team"],
      },
      {
        href: "/analytics",
        icon: BarChart3,
        labelKey: "navigation.analytics",
        requiredPrefix: "analytics.",
        allowedRoles: ["team"],
      },
      {
        href: "/widget-builder",
        icon: Bot,
        labelKey: "navigation.widgetBuilder",
        alwaysVisible: true,
        requiredPrefix: "widgetbuilder.",
        allowedRoles: ["team"],
      },
      {
        href: "/plans",
        icon: Bell,
        labelKey: "navigation.plans",
        requiredPrefix: "plans.",
        allowedRoles: ["team"],
      },
    ];
  }
}

const sidebarItemsCategories = [
  { name: "navigation.dashboard",          icon: LayoutDashboard,       path: "/dashboard" },
  { name: "navigation.users",              icon: Users,                 path: "/users" },
  { name: "navigation.channels",           icon: Smartphone,            path: "/channels-management" },
  { name: "navigation.master_campaigns",   icon: Megaphone,             path: "/campaigns" },
  { name: "navigation.master_templates",   icon: FileText,              path: "/templates" },
  { name: "navigation.master_contacts",    icon: Users,                 path: "/contacts-management" },
  { name: "navigation.analytics",          icon: BarChart3,             path: "/analytics" },
  { name: "navigation.notifications",      icon: Bell,                  path: "/notifications" },
  { name: "navigation.subscription_plans", icon: MdOutlinePayment,      path: "/plans" },
  { name: "navigation.master_subscriptions",icon: CheckCircle,          path: "/master-subscriptions" },
  { name: "navigation.transactions_logs",  icon: AiOutlineTransaction,  path: "/transactions-logs" },
  { name: "navigation.message_logs",       icon: MessageSquare,         path: "/message-logs" },
  { name: "navigation.payment_gateway",    icon: RiSecurePaymentFill,   path: "/gateway" },
  { name: "navigation.support_tickets",    icon: MdOutlineSupportAgent, path: "/support-tickets" },
];

export default function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { toast } = useToast();
  const isSuper = user?.role === "superadmin";
  const isAdmin = user?.role === "admin";
  const navItems = getNavItems(user?.role || "");

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

  const { isOpen, toggle, setCollapsed } = useSidebar();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCollapsed(true);
      else if (isOpen) setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setCollapsed]);

  const canView = (item: NavItem): boolean => {
    if (!user) return false;
    const role = user.role as Role;
    if (role === "superadmin") return true;
    if (role === "team") {
      if (!item.requiredPrefix) return item.alwaysVisible === true;
      if (!user.permissions) return false;
      const perms = Array.isArray(user.permissions)
        ? user.permissions
        : Object.keys(user.permissions);
      const normalize = (s: string) => s.replace(".", ":");
      return perms.some((p) => p.startsWith(normalize(item.requiredPrefix!)));
    }
    if (item.allowedRoles && !item.allowedRoles.includes(role)) return false;
    if (item.alwaysVisible) return true;
    if (!item.requiredPrefix) return true;
    if (!user.permissions) return false;
    const perms = Array.isArray(user.permissions)
      ? user.permissions
      : Object.keys(user.permissions);
    const normalize = (s: string) => s.replace(".", ":");
    return perms.some((p) => p.startsWith(normalize(item.requiredPrefix!)));
  };

  // AI toggle
  const queryClient = useQueryClient();
  const { selectedChannel } = useChannelContext();
  const channelId = selectedChannel?.id;

  const { data: aiData, refetch } = useQuery({
    queryKey: ["/api/ai-settings/channel", channelId],
    queryFn: async () => {
      if (!channelId) return null;
      const res = await fetch(`/api/ai-settings/channel/${channelId}`);
      if (!res.ok) throw new Error("Failed to fetch settings");
      return res.json();
    },
    enabled: !!channelId,
  });

  const aiSettings = aiData || null;
  const isAIActive = aiSettings?.isActive ?? false;

  const handleToggleAI = async () => {
    if (!aiSettings) {
      toast({ title: "No AI settings found", description: "Please configure AI settings first.", variant: "destructive" });
      return;
    }
    try {
      const res = await fetch(`/api/ai-settings/${aiSettings.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isAIActive }),
      });
      if (!res.ok) throw new Error();
      toast({ title: "AI status updated" });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["/api/ai-settings/channel", channelId] });
    } catch {
      toast({ title: "Error", description: "Unable to update AI status.", variant: "destructive" });
    }
  };

  const renderNavLink = (
    name: string,
    Icon: React.ComponentType<{ className?: string }>,
    path: string,
    badge?: string | number
  ) => {
    const isActive = location === path;
    return (
      <Link
        key={path}
        href={path}
        onClick={toggle}
        className={cn(
          "group flex items-center gap-2.5 px-3 py-2 rounded-md text-[11.5px] font-mono font-medium transition-all duration-150",
          isActive
            ? "bg-[rgba(0,255,136,0.07)] text-[#00ff88] border border-[rgba(0,255,136,0.18)]"
            : "text-[#999] hover:text-[#e0e0e0] hover:bg-[#141414] border border-transparent"
        )}
      >
        <Icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-[#00ff88]" : "text-[#555] group-hover:text-[#999]")} />
        <span className="flex-1 truncate">{name}</span>
        {badge && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[rgba(0,255,136,0.15)] text-[#00ff88] border border-[rgba(0,255,136,0.2)]">
            {badge}
          </span>
        )}
        {isActive && <ChevronRight className="w-2.5 h-2.5 text-[#00ff88] ml-auto" />}
      </Link>
    );
  };

  const userInitial = user
    ? (user.firstName?.[0] || user.username?.[0] || "U").toUpperCase()
    : "U";
  const userName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username
    : "User";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={toggle}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col",
          "bg-[#0a0a0a] border-r border-[#1a1a1a]",
          "transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── LOGO AREA ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1a1a]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            {brandSettings?.logo ? (
              <img src={brandSettings.logo} alt="Logo" className="h-7 object-contain" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#00ff88] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-3.5 h-3.5 text-black" />
                </div>
                <span className="font-sans font-800 text-[15px] font-black tracking-tight text-white leading-none">
                  WHUNT
                </span>
              </div>
            )}
            {brandSettings?.logo && (
              <span className="font-sans font-black text-sm tracking-tight text-white">
                {brandSettings.tagline || "WHUNT"}
              </span>
            )}
          </Link>
          <button
            onClick={toggle}
            className="lg:hidden p-1.5 rounded text-[#555] hover:text-[#999] hover:bg-[#141414] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── CHANNEL SWITCHER ── */}
        {(isAdmin || user?.role === "team") && (
          <div className="px-4 py-3 border-b border-[#1a1a1a]">
            <p className="mono-label mb-1.5">Channel</p>
            <ChannelSwitcher />
          </div>
        )}

        {/* ── NAV LINKS ── */}
        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {isSuper
            ? sidebarItemsCategories.map((item) =>
                renderNavLink(t(item.name), item.icon, item.path)
              )
            : navItems
                .filter(canView)
                .map((item) =>
                  renderNavLink(t(item.labelKey), item.icon, item.href, item.badge)
                )}
        </nav>

        {/* ── AI TOGGLE (admin only) ── */}
        {isAdmin && (
          <div className="mx-3 mb-3 p-3 bg-[#0e0e0e] border border-[#1a1a1a] rounded-md">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded bg-[rgba(0,255,136,0.07)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-[#00ff88]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-mono font-semibold text-[#e0e0e0] leading-none mb-1">
                  {t("common.aiAssistant")}
                </p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-block w-1.5 h-1.5 rounded-full shrink-0",
                      isAIActive ? "bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.6)]" : "bg-[#333]"
                    )}
                  />
                  <span className="text-[9.5px] font-mono text-[#555] uppercase tracking-widest">
                    {isAIActive ? t("common.active") : t("common.inactive")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleToggleAI}
                  disabled={!aiSettings}
                  className={cn(
                    "relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none",
                    !aiSettings ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
                    isAIActive ? "bg-[#00ff88]" : "bg-[#252525]"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-2.5 w-2.5 transform rounded-full bg-[#0a0a0a] shadow transition-transform",
                      isAIActive ? "translate-x-3.5" : "translate-x-0.5"
                    )}
                  />
                </button>
                <Link href="/settings?tab=ai_setting">
                  <button className="p-1 rounded text-[#555] hover:text-[#00ff88] hover:bg-[rgba(0,255,136,0.07)] transition-colors" title="AI Settings">
                    <SlidersHorizontal className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── LANGUAGE SELECTOR (mobile) ── */}
        <div className="px-4 py-2 border-t border-[#1a1a1a] sm:hidden">
          <LanguageSelector />
        </div>

        {/* ── USER PROFILE ── */}
        <div className="border-t border-[#1a1a1a] p-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-2.5 p-2 rounded-md text-left hover:bg-[#141414] transition-colors group">
                <div className="w-7 h-7 rounded-full bg-[#00ff88] flex items-center justify-center shrink-0">
                  <span className="text-[11px] font-mono font-black text-black">
                    {userInitial}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11.5px] font-mono font-semibold text-[#e0e0e0] truncate leading-none mb-0.5">
                    {userName}
                  </p>
                  <p className="text-[9.5px] font-mono text-[#555] capitalize tracking-wide">
                    {user?.role || "user"}
                  </p>
                </div>
                <Settings className="w-3 h-3 text-[#333] group-hover:text-[#555] transition-colors shrink-0" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-52 bg-[#0a0a0a] border-[#1a1a1a] text-[#e0e0e0]"
            >
              {isAdmin && (
                <div className="px-3 py-2 border-b border-[#1a1a1a]">
                  <AdminCreditBox />
                </div>
              )}
              <DropdownMenuLabel className="text-[#555] font-mono text-[9.5px] uppercase tracking-widest">
                {t("common.myAccount")}
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#1a1a1a]" />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer font-mono text-[11.5px] text-[#999] hover:text-[#e0e0e0] hover:bg-[#141414]">
                  <Settings className="mr-2 h-3 w-3" />
                  {t("navigation.settings")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/account" className="cursor-pointer font-mono text-[11.5px] text-[#999] hover:text-[#e0e0e0] hover:bg-[#141414]">
                  <User className="mr-2 h-3 w-3" />
                  {t("navigation.account")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#1a1a1a]" />
              <DropdownMenuItem
                onClick={logout}
                className="cursor-pointer font-mono text-[11.5px] text-[#ff3b3b] hover:text-[#ff3b3b] hover:bg-[rgba(255,59,59,0.07)]"
              >
                <LogOut className="mr-2 h-3 w-3" />
                {t("common.logout")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}
