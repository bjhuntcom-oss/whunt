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
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff88] mb-4">
              <MessageCircle className="w-3 h-3 fill-[#00ff88]" />
              {t("Landing.ctaSec.introTagline").toUpperCase()}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 uppercase"
          >
            {t("Landing.ctaSec.headline")}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] text-[#555] max-w-xl mx-auto mb-10 leading-relaxed font-bold uppercase tracking-widest"
          >
            {t("Landing.ctaSec.subHeadline")}
          </motion.p>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-16"
          >
            <Link
              href="/contact"
              className="bg-[#00ff88] text-black px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#00cc6a] transition-all rounded-none flex items-center gap-2 border border-[#00ff88]"
            >
              {t("Landing.ctaSec.buttons.startTrial").toUpperCase()}
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
                    className="text-center bg-[#050505] p-6 hover:bg-[#080808] transition-colors"
                  >
                    <div className="w-9 h-9 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center mx-auto mb-4 group-hover:border-[#00ff88]/50">
                      <IconComponent className="w-3.5 h-3.5 text-[#00ff88]" />
                    </div>
                    <h3 className="text-[10px] font-black text-white mb-2 uppercase tracking-widest">
                      {item.title}
                    </h3>
                    <p className="text-[#333] text-[9px] font-black uppercase tracking-widest leading-relaxed">{item.desc}</p>
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
          className="border-t border-[#1a1a1a] pt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a] max-w-4xl mx-auto">
            {(t("Landing.ctaSec.stats") as unknown as any[]).map(
              (stat: any, index: number) => (
                <div key={`${stat.label}-${index}`} className="text-center bg-[#050505] py-7 px-4">
                  <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tighter font-mono">
                    {stat.number}
                  </div>
                  <div className="text-[#333] text-[9px] uppercase tracking-[0.2em] font-black">{stat.label}</div>
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
