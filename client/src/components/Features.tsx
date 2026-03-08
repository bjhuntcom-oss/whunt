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
import {
  MessageSquare,
  Workflow,
  BarChart3,
  Users,
  Bot,
  Calendar,
  Globe,
  Target,
  Send,
  Smartphone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const tabIcons = [MessageSquare, Workflow, BarChart3, Users, Bot, Calendar];
const additionalIcons = [Globe, Target, Send];

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: tabIcons[0],
      title: t("Landing.featuresSec.featureTabs.0.title"),
      description: t("Landing.featuresSec.featureTabs.0.description"),
    },
    {
      icon: tabIcons[1],
      title: t("Landing.featuresSec.featureTabs.1.title"),
      description: t("Landing.featuresSec.featureTabs.1.description"),
    },
    {
      icon: tabIcons[2],
      title: t("Landing.featuresSec.featureTabs.2.title"),
      description: t("Landing.featuresSec.featureTabs.2.description"),
    },
    {
      icon: tabIcons[3],
      title: t("Landing.featuresSec.featureTabs.3.title"),
      description: t("Landing.featuresSec.featureTabs.3.description"),
    },
    {
      icon: tabIcons[4],
      title: t("Landing.featuresSec.featureTabs.4.title"),
      description: t("Landing.featuresSec.featureTabs.4.description"),
    },
    {
      icon: tabIcons[5],
      title: t("Landing.featuresSec.featureTabs.5.title"),
      description: t("Landing.featuresSec.featureTabs.5.description"),
    },
  ];

  const additionalFeatures = (t as any)(
    "Landing.featuresSec.additionalFeatures",
    { returnObjects: true }
  );

  return (
    <section id="features" className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
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
              <Smartphone className="w-3 h-3" />
              {t("Landing.featuresSec.introTagline").toUpperCase()}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
              {t("Landing.featuresSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.featuresSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-[11px] text-[#555] max-w-xl mx-auto leading-relaxed font-bold uppercase tracking-widest">
              {t("Landing.featuresSec.subHeadline")}
            </p>
          </motion.div>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-px">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.06,
              }}
              className="bg-[#050505] p-5 hover:bg-[#080808] transition-colors group relative overflow-hidden"
            >
              <div className="w-8 h-8 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center mb-4 group-hover:border-[#00ff88]/50 transition-colors">
                {React.createElement(feature.icon, {
                  className: "w-3.5 h-3.5 text-[#00ff88]",
                })}
              </div>
              <h3 className="font-black text-white mb-2 text-[11px] uppercase tracking-widest">
                {feature.title}
              </h3>
              <p className="text-[10px] text-[#444] leading-relaxed font-mono">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
          {Array.isArray(additionalFeatures) &&
            additionalFeatures.map(
              (item: { title: string; desc: string }, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.06,
                  }}
                  className="bg-[#050505] p-5 hover:bg-[#080808] transition-colors group relative overflow-hidden"
                >
                  <div className="w-8 h-8 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center mb-4 group-hover:border-[#00ff88]/50 transition-colors">
                    {React.createElement(additionalIcons[index] || Globe, {
                      className: "w-3.5 h-3.5 text-[#00ff88]",
                    })}
                  </div>
                  <h3 className="font-black text-white mb-2 text-[11px] uppercase tracking-widest">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[#444] leading-relaxed font-mono">
                    {item.desc}
                  </p>
                </motion.div>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default Features;
