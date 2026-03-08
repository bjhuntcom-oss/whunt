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
  MessageCircle,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AppSettings } from "@/types/types";

interface LoadingAnimationProps {
  onComplete?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "green" | "white" | "blue";
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  onComplete,
  size = "lg",
  color = "green",
}) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((res) => res.json()),
    staleTime: 5 * 60 * 1000,
  });

  const steps = [
    { text: "Initializing platform", icon: MessageCircle },
    { text: "Loading campaign engine", icon: Zap },
    { text: "Connecting analytics", icon: TrendingUp },
    { text: "Preparing contacts", icon: Users },
    { text: "Ready", icon: CheckCircle },
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
        setProgress((prev) => prev + 20);
      } else {
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          }
        }, 600);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete]);

  // Small spinner — square design
  if (size === "sm") {
    const borderColor =
      color === "white"
        ? "border-white"
        : color === "blue"
          ? "border-blue-500"
          : "border-[#00ff88]";
    return (
      <div
        className={`w-4 h-4 border-2 border-t-transparent animate-spin ${borderColor}`}
        style={{ borderRadius: 0 }}
      />
    );
  }

  // Medium spinner — square design
  if (size === "md") {
    const borderColor =
      color === "white"
        ? "border-white"
        : color === "blue"
          ? "border-blue-500"
          : "border-[#00ff88]";
    return (
      <div
        className={`w-6 h-6 border-2 border-t-transparent animate-spin ${borderColor}`}
        style={{ borderRadius: 0 }}
      />
    );
  }

  // Full page — dark theme, square design
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #00ff88 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center max-w-sm mx-auto px-6">
        {/* Logo / Brand */}
        <div className="flex items-center justify-center mb-10">
          {brandSettings?.logo ? (
            <img
              src={brandSettings.logo}
              alt="Logo"
              className="h-10 object-contain"
            />
          ) : (
            <span className="font-sans font-black text-2xl tracking-[-0.03em] text-white leading-none select-none">
              WHUNT
            </span>
          )}
        </div>

        {/* Step indicator — terminal-style */}
        <div className="mb-8 border border-[#1a1a1a] bg-[#0a0a0a] p-5">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a1a1a]">
            <div className="w-2 h-2 bg-[#ff3b3b]" />
            <div className="w-2 h-2 bg-[#ffb800]" />
            <div className="w-2 h-2 bg-[#00ff88]" />
            <span className="ml-2 font-mono text-[9px] text-[#333] uppercase tracking-widest">
              system
            </span>
          </div>

          {/* Steps log */}
          <div className="space-y-2 text-left">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isDone = i < currentStep;
              const isPending = i > currentStep;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-300 ${isPending ? "opacity-20" : "opacity-100"
                    }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center shrink-0">
                    {isDone ? (
                      <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                    ) : isActive ? (
                      <div
                        className="w-3 h-3 border border-[#00ff88] animate-spin"
                        style={{ borderTopColor: "transparent" }}
                      />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-[#333]" />
                    )}
                  </div>
                  <span
                    className={`font-mono text-[11px] tracking-wide ${isDone
                        ? "text-[#555] line-through"
                        : isActive
                          ? "text-[#00ff88]"
                          : "text-[#333]"
                      }`}
                  >
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress bar — square, sharp */}
        <div className="w-full h-[3px] bg-[#1a1a1a] mb-6 overflow-hidden">
          <div
            className="h-full bg-[#00ff88] transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Status */}
        <p className="font-mono text-[10px] text-[#444] uppercase tracking-[0.15em]">
          Initializing · {progress}%
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
