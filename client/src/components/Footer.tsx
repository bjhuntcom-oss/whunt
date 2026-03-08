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

import React from "react";
import { Link } from "wouter";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useQuery } from "@tanstack/react-query";
import { AppSettings } from "@/types/types";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  const productLinks = t(
    "Landing.footerSec.links.product"
  ) as unknown as string[];
  const companyLinks = t(
    "Landing.footerSec.links.company"
  ) as unknown as string[];
  const resourcesLinks = t(
    "Landing.footerSec.links.resources"
  ) as unknown as string[];
  const legalLinks = t("Landing.footerSec.links.legal") as unknown as string[];

  const links = {
    product: [
      { name: productLinks[0], href: "/#features" },
      { name: productLinks[1], href: "/#how-it-works" },
      { name: productLinks[2], href: "/#use-cases" },
    ],
    company: [
      { name: companyLinks[0], href: "/about" },
      { name: companyLinks[1], href: "/contact" },
      { name: companyLinks[2], href: "/careers" },
    ],
    resources: [
      { name: resourcesLinks[1], href: "/case-studies" },
      { name: resourcesLinks[2], href: "/whatsapp-guide" },
      { name: resourcesLinks[3], href: "/best-practices" },
    ],
    legal: [
      { name: legalLinks[0], href: "/privacy-policy" },
      { name: legalLinks[1], href: "/terms" },
      { name: legalLinks[2], href: "/cookie-policy" },
    ],
  };

  const renderLink = (link: { name: string; href: string }, index: number) => (
    <li key={index}>
      {link.href.startsWith("/") ? (
        <Link
          to={link.href}
          className="text-xs text-[#555] hover:text-[#00ff88] transition-colors block mb-2.5"
        >
          {link.name}
        </Link>
      ) : (
        <a
          href={link.href}
          className="text-xs text-[#555] hover:text-[#00ff88] transition-colors block mb-2.5"
        >
          {link.name}
        </a>
      )}
    </li>
  );

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              {brandSettings?.logo2 && brandSettings.logo2 !== "/uploads/null" ? (
                <img
                  src={brandSettings.logo2}
                  alt="Logo"
                  className="h-8 object-contain"
                />
              ) : brandSettings?.logo ? (
                <img
                  src={brandSettings.logo}
                  alt="Logo"
                  className="h-8 object-contain"
                />
              ) : (
                <span className="font-bold text-[#e0e0e0] text-lg tracking-tight flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-[#00ff88]" />
                  Whunt
                </span>
              )}
            </Link>
            <p className="text-[#555] text-xs leading-relaxed max-w-sm mb-5">
              {t("Landing.footerSec.brandSection.description")}
            </p>
            <div className="flex gap-1">
              <a
                href="https://x.com"
                className="p-2 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#252525] transition-colors"
                aria-label={t("Landing.footerSec.socialLinks.twitter")}
              >
                <Twitter className="w-3.5 h-3.5 text-[#555]" />
              </a>
              <a
                href="https://linkedin.com/"
                className="p-2 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#252525] transition-colors"
                aria-label={t("Landing.footerSec.socialLinks.linkedin")}
              >
                <Linkedin className="w-3.5 h-3.5 text-[#555]" />
              </a>
              <a
                href="https://github.com/"
                className="p-2 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#252525] transition-colors"
                aria-label={t("Landing.footerSec.socialLinks.github")}
              >
                <Github className="w-3.5 h-3.5 text-[#555]" />
              </a>
              <a
                href="https://mail.google.com"
                className="p-2 bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#252525] transition-colors"
                aria-label={t("Landing.footerSec.socialLinks.mail")}
              >
                <Mail className="w-3.5 h-3.5 text-[#555]" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[#e0e0e0] mb-3 uppercase tracking-wider">
              {t("Landing.footerSec.links.productTitle") !== "Landing.footerSec.links.productTitle"
                ? t("Landing.footerSec.links.productTitle")
                : "Product"}
            </h3>
            <ul>
              {links.product.map((link, index) => renderLink(link, index))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[#e0e0e0] mb-3 uppercase tracking-wider">
              {t("Landing.footerSec.links.companyTitle") !== "Landing.footerSec.links.companyTitle"
                ? t("Landing.footerSec.links.companyTitle")
                : "Company"}
            </h3>
            <ul>
              {links.company.map((link, index) => renderLink(link, index))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[#e0e0e0] mb-3 uppercase tracking-wider">
              {t("Landing.footerSec.links.resourcesTitle") !== "Landing.footerSec.links.resourcesTitle"
                ? t("Landing.footerSec.links.resourcesTitle")
                : "Resources"}
            </h3>
            <ul>
              {links.resources.map((link, index) => renderLink(link, index))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[#e0e0e0] mb-3 uppercase tracking-wider">
              {t("Landing.footerSec.links.legalTitle") !== "Landing.footerSec.links.legalTitle"
                ? t("Landing.footerSec.links.legalTitle")
                : "Legal"}
            </h3>
            <ul>
              {links.legal.map((link, index) => renderLink(link, index))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#333]">
              {t("Landing.footerSec.bottomBar.copyrightText", {
                appName: brandSettings?.title ?? "",
              })}
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/terms"
                className="text-xs text-[#333] hover:text-[#00ff88] transition-colors"
              >
                {t("Landing.footerSec.bottomBar.termsLink")}
              </Link>
              <Link
                to="/privacy-policy"
                className="text-xs text-[#333] hover:text-[#00ff88] transition-colors"
              >
                {t("Landing.footerSec.bottomBar.privacyLink")}
              </Link>
              <Link
                to="/cookie-policy"
                className="text-xs text-[#333] hover:text-[#00ff88] transition-colors"
              >
                {t("Landing.footerSec.bottomBar.cookieLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
