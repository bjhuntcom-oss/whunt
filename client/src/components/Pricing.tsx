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

import React, { useEffect, useState } from "react";
import {
  Check,
  X,
  Zap,
  Crown,
  Rocket,
  Building,
  ArrowRight,
  AlertCircle,
  Star,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { PaymentProvidersResponse, Plan, PlansDataTypes } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import CheckoutModal from "./modals/CheckoutPage";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/lib/i18n";
import { Link, useLocation } from "wouter";

const Pricing = () => {
  const { t } = useTranslation();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const { toast } = useToast();
  const { user, currencySymbol, currency } = useAuth();

  const [, setLocation] = useLocation();

  const { data: paymentProviders, isLoading: isLoadingProviders } =
    useQuery<PaymentProvidersResponse>({
      queryKey: ["/api/payment-providers"],
      queryFn: async () => {
        const res = await apiRequest("GET", "/api/payment-providers");
        if (!res.ok) throw new Error("Failed to fetch payment providers");
        const data = await res.json();
        return data;
      },
    });

  const { data: currencyMapData } = useQuery<{
    success: boolean;
    data: {
      currencyMap: Record<string, { providerKey: string; providerId: string; providerName: string }[]>;
      availableCurrencies: string[];
    };
  }>({
    queryKey: ["/api/payment-providers/currency-map"],
    queryFn: async () => {
      const res = await apiRequest("GET", "/api/payment-providers/currency-map");
      return res.json();
    },
  });

  const availableCurrencies = currencyMapData?.data?.availableCurrencies || [];
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  useEffect(() => {
    if (availableCurrencies.length > 0 && !selectedCurrency) {
      const upper = currency?.toUpperCase() || "";
      if (availableCurrencies.includes(upper)) {
        setSelectedCurrency(upper);
      } else {
        setSelectedCurrency(availableCurrencies[0]);
      }
    }
  }, [availableCurrencies, currency]);

  const currencySymbolMap: Record<string, string> = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    AED: "د.إ",
    SGD: "S$",
    AUD: "A$",
    CAD: "C$",
    JPY: "¥",
    CNY: "¥",
    BRL: "R$",
    MXN: "MX$",
    ZAR: "R",
  };

  const activeCurrencySymbol = selectedCurrency
    ? (currencySymbolMap[selectedCurrency] || selectedCurrency + " ")
    : currencySymbol;

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    Crown,
    Rocket,
    Star,
    Building,
  };

  const fetchPlans = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await apiRequest("GET", "/api/admin/plans");
      const data: PlansDataTypes = await response.json();
      if (data.success) {
        setPlans(data.data);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast({
        title: "Error",
        description: "Failed to fetch plans",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    if (!user) {
      setLocation("/login");
    }
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  const renderPlansContent = () => {
    if (loading) {
      return (
        <div className="text-center py-16">
          <div className="inline-block animate-spin h-8 w-8 border-2 border-[#1a1a1a] border-t-[#00ff88] mb-4"></div>
          <p className="text-[#555] text-sm">
            {t("Landing.pricingSec.loading")}
          </p>
        </div>
      );
    }

    if (plans.length === 0) {
      return (
        <div className="text-center py-16 bg-[#0a0a0a] border border-[#1a1a1a]">
          <AlertCircle className="w-10 h-10 text-[#333] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#e0e0e0] mb-2">
            {t("Landing.pricingSec.noPlans.title")}
          </h3>
          <p className="text-[#555] text-sm">
            {t("Landing.pricingSec.noPlans.description")}
          </p>
        </div>
      );
    }

    const sortedPlans = plans.sort((a, b) => {
      const priceA = Number(isAnnual ? a.annualPrice : a.monthlyPrice);
      const priceB = Number(isAnnual ? b.annualPrice : b.monthlyPrice);
      return priceA - priceB;
    });

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-8">
        {sortedPlans.map((plan) => {
          const IconComponent = iconMap[plan.icon] || Zap;
          const isPopular = plan.popular;

          return (
            <div
              key={plan.id}
              className={`bg-[#0a0a0a] p-6 flex flex-col h-full relative ${isPopular ? "border-t-2 border-t-[#00ff88]" : ""
                }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="mb-4">
                  <span className="bg-[#00ff88] text-black px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Icon + Plan Name */}
              <div className="mb-5">
                <div className="w-9 h-9 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center mb-3">
                  <IconComponent className="w-4 h-4 text-[#00ff88]" />
                </div>
                <h3 className="text-lg font-bold text-[#e0e0e0] mb-1">
                  {plan.name}
                </h3>
                <p className="text-[#555] text-xs leading-relaxed min-h-[32px]">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b border-[#1a1a1a]">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#e0e0e0]">
                    {activeCurrencySymbol}
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-[#555] text-xs">
                    /{isAnnual
                      ? t("Landing.pricingSec.pricing.year")
                      : t("Landing.pricingSec.pricing.month")}
                  </span>
                </div>

                {plan.permissions && (
                  <div className="mt-2 space-y-0.5">
                    <div className="text-[#555] text-xs">
                      {t("Landing.pricingSec.pricing.upTo")}{" "}
                      <span className="text-[#999]">{plan.permissions.contacts}</span>{" "}
                      {t("Landing.pricingSec.pricing.contacts")}
                    </div>
                    <div className="text-[#555] text-xs">
                      <span className="text-[#999]">{plan.permissions.channel}</span>{" "}
                      {t("Landing.pricingSec.pricing.channels")}
                    </div>
                    {plan.permissions.automation && (
                      <div className="text-[#555] text-xs">
                        <span className="text-[#999]">{plan.permissions.automation}</span>{" "}
                        {t("Landing.pricingSec.pricing.automation")}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-6 flex-grow">
                {plan.features && plan.features.length > 0 ? (
                  plan.features.map((feature, featureIndex) => (
                    <li
                      key={`${feature.name}-${featureIndex}`}
                      className="flex items-start gap-2.5"
                    >
                      {feature.included ? (
                        <Check className="w-3.5 h-3.5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-[#333] mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${feature.included ? "text-[#999]" : "text-[#333]"
                          }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#999]">
                        {plan.permissions.contacts}{" "}
                        {t("Landing.pricingSec.pricing.contacts")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#999]">
                        {plan.permissions.channel}{" "}
                        {t("Landing.pricingSec.pricing.channels")}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#00ff88] mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-[#999]">
                        {plan.permissions.automation}{" "}
                        {t("Landing.pricingSec.pricing.automation")}
                      </span>
                    </li>
                  </>
                )}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-2.5 text-sm font-semibold transition-colors flex-shrink-0 ${isPopular
                    ? "bg-[#00ff88] text-black hover:bg-[#00e87a]"
                    : "bg-[#0e0e0e] border border-[#252525] text-[#e0e0e0] hover:border-[#333] hover:bg-[#111]"
                  }`}
              >
                {Number.parseFloat(plan.monthlyPrice) === 0
                  ? t("Landing.pricingSec.planCTA.freeButton")
                  : t("Landing.pricingSec.planCTA.paidButton")}
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const faqData = t("Landing.pricingSec.faq.questions") as unknown as Array<{
    q: string;
    a: string;
  }>;

  return (
    <>
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00ff88] mb-4">
              <Crown className="w-3 h-3" />
              {t("Landing.pricingSec.introTagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#e0e0e0] tracking-tight leading-tight mb-4">
              {t("Landing.pricingSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.pricingSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-base text-[#999] max-w-2xl mx-auto mb-8">
              {t("Landing.pricingSec.subHeadline")}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
              <span className={`text-sm font-medium ${isAnnual ? "text-[#555]" : "text-[#e0e0e0]"}`}>
                {t("Landing.pricingSec.billingToggle.monthly")}
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-12 h-6 transition-colors ${isAnnual ? "bg-[#00ff88]" : "bg-[#1a1a1a]"
                  }`}
              >
                <div
                  className={`absolute w-4 h-4 bg-black top-1 transition-transform ${isAnnual ? "translate-x-7" : "translate-x-1"
                    }`}
                ></div>
              </button>
              <span className={`text-sm font-medium ${isAnnual ? "text-[#e0e0e0]" : "text-[#555]"}`}>
                {t("Landing.pricingSec.billingToggle.annual")}
              </span>
              {isAnnual && (
                <span className="bg-[#00ff88]/10 text-[#00ff88] text-xs px-2.5 py-1 font-medium">
                  {t("Landing.pricingSec.billingToggle.saveLabel")}
                </span>
              )}
              {availableCurrencies.length > 1 && (
                <select
                  value={selectedCurrency}
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className="px-3 py-1.5 border border-[#1a1a1a] text-xs font-medium bg-[#0e0e0e] text-[#999] focus:ring-1 focus:ring-[#00ff88] focus:border-[#00ff88] outline-none cursor-pointer"
                >
                  {availableCurrencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {currencySymbolMap[cur] || ""} {cur}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Plans */}
          {renderPlansContent()}

          {/* FAQ */}
          <div className="bg-[#050505] border border-[#1a1a1a] p-6 mb-6">
            <h3 className="text-lg font-bold text-[#e0e0e0] text-center mb-6 tracking-tight">
              {t("Landing.pricingSec.faq.title")}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1a1a1a]">
              {faqData.map((faq, index) => (
                <div
                  key={`${faq.q}-${index}`}
                  className="bg-[#050505] p-5"
                >
                  <h4 className="font-semibold text-[#e0e0e0] text-sm mb-2">{faq.q}</h4>
                  <p className="text-[#555] text-xs leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 text-center">
            <h3 className="text-lg font-bold text-[#e0e0e0] mb-2 tracking-tight">
              {t("Landing.pricingSec.enterprise.title")}
            </h3>
            <p className="text-[#555] text-xs mb-5">
              {t("Landing.pricingSec.enterprise.description")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-6 py-2.5 text-sm font-semibold hover:bg-[#00e87a] transition-colors"
            >
              {t("Landing.pricingSec.enterprise.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {selectedPlan && (
        <CheckoutModal
          plan={selectedPlan}
          isAnnual={isAnnual}
          open={checkoutOpen}
          onOpenChange={setCheckoutOpen}
          userId={user?.id}
          paymentProviders={paymentProviders?.data}
          isLoadingProviders={isLoadingProviders}
          selectedCurrency={selectedCurrency}
        />
      )}
    </>
  );
};

export default Pricing;
