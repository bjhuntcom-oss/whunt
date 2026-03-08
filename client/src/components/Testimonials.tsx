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
      <div className="w-9 h-9 bg-[#00ff88] flex items-center justify-center flex-shrink-0 text-black font-bold text-xs">
        {getInitials(name)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-9 h-9 object-cover flex-shrink-0"
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050505]">
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
              <Star className="w-3 h-3 fill-[#00ff88]" />
              {t("Landing.testimonialsSec.introTagline")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#e0e0e0] tracking-tight leading-tight mb-4">
              {t("Landing.testimonialsSec.headlinePre")}{" "}
              <span className="text-[#00ff88]">
                {t("Landing.testimonialsSec.headlineHighlight")}
              </span>
            </h2>
            <p className="text-base text-[#999] max-w-2xl mx-auto leading-relaxed">
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
              className={`bg-[#0a0a0a] p-6 transition-colors cursor-pointer ${
                currentTestimonial === index
                  ? "border-l-2 border-l-[#00ff88]"
                  : "hover:bg-[#0e0e0e]"
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-[#00ff88] fill-[#00ff88]" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-[#999] text-sm leading-relaxed mb-5">
                "{testimonial.text}"
              </blockquote>

              {/* Profile */}
              <div className="flex items-center gap-3">
                <AvatarWithFallback src={testimonial.image} name={testimonial.name} />
                <div className="min-w-0">
                  <p className="font-semibold text-[#e0e0e0] text-sm truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-[#555] text-xs truncate">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Results tag */}
              <div className="mt-4">
                <span className="text-xs text-[#00ff88] font-medium bg-[#00ff88]/10 px-2.5 py-1">
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
            className="p-2 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#252525] hover:bg-[#0e0e0e] transition-colors"
            aria-label={navButtons.previous}
          >
            <ArrowLeft className="w-4 h-4 text-[#555]" />
          </button>
          <div className="flex items-center gap-1.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-1 transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-[#00ff88] w-6"
                    : "bg-[#252525] w-2 hover:bg-[#333]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <button
            onClick={nextTestimonial}
            className="p-2 border border-[#1a1a1a] bg-[#0a0a0a] hover:border-[#252525] hover:bg-[#0e0e0e] transition-colors"
            aria-label={navButtons.next}
          >
            <ArrowRight className="w-4 h-4 text-[#555]" />
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
              className="text-center py-8 px-4 bg-[#0a0a0a]"
            >
              <div className="text-3xl font-bold text-[#e0e0e0] mb-1 tracking-tight">
                {stat.number}
              </div>
              <div className="text-[#555] text-xs uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
