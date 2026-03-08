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
  ShoppingCart,
  GraduationCap,
  Heart,
  Building,
  Utensils,
  Car,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const UseCases = () => {
  const [activeUseCase, setActiveUseCase] = useState(0);
  const { t } = useTranslation();

  const useCases = [
    {
      icon: ShoppingCart,
      title: t("Landing.useCasesSec.useCases.0.title"),
      description: t("Landing.useCasesSec.useCases.0.description"),
      stats: {
        increase: "300%",
        metric: t("Landing.useCasesSec.useCases.0.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.0.features.0"),
        t("Landing.useCasesSec.useCases.0.features.1"),
        t("Landing.useCasesSec.useCases.0.features.2"),
        t("Landing.useCasesSec.useCases.0.features.3"),
      ],
    },
    {
      icon: GraduationCap,
      title: t("Landing.useCasesSec.useCases.1.title"),
      description: t("Landing.useCasesSec.useCases.1.description"),
      stats: {
        increase: "85%",
        metric: t("Landing.useCasesSec.useCases.1.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.1.features.0"),
        t("Landing.useCasesSec.useCases.1.features.1"),
        t("Landing.useCasesSec.useCases.1.features.2"),
        t("Landing.useCasesSec.useCases.1.features.3"),
      ],
    },
    {
      icon: Heart,
      title: t("Landing.useCasesSec.useCases.2.title"),
      description: t("Landing.useCasesSec.useCases.2.description"),
      stats: {
        increase: "60%",
        metric: t("Landing.useCasesSec.useCases.2.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.2.features.0"),
        t("Landing.useCasesSec.useCases.2.features.1"),
        t("Landing.useCasesSec.useCases.2.features.2"),
        t("Landing.useCasesSec.useCases.2.features.3"),
      ],
    },
    {
      icon: Building,
      title: t("Landing.useCasesSec.useCases.3.title"),
      description: t("Landing.useCasesSec.useCases.3.description"),
      stats: {
        increase: "45%",
        metric: t("Landing.useCasesSec.useCases.3.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.3.features.0"),
        t("Landing.useCasesSec.useCases.3.features.1"),
        t("Landing.useCasesSec.useCases.3.features.2"),
        t("Landing.useCasesSec.useCases.3.features.3"),
      ],
    },
    {
      icon: Utensils,
      title: t("Landing.useCasesSec.useCases.4.title"),
      description: t("Landing.useCasesSec.useCases.4.description"),
      stats: {
        increase: "120%",
        metric: t("Landing.useCasesSec.useCases.4.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.4.features.0"),
        t("Landing.useCasesSec.useCases.4.features.1"),
        t("Landing.useCasesSec.useCases.4.features.2"),
        t("Landing.useCasesSec.useCases.4.features.3"),
      ],
    },
    {
      icon: Car,
      title: t("Landing.useCasesSec.useCases.5.title"),
      description: t("Landing.useCasesSec.useCases.5.description"),
      stats: {
        increase: "75%",
        metric: t("Landing.useCasesSec.useCases.5.stats.metric"),
      },
      features: [
        t("Landing.useCasesSec.useCases.5.features.0"),
        t("Landing.useCasesSec.useCases.5.features.1"),
        t("Landing.useCasesSec.useCases.5.features.2"),
        t("Landing.useCasesSec.useCases.5.features.3"),
      ],
    },
  ];

  return (
    <section id="use-cases" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00ff88] mb-4">
              <Building className="w-3 h-3" />
              {t("Landing.useCasesSec.introTagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#e0e0e0] tracking-tight leading-tight mb-4">
              {t("Landing.useCasesSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.useCasesSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-base text-[#999] max-w-2xl mx-auto leading-relaxed">
              {t("Landing.useCasesSec.subHeadline")}
            </p>
          </motion.div>
        </div>

        {/* Industry pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setActiveUseCase(index)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium transition-all duration-200 ${activeUseCase === index
                  ? "bg-[#00ff88] text-black"
                  : "border border-[#1a1a1a] text-[#555] hover:border-[#252525] hover:text-[#999] bg-[#0a0a0a]"
                }`}
            >
              <useCase.icon className="w-3.5 h-3.5" />
              <span>{useCase.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Selected use case panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {/* Left panel */}
          <motion.div
            key={`left-${activeUseCase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#0a0a0a] p-6"
          >
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                {React.createElement(useCases[activeUseCase].icon, {
                  className: "w-5 h-5 text-[#00ff88]",
                })}
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#e0e0e0]">
                  {useCases[activeUseCase].title}
                </h3>
                <p className="text-[#555] text-xs mt-0.5">
                  {useCases[activeUseCase].description}
                </p>
              </div>
            </div>

            {/* Stats metric */}
            <div className="bg-[#050505] border border-[#1a1a1a] p-4 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-[#555] text-xs uppercase tracking-wider">Success Metric</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-[#00ff88]" />
                  <span className="text-lg font-bold text-[#00ff88]">
                    {useCases[activeUseCase].stats.increase}
                  </span>
                </div>
              </div>
              <p className="text-[#999] text-xs font-medium mt-2">
                {useCases[activeUseCase].stats.metric}
              </p>
            </div>

            {/* Features */}
            <h4 className="font-semibold text-[#e0e0e0] text-xs uppercase tracking-wider mb-3">
              {t("Landing.useCasesSec.keyFeatures")}
            </h4>
            <div className="space-y-2 mb-6">
              {useCases[activeUseCase].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" />
                  <span className="text-[#999] text-xs">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-5 py-2 text-xs font-semibold hover:bg-[#00e87a] transition-colors"
            >
              {t("Landing.useCasesSec.cta.viewCaseStudyButton")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Right panel */}
          <motion.div
            key={`right-${activeUseCase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="bg-[#0a0a0a] p-6 space-y-px"
          >
            {/* Quote card */}
            <div className="bg-[#050505] border border-[#1a1a1a] p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 overflow-hidden bg-[#00ff88] flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-bold text-xs">CS</span>
                </div>
                <div>
                  <h4 className="font-semibold text-[#e0e0e0] text-sm">
                    Customer Success Story
                  </h4>
                  <p className="text-[#333] text-xs">Real results from our platform</p>
                </div>
              </div>
              <blockquote className="text-[#999] italic text-xs leading-relaxed mb-4 pl-3 border-l-2 border-[#00ff88]/30">
                {String(t("Landing.useCasesSec.cta.customerSuccessQuote"))
                  .replace("{industry}", useCases[activeUseCase].title.toLowerCase())
                  .replace("{increase}", useCases[activeUseCase].stats.increase)}
              </blockquote>
              <div>
                <p className="font-semibold text-[#e0e0e0] text-sm">
                  {t("Landing.useCasesSec.cta.testimonialName")}
                </p>
                <p className="text-[#555] text-xs">
                  {t("Landing.useCasesSec.cta.testimonialPosition")}
                </p>
              </div>
            </div>

            {/* Quick stats card */}
            <div className="bg-[#050505] border border-[#1a1a1a] p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#00ff88]" />
                </div>
                <h4 className="font-semibold text-[#e0e0e0] text-sm">
                  {t("Landing.useCasesSec.quickStatsTitle")}
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#050505] p-3 text-center">
                    <div className="text-lg font-bold text-[#e0e0e0]">
                      {t(`Landing.useCasesSec.quickStats.${i}.value`)}
                    </div>
                    <div className="text-[#555] text-xs mt-0.5">
                      {t(`Landing.useCasesSec.quickStats.${i}.label`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
