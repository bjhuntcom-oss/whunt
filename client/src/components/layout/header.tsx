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

import {
  Plus,
  LogOut,
  Settings,
  User,
  Menu,
  ScrollText,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

import { useSidebar } from "@/contexts/sidebar-context";
import { LanguageSelector } from "../language-selector";
import NotificationBell from "@/components/notification/NotificationBell";

interface HeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  userPhotoUrl?: string;
}

export default function Header({
  title,
  subtitle,
  action,
  userPhotoUrl,
}: HeaderProps) {
  const [, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const username = (user?.firstName || "") + " " + (user?.lastName || "");

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const { isOpen, toggle } = useSidebar();

  // UI unchanged --------------------------------------
  return (
    <>
      <header className="bg-[#050505] border-b border-[#1a1a1a] px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              className="lg:hidden p-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-none hover:bg-[#111] transition-colors"
            >
              <Menu className="w-4 h-4 text-[#999]" />
            </button>
            <div>
              <h1 className="text-sm sm:text-base lg:text-xl font-black text-white uppercase tracking-tighter">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[10px] text-[#555] font-bold uppercase tracking-[0.2em] hidden lg:block mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="w-fit">
              {action && (
                <Button
                  onClick={action.onClick}
                  className="bg-[#00ff88] hover:bg-[#00cc6a] text-black rounded-none h-9 px-4 text-[10px] font-bold uppercase tracking-widest shadow-none"
                >
                  <Plus className="w-3.5 h-3.5 mr-2" />
                  <span className="hidden lg:block">{action.label.toUpperCase()}</span>
                  <span className="lg:hidden">ADD</span>
                </Button>
              )}
            </div>
            <div className="w-fit hidden sm:block">
              <LanguageSelector />
            </div>

            {user?.role !== "superadmin" && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setLocation("/settings?tab=support")}
                  className="p-2 rounded-none hover:bg-white/5 transition-colors border border-transparent hover:border-[#1a1a1a]"
                  title="Support"
                >
                  <Headphones className="w-4 h-4 text-[#555]" />
                </button>
                <button
                  onClick={() => setLocation("/settings?tab=message_logs")}
                  className="p-2 rounded-none hover:bg-white/5 transition-colors border border-transparent hover:border-[#1a1a1a]"
                  title="Message Logs"
                >
                  <ScrollText className="w-4 h-4 text-[#555]" />
                </button>
                <NotificationBell />
              </div>
            )}

            <div className="relative" ref={dropdownRef}>
              <button
                className="w-9 h-9 rounded-none overflow-hidden border border-[#1a1a1a] hover:border-[#333] transition-colors bg-[#0a0a0a]"
                onClick={() => setDropdownOpen((x) => !x)}
              >
                <img
                  src={
                    userPhotoUrl ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      username
                    )}&background=0a0a0a&color=00ff88`
                  }
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] border border-[#1a1a1a] rounded-none shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-[#1a1a1a] text-[10px] font-bold text-white uppercase tracking-widest bg-[#050505]">
                    {username}
                  </div>

                  <div className="p-1">
                    <button
                      className="flex items-center w-full px-4 py-2 text-[10px] font-bold text-[#999] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-colors text-left"
                      onClick={() => {
                        setLocation("/settings");
                        setDropdownOpen(false);
                      }}
                    >
                      <Settings className="w-3.5 h-3.5 mr-3 text-[#555]" /> SETTINGS
                    </button>

                    <button
                      className="flex items-center w-full px-4 py-2 text-[10px] font-bold text-[#999] uppercase tracking-widest hover:bg-white/5 hover:text-white transition-colors text-left"
                      onClick={() => {
                        setLocation("/account");
                        setDropdownOpen(false);
                      }}
                    >
                      <User className="w-3.5 h-3.5 mr-3 text-[#555]" /> ACCOUNT
                    </button>

                    <div className="h-px bg-[#1a1a1a] my-1" />

                    <button
                      className="flex items-center w-full px-4 py-2 text-[10px] font-bold text-red-500/80 uppercase tracking-widest hover:bg-red-500/10 hover:text-red-500 transition-colors text-left"
                      onClick={logout}
                    >
                      <LogOut className="w-3.5 h-3.5 mr-3" /> LOGOUT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

    </>
  );
}
