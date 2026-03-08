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
    <section id="use-cases" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff88] mb-4">
              <Building className="w-3 h-3 fill-[#00ff88]" />
              {t("Landing.useCasesSec.introTagline").toUpperCase()}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
              {t("Landing.useCasesSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.useCasesSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-[11px] text-[#555] max-w-xl mx-auto leading-relaxed font-bold uppercase tracking-widest">
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
          className="flex flex-wrap gap-px bg-[#1a1a1a] border border-[#1a1a1a] justify-center mb-10 p-px"
        >
          {useCases.map((useCase, index) => (
            <button
              key={index}
              onClick={() => setActiveUseCase(index)}
              className={`flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.1em] transition-all duration-300 ${activeUseCase === index
                ? "bg-[#00ff88] text-black"
                : "text-[#444] hover:text-[#888] bg-[#050505] hover:bg-[#080808]"
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
            className="bg-[#050505] p-8"
          >
            <div className="flex items-center gap-5 mb-8">
              <div className="w-12 h-12 bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center">
                {React.createElement(useCases[activeUseCase].icon, {
                  className: "w-6 h-6 text-[#00ff88]",
                })}
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                  {useCases[activeUseCase].title}
                </h3>
                <p className="text-[#333] text-[10px] uppercase font-bold tracking-wider mt-1 font-mono">
                  {useCases[activeUseCase].description}
                </p>
              </div>
            </div>

            {/* Stats metric */}
            <div className="bg-[#080808] border border-[#1a1a1a] p-5 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-[#333] text-[9px] uppercase tracking-[0.2em] font-black">Success Metric</span>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-[#00ff88]" />
                  <span className="text-2xl font-black text-[#00ff88] font-mono tracking-tighter">
                    {useCases[activeUseCase].stats.increase}
                  </span>
                </div>
              </div>
              <p className="text-[#555] text-[10px] font-bold uppercase tracking-wider mt-2 font-mono">
                {useCases[activeUseCase].stats.metric}
              </p>
            </div>

            {/* Features */}
            <h4 className="font-black text-[#222] text-[9px] uppercase tracking-[0.3em] mb-4">
              {t("Landing.useCasesSec.keyFeatures").toUpperCase()}
            </h4>
            <div className="space-y-3 mb-8">
              {useCases[activeUseCase].features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00ff88] flex-shrink-0" />
                  <span className="text-[#888] text-[11px] font-medium uppercase tracking-wide">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00cc6a] transition-all rounded-none"
            >
              {(t("Landing.useCasesSec.cta.viewCaseStudyButton") !== "Landing.useCasesSec.cta.viewCaseStudyButton" ? t("Landing.useCasesSec.cta.viewCaseStudyButton") : "Explore Case Study").toUpperCase()}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Right panel */}
          <motion.div
            key={`right-${activeUseCase}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="bg-[#080808] p-8 space-y-px flex flex-col justify-center"
          >
            {/* Quote card */}
            <div className="bg-[#050505] border border-[#1a1a1a] p-6 mb-4 relative group hover:bg-[#080808] transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-[#00ff88] flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-black text-xs">CS</span>
                </div>
                <div>
                  <h4 className="font-black text-white text-[11px] uppercase tracking-widest">
                    Customer Success Story
                  </h4>
                  <p className="text-[#333] text-[9px] font-black uppercase tracking-widest">Impact Analysis</p>
                </div>
              </div>
              <blockquote className="text-[#888] italic text-xs leading-relaxed mb-6 pl-4 border-l border-[#00ff88]/30 font-medium">
                "{String(t("Landing.useCasesSec.cta.customerSuccessQuote"))
                  .replace("{industry}", useCases[activeUseCase].title.toLowerCase())
                  .replace("{increase}", useCases[activeUseCase].stats.increase)}"
              </blockquote>
              <div>
                <p className="font-black text-white text-[10px] uppercase tracking-widest">
                  {t("Landing.useCasesSec.cta.testimonialName")}
                </p>
                <p className="text-[#333] text-[9px] font-bold uppercase tracking-widest mt-1">
                  {t("Landing.useCasesSec.cta.testimonialPosition")}
                </p>
              </div>
            </div>

            {/* Quick stats card */}
            <div className="bg-[#050505] border border-[#1a1a1a] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-[#00ff88]" />
                </div>
                <h4 className="font-black text-white text-[10px] uppercase tracking-widest">
                  {t("Landing.useCasesSec.quickStatsTitle").toUpperCase()}
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-px bg-[#1a1a1a]">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#050505] p-4 text-center">
                    <div className="text-xl font-black text-white font-mono tracking-tighter">
                      {t(`Landing.useCasesSec.quickStats.${i}.value`)}
                    </div>
                    <div className="text-[#333] text-[8px] mt-1 font-black uppercase tracking-[0.2em]">
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
