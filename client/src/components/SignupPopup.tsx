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

import React, { useState } from "react";
import {
  X,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AppSettings } from "@/types/types";
import { useTranslation } from "@/lib/i18n";

interface SignupPopupProps {
  onClose: () => void;
}

const SignupPopup: React.FC<SignupPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  const appName = brandSettings?.title ?? "";

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 max-w-md w-full text-center">
          <div className="w-12 h-12 bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-6 h-6 text-[#00ff88]" />
          </div>
          <h3 className="text-xl font-bold text-[#e0e0e0] mb-2">
            {t("Landing.signupPopup.welcomeTitle") !== "Landing.signupPopup.welcomeTitle"
              ? t("Landing.signupPopup.welcomeTitle", { appName })
              : `Welcome to ${appName}!`}
          </h3>
          <p className="text-[#555] text-sm">
            {t("Landing.signupPopup.checkEmail") !== "Landing.signupPopup.checkEmail"
              ? t("Landing.signupPopup.checkEmail")
              : "Check your email for next steps to get started with your free account."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-2xl w-full overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#1a1a1a] transition-colors z-10"
          >
            <X className="w-5 h-5 text-[#555]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Benefits */}
            <div className="bg-[#00ff88] p-8 text-black">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-black/10 p-2">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{appName || "Whunt"}</span>
              </div>

              <h2 className="text-xl font-bold mb-3">
                {t("Landing.signupPopup.headline") !== "Landing.signupPopup.headline"
                  ? t("Landing.signupPopup.headline")
                  : "Start Your WhatsApp Marketing Journey"}
              </h2>
              <p className="text-black/70 mb-6 text-sm">
                {t("Landing.signupPopup.subheadline") !== "Landing.signupPopup.subheadline"
                  ? t("Landing.signupPopup.subheadline")
                  : "Join thousands of businesses already growing with our platform"}
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-black/10 p-1">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium">
                    {t("Landing.signupPopup.benefit1") !== "Landing.signupPopup.benefit1"
                      ? t("Landing.signupPopup.benefit1")
                      : "Setup in under 5 minutes"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-black/10 p-1">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium">
                    {t("Landing.signupPopup.benefit2") !== "Landing.signupPopup.benefit2"
                      ? t("Landing.signupPopup.benefit2")
                      : "Free for up to 1,000 contacts"}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-black/10 p-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium">
                    {t("Landing.signupPopup.benefit3") !== "Landing.signupPopup.benefit3"
                      ? t("Landing.signupPopup.benefit3")
                      : "300% average ROI increase"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 bg-[#0a0a0a]">
              <h3 className="text-xl font-bold text-[#e0e0e0] mb-1">
                {t("Landing.signupPopup.formTitle") !== "Landing.signupPopup.formTitle"
                  ? t("Landing.signupPopup.formTitle")
                  : "Get Started Free"}
              </h3>
              <p className="text-[#555] text-sm mb-6">
                {t("Landing.signupPopup.formSubtitle") !== "Landing.signupPopup.formSubtitle"
                  ? t("Landing.signupPopup.formSubtitle")
                  : "No credit card required. Start sending campaigns in minutes."}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#999] mb-2 uppercase tracking-wider">
                    {t("Landing.signupPopup.emailLabel") !== "Landing.signupPopup.emailLabel"
                      ? t("Landing.signupPopup.emailLabel")
                      : "Work Email"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      t("Landing.signupPopup.emailPlaceholder") !== "Landing.signupPopup.emailPlaceholder"
                        ? t("Landing.signupPopup.emailPlaceholder")
                        : "Enter your work email"
                    }
                    className="w-full px-4 py-3 border border-[#1a1a1a] bg-[#050505] text-[#e0e0e0] focus:outline-none focus:ring-1 focus:ring-[#00ff88] focus:border-[#00ff88] text-sm placeholder-[#333]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00ff88] text-black py-3 font-semibold hover:bg-[#00e87a] transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  {t("Landing.signupPopup.submitButton") !== "Landing.signupPopup.submitButton"
                    ? t("Landing.signupPopup.submitButton")
                    : "Create Free Account"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-[#333]">
                  {t("Landing.signupPopup.termsPrefix") !== "Landing.signupPopup.termsPrefix"
                    ? t("Landing.signupPopup.termsPrefix")
                    : "By signing up, you agree to our"}{" "}
                  <a href="/terms-of-service" className="text-[#00ff88] hover:opacity-70">
                    {t("Landing.signupPopup.termsLink") !== "Landing.signupPopup.termsLink"
                      ? t("Landing.signupPopup.termsLink")
                      : "Terms of Service"}
                  </a>{" "}
                  {t("Landing.signupPopup.andText") !== "Landing.signupPopup.andText"
                    ? t("Landing.signupPopup.andText")
                    : "and"}{" "}
                  <a href="/privacy-policy" className="text-[#00ff88] hover:opacity-70">
                    {t("Landing.signupPopup.privacyLink") !== "Landing.signupPopup.privacyLink"
                      ? t("Landing.signupPopup.privacyLink")
                      : "Privacy Policy"}
                  </a>
                </p>
              </div>

              <div className="mt-5 pt-5 border-t border-[#1a1a1a]">
                <div className="flex items-center justify-center space-x-4 text-xs text-[#555]">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span>
                      {t("Landing.signupPopup.noSetupFees") !== "Landing.signupPopup.noSetupFees"
                        ? t("Landing.signupPopup.noSetupFees")
                        : "No setup fees"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                    <span>
                      {t("Landing.signupPopup.cancelAnytime") !== "Landing.signupPopup.cancelAnytime"
                        ? t("Landing.signupPopup.cancelAnytime")
                        : "Cancel anytime"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPopup;
