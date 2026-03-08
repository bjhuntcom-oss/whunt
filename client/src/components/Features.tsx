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
    <section id="features" className="pt-14 pb-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00ff88] mb-4">
              <Smartphone className="w-3 h-3" />
              {t("Landing.featuresSec.introTagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#e0e0e0] tracking-tight leading-tight mb-4">
              {t("Landing.featuresSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.featuresSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-base text-[#999] max-w-2xl mx-auto leading-relaxed">
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
              className="bg-[#0a0a0a] p-6 hover:bg-[#0e0e0e] transition-colors group"
            >
              <div className="w-9 h-9 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center mb-4 group-hover:border-[#00ff88]/30 transition-colors">
                {React.createElement(feature.icon, {
                  className: "w-4 h-4 text-[#00ff88]",
                })}
              </div>
              <h3 className="font-semibold text-[#e0e0e0] mb-2 text-sm tracking-wide">
                {feature.title}
              </h3>
              <p className="text-xs text-[#555] leading-relaxed">
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
                  className="bg-[#0a0a0a] p-6 hover:bg-[#0e0e0e] transition-colors group"
                >
                  <div className="w-9 h-9 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center mb-4 group-hover:border-[#00ff88]/30 transition-colors">
                    {React.createElement(additionalIcons[index] || Globe, {
                      className: "w-4 h-4 text-[#00ff88]",
                    })}
                  </div>
                  <h3 className="font-semibold text-[#e0e0e0] mb-2 text-sm tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555] leading-relaxed">
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
