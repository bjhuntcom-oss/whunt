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
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4">
        <div className="bg-[#050505] border border-[#1a1a1a] p-10 max-w-sm w-full text-center rounded-none shadow-2xl">
          <div className="w-16 h-16 bg-[#00ff88]/5 border border-[#00ff88]/10 flex items-center justify-center mx-auto mb-6 rounded-none">
            <CheckCircle className="w-8 h-8 text-[#00ff88]" />
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
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-[#050505] border border-[#1a1a1a] max-w-2xl w-full overflow-hidden rounded-none shadow-2xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#1a1a1a] transition-all z-10 rounded-none group"
          >
            <X className="w-5 h-5 text-[#555] group-hover:text-[#00ff88]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Benefits */}
            <div className="bg-[#00ff88] p-10 text-black flex flex-col justify-center">
              <div className="flex items-center space-x-3 mb-8">
                <div className="bg-black/10 p-2 rounded-none">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xl font-black uppercase tracking-tighter">{appName || "Whunt"}</span>
              </div>

              <h2 className="text-3xl font-black leading-tight mb-4 tracking-tight">
                {t("Landing.signupPopup.headline")}
              </h2>
              <p className="text-black/60 mb-8 text-sm font-medium">
                {t("Landing.signupPopup.subheadline")}
              </p>

              <div className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center space-x-4">
                    <div className="bg-black/10 p-1.5 rounded-none">
                      {num === 1 ? <Zap className="w-4 h-4" /> : num === 2 ? <Users className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold tracking-tight">
                      {t(`Landing.signupPopup.benefit${num}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-10 bg-[#050505]">
              <h3 className="text-2xl font-black text-[#e0e0e0] mb-2 tracking-tight">
                {t("Landing.signupPopup.formTitle")}
              </h3>
              <p className="text-[#555] text-sm mb-8 leading-relaxed">
                {t("Landing.signupPopup.formSubtitle")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#999] mb-3 uppercase tracking-widest">
                    {t("Landing.signupPopup.emailLabel")}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("Landing.signupPopup.emailPlaceholder")}
                    className="w-full px-5 py-4 border border-[#1a1a1a] bg-[#0a0a0a] text-[#e0e0e0] focus:outline-none focus:ring-1 focus:ring-[#00ff88] focus:border-[#00ff88] text-sm placeholder-[#333] rounded-none transition-all"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00ff88] text-black py-4 font-bold uppercase tracking-widest hover:bg-[#00e87a] transition-all flex items-center justify-center gap-3 text-xs rounded-none shadow-lg shadow-[#00ff88]/10"
                >
                  {t("Landing.signupPopup.submitButton")}
                  <ArrowRight className="w-5 h-5" />
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
