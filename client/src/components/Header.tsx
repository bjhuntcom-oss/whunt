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

import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LogOut,
  User,
  Settings,
  MessageSquare,
} from "lucide-react";
import LoadingAnimation from "./LoadingAnimation";
import { useAuth } from "@/contexts/auth-context";
import useStaticData from "@/hooks/useStaticData";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelector } from "./language-selector";
import { AppSettings } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAboutMega, setShowAboutMega] = useState(false);
  const [showResourcesMega, setShowResourcesMega] = useState(false);
  const [showAboutMobile, setShowAboutMobile] = useState(false);
  const [showResourcesMobile, setShowResourcesMobile] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [getStartedLoading, setGetStartedLoading] = useState(false);
  const [location, setLocation] = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  const staticData = useStaticData();
  const { t } = useTranslation();

  const username = (user?.firstName || "") + " " + (user?.lastName || "");

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowAboutMobile(false);
    setShowResourcesMobile(false);
    closeMegaMenus();
  }, [location]);

  const handleLogin = () => {
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
    }, 2000);
  };

  const handleGetStarted = () => {
    setGetStartedLoading(true);
    setTimeout(() => {
      setGetStartedLoading(false);
    }, 2000);
  };

  const closeMegaMenus = () => {
    setShowAboutMega(false);
    setShowResourcesMega(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setShowAboutMobile(false);
      setShowResourcesMobile(false);
    }
  };

  const MegaMenu = ({
    items,
    isVisible,
  }: {
    items: typeof staticData.header.aboutMenuItems;
    isVisible: boolean;
    title: string;
  }) => (
    <div
      className={`fixed left-0 right-0 w-screen bg-[#0a0a0a] border-b border-[#1a1a1a] z-50 transition-all duration-300 ease-out max-h-[80vh] overflow-y-auto ${isVisible
        ? "opacity-100 translate-y-0 visible"
        : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      style={{ top: isScrolled ? "64px" : "72px" }}
    >
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div
          className={`grid gap-4 ${items.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {items.map((item, index) => (
            <Link
              key={`${item.title}-${index}`}
              href={item.path}
              className="group bg-[#0e0e0e] p-5 hover:bg-[#111] border border-[#1a1a1a] transition-all duration-300 rounded-none h-full"
              onClick={closeMegaMenus}
            >
              <div className="relative overflow-hidden mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 rounded-none"
                  loading="lazy"
                />
                <div className="absolute bottom-3 right-3 bg-[#0a0a0a] p-2 border border-[#1a1a1a] rounded-none">
                  <item.icon className="w-5 h-5 text-[#00ff88]" />
                </div>
              </div>
              <h3 className="font-semibold text-[#e0e0e0] mb-1 text-sm group-hover:text-[#00ff88] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#555] text-xs leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <div className="flex items-center mt-2 text-[#00ff88] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <span className="text-xs font-medium">{t("Landing.header.Learn")}</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#1a1a1a] hidden md:block">
          <div className="bg-[#0e0e0e] p-6 border border-[#1a1a1a] rounded-none">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-[#e0e0e0] mb-1">
                  {t("Landing.header.redystart")}
                </h3>
                <p className="text-[#555] text-xs">
                  {t("Landing.header.join", {
                    appName: brandSettings?.title ?? "",
                  })}
                </p>
              </div>
              <Link
                href="/signup"
                className="bg-[#00ff88] text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#00e87a] transition-all flex items-center gap-2 whitespace-nowrap rounded-none"
                onClick={closeMegaMenus}
              >
                {t("Landing.header.start")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${isScrolled
          ? "bg-[#050505]/95 backdrop-blur-xl border-b border-[#1a1a1a]"
          : "bg-[#050505]"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? "h-16" : "h-[72px]"
              }`}
          >
            <Link href="/" className="flex items-center space-x-2.5 group">
              {brandSettings?.logo ? (
                <img
                  src={brandSettings.logo}
                  alt="Logo"
                  className="h-9 object-contain"
                />
              ) : (
                <span className="font-bold text-[#e0e0e0] text-xl tracking-tight">
                  Whunt
                  <span className="w-1.5 h-1.5 bg-[#00ff88] ml-1"></span>
                </span>
              )}
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all rounded-none ${location === "/"
                  ? "text-[#00ff88] bg-[#0e0e0e]"
                  : "text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e]"
                  }`}
              >
                {t("Landing.header.Navlinks.0")}
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setShowAboutMega(true)}
                onMouseLeave={() => setShowAboutMega(false)}
              >
                <button
                  className={`flex items-center text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all cursor-pointer bg-transparent border-none rounded-none ${showAboutMega
                    ? "text-[#00ff88] bg-[#0e0e0e]"
                    : "text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e]"
                    }`}
                  aria-haspopup="true"
                  aria-expanded={showAboutMega}
                  type="button"
                >
                  {t("Landing.header.Navlinks.1")}
                  <ChevronDown
                    className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${showAboutMega ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div className="absolute left-0 right-0 h-4" style={{ top: "100%" }} />
                <MegaMenu
                  items={staticData.header.aboutMenuItems}
                  isVisible={showAboutMega}
                  title="Company"
                />
              </div>

              <div
                className="relative group"
                onMouseEnter={() => setShowResourcesMega(true)}
                onMouseLeave={() => setShowResourcesMega(false)}
              >
                <button
                  className={`flex items-center text-[10px] font-bold uppercase tracking-widest px-4 py-2 transition-all cursor-pointer bg-transparent border-none rounded-none ${showResourcesMega
                    ? "text-[#00ff88] bg-[#0e0e0e]"
                    : "text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e]"
                    }`}
                  aria-haspopup="true"
                  aria-expanded={showResourcesMega}
                  type="button"
                >
                  {t("Landing.header.Navlinks.2")}
                  <ChevronDown
                    className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${showResourcesMega ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div className="absolute left-0 right-0 h-4" style={{ top: "100%" }} />
                <MegaMenu
                  items={staticData.header.resourcesMenuItems}
                  isVisible={showResourcesMega}
                  title="Resources"
                />
              </div>

              <div className="mx-1">
                <LanguageSelector />
              </div>

              {!isAuthenticated && (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    href="/login"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#555] hover:text-[#e0e0e0] px-4 py-2 hover:bg-[#0e0e0e] transition-all rounded-none"
                  >
                    {t("Landing.header.Navlinks.3")}
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#00ff88] text-black text-[10px] font-bold uppercase tracking-widest px-6 py-3 hover:bg-[#00e87a] transition-all flex items-center gap-2 rounded-none"
                  >
                    {t("Landing.header.getstart")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {isAuthenticated && (
                <div className="flex items-center gap-3 ml-2">
                  <Link
                    href="/dashboard"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#555] hover:text-[#e0e0e0] px-4 py-2 hover:bg-[#0e0e0e] transition-all rounded-none"
                  >
                    {t("Landing.header.dash")}
                  </Link>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="w-9 h-9 overflow-hidden border border-[#1a1a1a] hover:border-[#00ff88] transition-all rounded-none"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=00ff88&color=000000&rounded=false`}
                        alt="User Profile"
                        className="w-full h-full object-cover rounded-none"
                      />
                    </button>

                    <div
                      className={`absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-[#1a1a1a] z-50 overflow-hidden transition-all duration-300 origin-top-right rounded-none ${dropdownOpen
                        ? "opacity-100 scale-100 visible"
                        : "opacity-0 scale-95 invisible pointer-events-none"
                        }`}
                    >
                      <div className="px-4 py-3 border-b border-[#1a1a1a]">
                        <p className="text-sm font-semibold text-[#e0e0e0] truncate">
                          {username}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <button
                          className="flex items-center w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#555] hover:bg-[#0e0e0e] hover:text-[#e0e0e0] transition-all rounded-none"
                          onClick={() => {
                            setLocation("/settings");
                            setDropdownOpen(false);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-3 opacity-60 text-[#00ff88]" />
                          {t("Landing.header.Settings")}
                        </button>
                        <button
                          className="flex items-center w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#555] hover:bg-[#0e0e0e] hover:text-[#e0e0e0] transition-all rounded-none"
                          onClick={() => {
                            setLocation("/account");
                            setDropdownOpen(false);
                          }}
                        >
                          <User className="w-4 h-4 mr-3 opacity-60 text-[#00ff88]" />
                          {t("Landing.header.Account")}
                        </button>
                        <div className="my-1 border-t border-[#1a1a1a]"></div>
                        <button
                          className="flex items-center w-full px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-[#ff3b3b] hover:bg-[#ff3b3b]/5 transition-all rounded-none"
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4 mr-3 opacity-70" />
                          {t("Landing.header.logout")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </nav>

            <button
              className="lg:hidden p-2 hover:bg-[#0e0e0e] transition-colors"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-[#555]" />
              ) : (
                <Menu className="w-5 h-5 text-[#555]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-30 transition-all duration-400 ${isMenuOpen ? "visible" : "invisible pointer-events-none"
          }`}
      >
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-400 ${isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-full max-w-sm h-full bg-[#050505] border-l border-[#1a1a1a] transition-transform duration-400 ease-out overflow-y-auto ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ paddingTop: isScrolled ? "64px" : "72px" }}
        >
          <div className="px-5 py-6 space-y-1">
            <Link
              href="/"
              className={`block px-4 py-3 text-sm font-medium transition-colors ${location === "/"
                ? "text-[#e0e0e0] bg-[#0e0e0e]"
                : "text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e]"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {t("Landing.header.Navlinks.0")}
            </Link>

            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-[#555] text-sm font-medium hover:bg-[#0e0e0e] transition-colors"
                onClick={() => setShowAboutMobile(!showAboutMobile)}
                aria-expanded={showAboutMobile}
              >
                <span>{t("Landing.header.Navlinks.1")}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#333] transition-transform duration-200 ${showAboutMobile ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${showAboutMobile ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-0.5 pl-4 pr-2 pb-2">
                    {staticData.header.aboutMenuItems.map((item, index) => (
                      <Link
                        key={`mobile-about-${index}`}
                        href={item.path}
                        className="flex items-center gap-3 px-3 py-2.5 text-[#555] hover:text-[#00ff88] hover:bg-[#00ff88]/5 text-sm font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-[#00ff88]" />
                        </div>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-[#555] text-sm font-medium hover:bg-[#0e0e0e] transition-colors"
                onClick={() => setShowResourcesMobile(!showResourcesMobile)}
                aria-expanded={showResourcesMobile}
              >
                <span>{t("Landing.header.Navlinks.2")}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#333] transition-transform duration-200 ${showResourcesMobile ? "rotate-180" : ""
                    }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${showResourcesMobile ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-0.5 pl-4 pr-2 pb-2">
                    {staticData.header.resourcesMenuItems.map((item, index) => (
                      <Link
                        key={`mobile-resources-${index}`}
                        href={item.path}
                        className="flex items-center gap-3 px-3 py-2.5 text-[#555] hover:text-[#00ff88] hover:bg-[#00ff88]/5 text-sm font-medium transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-[#00ff88]" />
                        </div>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#1a1a1a] space-y-2">
              {!isAuthenticated ? (
                <>
                  <Link
                    href="/login"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogin();
                    }}
                    className="block w-full text-center px-4 py-3 text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e] text-sm font-medium transition-colors"
                  >
                    {loginLoading ? (
                      <LoadingAnimation size="sm" color="green" />
                    ) : (
                      t("Landing.header.Navlinks.3")
                    )}
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleGetStarted();
                    }}
                    className="w-full bg-[#00ff88] text-black py-3 hover:bg-[#00e87a] transition-colors font-semibold flex items-center justify-center text-sm"
                  >
                    {getStartedLoading ? (
                      <LoadingAnimation size="sm" color="white" />
                    ) : (
                      <>
                        {t("Landing.header.getstart")}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-3 text-[#555] hover:text-[#e0e0e0] hover:bg-[#0e0e0e] text-sm font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("Landing.header.dash")}
                  </Link>
                  <div className="border-t border-[#1a1a1a] pt-4 mt-2">
                    <div className="flex items-center gap-3 px-4 mb-3">
                      <div className="w-9 h-9 overflow-hidden border-2 border-[#1a1a1a]">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=00ff88&color=000000`}
                          alt="User Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-[#e0e0e0] font-semibold">{username}</span>
                    </div>
                    <div className="space-y-0.5">
                      <button
                        className="flex items-center w-full px-4 py-2.5 text-sm text-[#555] hover:bg-[#0e0e0e] hover:text-[#e0e0e0] transition-colors"
                        onClick={() => {
                          setLocation("/settings");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2.5 opacity-60" />
                        {t("Landing.header.Settings")}
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2.5 text-sm text-[#555] hover:bg-[#0e0e0e] hover:text-[#e0e0e0] transition-colors"
                        onClick={() => {
                          setLocation("/account");
                          setIsMenuOpen(false);
                        }}
                      >
                        <User className="w-4 h-4 mr-2.5 opacity-60" />
                        {t("Landing.header.Account")}
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2.5 text-sm text-[#ff3b3b] hover:bg-[#ff3b3b]/10 transition-colors"
                        onClick={() => {
                          logout();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2.5 opacity-70" />
                        {t("Landing.header.logout")}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {(showAboutMega || showResourcesMega) && (
        <div
          className="fixed inset-0 bg-black/20 z-30 transition-opacity duration-200"
          onClick={closeMegaMenus}
        />
      )}
    </>
  );
};

export default Header;
