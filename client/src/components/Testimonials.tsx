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
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AvatarWithFallback: React.FC<{ src: string; name: string }> = ({ src, name }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed || !src) {
    return (
      <div className="w-9 h-9 bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center flex-shrink-0 text-[#00ff88] font-black text-[10px] rounded-none uppercase tracking-tighter">
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-9 h-9 object-cover flex-shrink-0 transition-all border border-[#1a1a1a] rounded-none hover:border-[#00ff88]/50"
      onError={() => setImgFailed(true)}
    />
  );
};

const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = t(
    "Landing.testimonialsSec.testimonials"
  ) as unknown as Array<{
    name: string;
    role: string;
    company: string;
    image: string;
    rating: number;
    text: string;
    results: string;
  }>;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const navButtons = t("Landing.testimonialsSec.navButtons") as unknown as {
    previous: string;
    next: string;
  };

  const statsGrid = t("Landing.testimonialsSec.statsGrid") as unknown as Array<{
    number: string;
    label: string;
  }>;

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const gridTestimonials = testimonials.slice(0, 3);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff88] mb-4">
              <Star className="w-3 h-3 fill-[#00ff88]" />
              {t("Landing.testimonialsSec.introTagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 uppercase">
              {t("Landing.testimonialsSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.testimonialsSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-sm text-[#555] max-w-2xl mx-auto leading-relaxed font-medium uppercase tracking-wide">
              {t("Landing.testimonialsSec.subHeadline")}
            </p>
          </motion.div>
        </div>

        {/* Testimonial cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a] border border-[#1a1a1a] mb-8">
          {gridTestimonials.map((testimonial, index) => (
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
              className={`bg-[#050505] p-6 transition-all cursor-pointer relative group ${currentTestimonial === index
                ? "bg-[#080808]"
                : "hover:bg-[#080808]"
                }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className={`h-[2px] absolute top-0 left-0 transition-all duration-500 ${currentTestimonial === index ? "w-full bg-[#00ff88]" : "w-0 bg-[#00ff88]"}`} />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#00ff88] fill-[#00ff88]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#888] text-xs leading-relaxed mb-6 font-medium italic">
                "{testimonial.text}"
              </blockquote>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <AvatarWithFallback src={testimonial.image} name={testimonial.name} />
                <div className="min-w-0">
                  <p className="font-black text-white text-[11px] uppercase tracking-wider truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-[#444] text-[9px] font-bold uppercase tracking-widest truncate mt-0.5">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Results tag */}
              <div className="mt-5">
                <span className="text-[9px] font-black text-[#00ff88] uppercase tracking-[0.2em] border border-[#00ff88]/20 px-2 py-1 bg-[#00ff88]/5">
                  {testimonial.results}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prev/Next nav */}
        <div className="flex justify-center gap-3 mb-12">
          <button
            onClick={prevTestimonial}
            className="p-3 border border-[#1a1a1a] bg-[#050505] hover:border-[#00ff88] hover:bg-[#080808] transition-all rounded-none group"
            aria-label={navButtons.previous}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#555] group-hover:text-[#00ff88]" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-[2px] transition-all duration-500 ${index === currentTestimonial
                  ? "bg-[#00ff88] w-8"
                  : "bg-[#1a1a1a] w-3 hover:bg-[#333]"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-3 border border-[#1a1a1a] bg-[#050505] hover:border-[#00ff88] hover:bg-[#080808] transition-all rounded-none group"
            aria-label={navButtons.next}
          >
            <ArrowRight className="w-3.5 h-3.5 text-[#555] group-hover:text-[#00ff88]" />
          </button>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a] border border-[#1a1a1a]"
        >
          {statsGrid.map((stat, index) => (
            <div
              key={index}
              className="text-center py-7 px-4 bg-[#050505]"
            >
              <div className="text-3xl font-black text-white mb-1 tracking-tighter font-mono">
                {stat.number}
              </div>
              <div className="text-[#333] text-[9px] uppercase tracking-[0.2em] font-black">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
