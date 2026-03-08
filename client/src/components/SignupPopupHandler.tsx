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
import { useAuth } from "@/contexts/auth-context";
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

export function SignupPopupHandler() {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const minTimeReached = useRef(false);

  useEffect(() => {
    if (isAuthenticated) return;

    const popupShown = sessionStorage.getItem("signupPopupShown");
    if (popupShown === "true") return;

    const minTimer = setTimeout(() => {
      minTimeReached.current = true;
    }, 8000);

    const autoTimer = setTimeout(() => {
      if (sessionStorage.getItem("signupPopupShown") !== "true") {
        setShowPopup(true);
        sessionStorage.setItem("signupPopupShown", "true");
      }
    }, 30000);

    const handleScroll = () => {
      if (!minTimeReached.current) return;
      const alreadyShown = sessionStorage.getItem("signupPopupShown");
      if (alreadyShown === "true") return;
      const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollRatio > 0.75) {
        setShowPopup(true);
        sessionStorage.setItem("signupPopupShown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(minTimer);
      clearTimeout(autoTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAuthenticated]);

  const handleClose = () => setShowPopup(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.href = `/signup?email=${encodeURIComponent(email)}`;
      }, 2000);
    }
  };

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  const appName = brandSettings?.title ?? "Whunt";

  if (!showPopup || isAuthenticated) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4">
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
            {t("Landing.signupPopup.redirecting") !== "Landing.signupPopup.redirecting"
              ? t("Landing.signupPopup.redirecting")
              : "Redirecting you to complete your registration..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-[#0a0a0a] border border-[#1a1a1a] max-w-2xl w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-[#1a1a1a] transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-[#555]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left — brand panel */}
            <div className="bg-[#00ff88] p-8 text-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-black/10 p-2">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold">{appName}</span>
              </div>

              <h2 className="text-xl font-bold mb-3">
                {t("Landing.signupPopup.headline") !== "Landing.signupPopup.headline"
                  ? t("Landing.signupPopup.headline")
                  : "Start Your WhatsApp Marketing Journey"}
              </h2>
              <p className="text-black/70 mb-6 text-sm leading-relaxed">
                {t("Landing.signupPopup.subheadline") !== "Landing.signupPopup.subheadline"
                  ? t("Landing.signupPopup.subheadline")
                  : "Join thousands of businesses already growing with our platform"}
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: Zap,
                    text: t("Landing.signupPopup.benefit1") !== "Landing.signupPopup.benefit1"
                      ? t("Landing.signupPopup.benefit1")
                      : "Setup in under 5 minutes",
                  },
                  {
                    icon: Users,
                    text: t("Landing.signupPopup.benefit2") !== "Landing.signupPopup.benefit2"
                      ? t("Landing.signupPopup.benefit2")
                      : "Free for up to 1,000 contacts",
                  },
                  {
                    icon: TrendingUp,
                    text: t("Landing.signupPopup.benefit3") !== "Landing.signupPopup.benefit3"
                      ? t("Landing.signupPopup.benefit3")
                      : "300% average ROI increase",
                  },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="bg-black/10 p-1 flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
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

              <p className="text-xs text-[#333] text-center mt-4">
                {t("Landing.signupPopup.termsPrefix") !== "Landing.signupPopup.termsPrefix"
                  ? t("Landing.signupPopup.termsPrefix")
                  : "By signing up, you agree to our"}{" "}
                <a href="/terms" className="text-[#00ff88] hover:opacity-70">
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

              <div className="mt-5 pt-5 border-t border-[#1a1a1a] flex items-center justify-center gap-6 text-xs text-[#555]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span>
                    {t("Landing.signupPopup.noSetupFees") !== "Landing.signupPopup.noSetupFees"
                      ? t("Landing.signupPopup.noSetupFees")
                      : "No setup fees"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
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
  );
}
