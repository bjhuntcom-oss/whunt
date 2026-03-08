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
import { ArrowRight, MessageCircle, Zap, Shield, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";

const CTA: React.FC = () => {
  const { t } = useTranslation();

  const iconMap = {
    "Instant Setup": Zap,
    "Secure & Compliant": Shield,
    "24/7 Support": Clock,
    "Free Forever": MessageCircle,
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#00ff88] mb-4">
              <MessageCircle className="w-3 h-3" />
              {t("Landing.ctaSec.introTagline")}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-bold text-[#e0e0e0] tracking-tight mb-4"
          >
            {t("Landing.ctaSec.headline")}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-base text-[#999] max-w-2xl mx-auto mb-8"
          >
            {t("Landing.ctaSec.subHeadline")}
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-12"
          >
            <Link
              href="/contact"
              className="bg-[#00ff88] text-black px-8 py-3.5 font-semibold hover:bg-[#00e87a] transition-colors flex items-center gap-2 text-sm"
            >
              {t("Landing.ctaSec.buttons.startTrial")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] max-w-4xl mx-auto">
            {(t("Landing.ctaSec.trustIndicators") as unknown as any[]).map(
              (item: any, index: number) => {
                const IconComponent =
                  iconMap[item.title as keyof typeof iconMap] || Zap;
                return (
                  <motion.div
                    key={`${item.title}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: index * 0.06,
                    }}
                    className="text-center bg-[#0a0a0a] p-5"
                  >
                    <div className="w-9 h-9 bg-[#0e0e0e] border border-[#1a1a1a] flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-4 h-4 text-[#00ff88]" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#e0e0e0] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#555] text-xs leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-[#1a1a1a] pt-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]">
            {(t("Landing.ctaSec.stats") as unknown as any[]).map(
              (stat: any, index: number) => (
                <div key={`${stat.label}-${index}`} className="text-center bg-[#0a0a0a] py-6 px-4">
                  <div className="text-2xl md:text-3xl font-bold text-[#e0e0e0] mb-1 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-[#555] text-xs uppercase tracking-wider">{stat.label}</div>
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
