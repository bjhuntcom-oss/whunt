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

import { useEffect, useState } from "react";
import { ArrowRight, Users, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import { Link } from "wouter";

const TYPING_WORDS = [
  "WhatsApp Marketing",
  "Customer Engagement",
  "Business Growth",
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const Hero = () => {
  const { t } = useTranslation();

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = TYPING_WORDS[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentWord.substring(0, displayText.length - 1)
            : currentWord.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex]);

  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: t("Landing.heroSec.stats.0.label"),
    },
    {
      icon: TrendingUp,
      value: `98${t("Landing.heroSec.stats.1.suffix")}`,
      label: t("Landing.heroSec.stats.1.label"),
    },
    {
      icon: Zap,
      value: `5${t("Landing.heroSec.stats.2.suffix")}`,
      label: t("Landing.heroSec.stats.2.label"),
    },
  ];

  return (
    <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#00ff88] mb-6">
              <span className="w-1.5 h-1.5 bg-[#00ff88] inline-block"></span>
              {t("Landing.heroSec.animatedBgGreenText").toUpperCase()}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase"
          >
            {t("Landing.heroSec.headline")}
            <span className="block mt-4 text-[#00ff88] min-h-[1em]">
              {displayText}
              <span className="inline-block w-[4px] h-[0.8em] bg-[#00ff88] ml-2 align-middle animate-[blink_1s_step-end_infinite]"></span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base text-[#555] max-w-xl mx-auto mb-12 leading-relaxed font-medium uppercase tracking-wider"
          >
            {t("Landing.heroSec.subHeadline")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              href="/contact"
              className="bg-[#00ff88] text-black px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#00cc6a] transition-all rounded-none flex items-center gap-2 border border-[#00ff88]"
            >
              {t("Landing.heroSec.startTrialButton").toUpperCase()}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#features"
              className="border border-[#1a1a1a] text-[#555] px-12 py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:border-white hover:text-white transition-all rounded-none"
            >
              {(t("Landing.heroSec.learnMore") !== "Landing.heroSec.learnMore" ? t("Landing.heroSec.learnMore") : "Learn more").toUpperCase()}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center max-w-3xl mx-auto border border-[#1a1a1a] bg-[#080808]"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center w-full sm:w-auto flex-1">
                <div className="flex flex-col items-center px-8 py-6 flex-1">
                  <span className="text-3xl font-black text-white font-mono tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="text-[9px] text-[#333] mt-1 uppercase font-black tracking-[0.3em]">
                    {stat.label}
                  </span>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-8 bg-[#1a1a1a]"></div>
                )}
              </div>
            ))}
          </motion.div>

          {/* Trusted by */}
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14"
          >
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#222] mb-6">
              {t("Landing.heroSec.trustedByText").toUpperCase()}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              {["Shopify", "WooCommerce", "Salesforce", "HubSpot", "Zapier"].map(
                (brand, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 text-[10px] font-black text-[#444] bg-[#080808] border border-[#1a1a1a] tracking-[0.2em] uppercase"
                  >
                    {brand}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
