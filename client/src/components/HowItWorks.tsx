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

import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";

import step1Image from "../images/Connect_Your_Meta_API.png";
import step2Image from "../images/Import_Your_Contacts.png";
import step3Image from "../images/create_lanch_campaigns.png";
import step4Image from "../images/Track_&_Optimize.png";

interface FeatureStep {
  icon: keyof typeof LucideIcons;
  title: string;
  description: string;
  details: string[];
  color: string;
  bgColor: string;
  demo?: {
    title?: string;
    stats?: string;
    features?: string[];
  };
}

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { t } = useTranslation();

  const steps: FeatureStep[] = (t as any)("Landing.howItWorksSec.steps", {
    returnObjects: true,
  });

  const stepImages = [step1Image, step2Image, step3Image, step4Image];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const progressBarLabels = (t as any)("Landing.howItWorksSec.progressBar", {
    returnObjects: true,
  }) as { previous: string; nextStep: string };

  const visualDemoLabel = t(
    "Landing.howItWorksSec.visualDemo.whatsAppBusinessDashboard"
  );

  const cta = (t as any)("Landing.howItWorksSec.cta", {
    returnObjects: true,
  }) as {
    readyToGetStarted: string;
    joinText: string;
    startFreeTrial: string;
  };

  return (
    <section id="how-it-works" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
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
              <Play className="w-3 h-3 fill-[#00ff88]" />
              {t("Landing.howItWorksSec.introTagline").toUpperCase()}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
              {t("Landing.howItWorksSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.howItWorksSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-[11px] text-[#555] max-w-xl mx-auto leading-relaxed font-bold uppercase tracking-widest">
              {t("Landing.howItWorksSec.subHeadline")}
            </p>
          </motion.div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-8">
          {steps.slice(0, 3).map((step: FeatureStep, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.08,
              }}
              className={`bg-[#050505] p-6 cursor-pointer transition-colors relative group ${index <= activeStep
                ? "bg-[#080808]"
                : "hover:bg-[#080808]"
                }`}
              onClick={() => setActiveStep(index)}
            >
              <div className={`h-[2px] absolute top-0 left-0 transition-all duration-500 ${index <= activeStep ? "w-full bg-[#00ff88]" : "w-0 bg-[#00ff88]"}`} />

              <div className="text-5xl font-black text-[#111] leading-none mb-4 select-none group-hover:text-[#151515] transition-colors font-mono">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div
                className={`w-8 h-8 flex items-center justify-center mb-4 transition-colors ${index <= activeStep
                  ? "bg-[#00ff88]/10 border border-[#00ff88]/20"
                  : "bg-[#0a0a0a] border border-[#1a1a1a]"
                  }`}
              >
                {(() => {
                  const Icon = LucideIcons[step.icon] as unknown as React.ComponentType<{ className?: string }>;
                  return Icon ? (
                    <Icon className={`w-3.5 h-3.5 ${index <= activeStep ? "text-[#00ff88]" : "text-[#444]"}`} />
                  ) : null;
                })()}
              </div>
              <h3 className="text-[11px] font-black text-white mb-2 uppercase tracking-widest">{step.title}</h3>
              <p className="text-[10px] text-[#444] leading-relaxed font-mono">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Active step detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-8">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#050505] p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-[#00ff88]/10 border border-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                {(() => {
                  const Icon = LucideIcons[steps[activeStep].icon] as unknown as React.ComponentType<{ className?: string }>;
                  return Icon ? <Icon className="w-5 h-5 text-[#00ff88]" /> : null;
                })()}
              </div>
              <div>
                <h3 className="text-[13px] font-black text-white uppercase tracking-widest mb-1">
                  {steps[activeStep].title}
                </h3>
                <p className="text-[#555] text-[11px] leading-relaxed font-medium uppercase tracking-wide">
                  {steps[activeStep].description}
                </p>
              </div>
            </div>
            <div className="space-y-3 mb-8">
              {steps[activeStep].details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-3 h-3 text-[#00ff88] flex-shrink-0" />
                  <span className="text-[#888] text-[11px] font-medium">{detail}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-5 py-2.5 border border-[#1a1a1a] text-[#444] text-[10px] font-black uppercase tracking-widest bg-[#0a0a0a] hover:border-[#333] hover:text-[#888] disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-none"
              >
                {progressBarLabels.previous.toUpperCase()}
              </button>
              <button
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
                className="px-5 py-2.5 bg-[#00ff88] text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#00cc6a] disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-2 rounded-none"
              >
                {progressBarLabels.nextStep.toUpperCase()}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Screenshot */}
          <motion.div
            key={`img-${activeStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-[#080808] p-4"
          >
            <div className="flex items-center gap-1.5 mb-4 px-2">
              <div className="w-1.5 h-1.5 bg-[#ff3b3b]"></div>
              <div className="w-1.5 h-1.5 bg-[#ff8c00]"></div>
              <div className="w-1.5 h-1.5 bg-[#00ff88]"></div>
              <span className="text-[#333] text-[9px] ml-2 font-black tracking-[0.3em] uppercase">
                {visualDemoLabel}
              </span>
            </div>
            <div className="overflow-hidden bg-[#050505] border border-[#1a1a1a] relative group">
              <div className="absolute inset-0 bg-[#00ff88]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <img
                src={stepImages[activeStep]}
                alt={`Step ${activeStep + 1}: ${steps[activeStep].title}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </motion.div>
        </div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center bg-[#050505] border border-[#1a1a1a] p-8"
        >
          <h3 className="text-lg font-black text-white mb-2 uppercase tracking-widest">
            {cta.readyToGetStarted}
          </h3>
          <p className="text-[#555] text-[11px] mb-6 max-w-lg mx-auto font-medium uppercase tracking-wide">{cta.joinText}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#00cc6a] transition-all rounded-none"
          >
            {cta.startFreeTrial.toUpperCase()}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
