import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import ResetPassword from "@/components/ResetPassword";
import VerifyOtp from "@/components/VerifyOtp";
import ForgotPasswordEmail from "@/components/ForgotPasswordEmail";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Loader2,
  MessageSquare,
  Eye,
  EyeOff,
  Zap,
  BarChart3,
  Shield,
  Users,
  Terminal,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AppSettings } from "@/types/types";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const FEATURES = [
  { icon: Zap,       title: "Instant Campaigns",    desc: "Launch WhatsApp campaigns in minutes" },
  { icon: BarChart3, title: "Real-time Analytics",  desc: "Track delivery, reads, and engagement" },
  { icon: Users,     title: "Contact Management",   desc: "Organize and segment your audience" },
  { icon: Shield,    title: "Secure & Compliant",   desc: "GDPR compliant, enterprise-grade security" },
];

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"login" | "forgot" | "verify" | "reset">("login");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const { data: brandSettings } = useQuery<AppSettings>({
    queryKey: ["/api/brand-settings"],
    queryFn: () => fetch("/api/brand-settings").then((r) => r.json()),
    staleTime: 5 * 60 * 1000,
  });

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      let json: any;
      try { json = await response.json(); } catch { json = {}; }
      if (!response.ok) throw new Error(json?.error || "Login failed. Please try again.");
      return json;
    },
    onSuccess: () => {
      try { sessionStorage.setItem("fromLogin", "true"); } catch {}
      window.location.href = "/dashboard";
    },
    onError: (err: any) => {
      let msg = err?.message || "Login failed. Please try again.";
      if (msg.includes("401")) msg = "Invalid username or password";
      else if (msg.includes("403")) msg = "Account is inactive. Please contact administrator.";
      setError(msg);
    },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setError(null);
    loginMutation.mutate(data);
  };

  const stepTitle: Record<string, string> = {
    login: "Sign in",
    forgot: "Forgot Password",
    verify: "Verify OTP",
    reset: "Reset Password",
  };
  const stepSub: Record<string, string> = {
    login: "Access your WhatsApp marketing dashboard",
    forgot: "Enter your email to receive a reset code",
    verify: "Enter the code sent to your email",
    reset: "Create a new secure password",
  };

  return (
    <div className="min-h-screen flex bg-[#050505]">
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-[#1a1a1a]">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Fade to black at edges */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#050505]/60 to-[#050505]" />

        <div className="relative z-10 flex flex-col justify-between px-12 xl:px-16 py-14 w-full">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            {brandSettings?.logo ? (
              <img src={brandSettings.logo} alt="Logo" className="h-8 object-contain" />
            ) : (
              <>
                <div className="w-7 h-7 rounded bg-[#00ff88] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <span className="font-sans font-black text-lg tracking-tight text-white">WHUNT</span>
              </>
            )}
          </div>

          {/* Headline */}
          <div>
            <p className="font-mono text-[10px] text-[#00ff88] uppercase tracking-widest mb-4">
              WhatsApp Marketing Platform
            </p>
            <h2 className="font-sans font-black text-3xl xl:text-4xl text-white leading-tight mb-4 tracking-tight">
              Power your business<br />with WhatsApp
            </h2>
            <p className="font-mono text-[12.5px] text-[#555] mb-10 leading-relaxed">
              Reach customers where they are. Drive engagement,<br />boost sales, and build lasting relationships.
            </p>

            <div className="space-y-4">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded bg-[rgba(0,255,136,0.07)] border border-[rgba(0,255,136,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon className="w-3.5 h-3.5 text-[#00ff88]" />
                  </div>
                  <div>
                    <p className="font-mono font-semibold text-[11.5px] text-[#e0e0e0]">{f.title}</p>
                    <p className="font-mono text-[11px] text-[#555] mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#333]" />
            <span className="font-mono text-[9.5px] text-[#333] uppercase tracking-widest">
              whunt.io — v3.2
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            {brandSettings?.logo ? (
              <img src={brandSettings.logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#00ff88] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-black" />
                </div>
                <span className="font-sans font-black text-lg tracking-tight text-white">WHUNT</span>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="mb-7">
            <h1 className="font-sans font-black text-2xl text-white tracking-tight mb-1">
              {stepTitle[step]}
            </h1>
            <p className="font-mono text-[11.5px] text-[#555]">{stepSub[step]}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 rounded-md bg-[rgba(255,59,59,0.07)] border border-[rgba(255,59,59,0.2)] font-mono text-[11.5px] text-[#ff3b3b]">
              {error}
            </div>
          )}

          {/* Login Form */}
          {step === "login" && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
                        Username
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          placeholder="your_username"
                          autoComplete="username"
                          autoFocus
                          className="w-full bg-[#0e0e0e] border border-[#1a1a1a] rounded-md text-[#e0e0e0] font-mono text-[12px] px-3 py-2.5 outline-none transition-all placeholder:text-[#333] focus:border-[#00ff88] focus:shadow-[0_0_0_2px_rgba(0,255,136,0.08)]"
                        />
                      </FormControl>
                      <FormMessage className="font-mono text-[10.5px] text-[#ff3b3b]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="font-mono text-[10px] uppercase tracking-widest text-[#555]">
                          Password
                        </FormLabel>
                        <button
                          type="button"
                          className="font-mono text-[10px] text-[#00ff88] hover:opacity-70 transition-opacity"
                          onClick={() => setStep("forgot")}
                        >
                          Forgot?
                        </button>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="w-full bg-[#0e0e0e] border border-[#1a1a1a] rounded-md text-[#e0e0e0] font-mono text-[12px] px-3 py-2.5 pr-10 outline-none transition-all placeholder:text-[#333] focus:border-[#00ff88] focus:shadow-[0_0_0_2px_rgba(0,255,136,0.08)]"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] hover:text-[#555] transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="font-mono text-[10.5px] text-[#ff3b3b]" />
                    </FormItem>
                  )}
                />

                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-[#00ff88] hover:opacity-90 active:scale-[0.98] text-black font-mono font-bold text-[12px] rounded-md py-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in →"
                  )}
                </button>
              </form>
            </Form>
          )}

          {step === "forgot" && (
            <ForgotPasswordEmail
              onEmailSent={(sentEmail) => { setEmail(sentEmail); setStep("verify"); }}
              onBack={() => setStep("login")}
            />
          )}
          {step === "verify" && (
            <VerifyOtp
              email={email}
              onVerified={(otp) => { setOtpCode(otp); setStep("reset"); }}
            />
          )}
          {step === "reset" && (
            <ResetPassword email={email} otpCode={otpCode} onReset={() => setStep("login")} />
          )}

          {/* Signup link */}
          {step === "login" && (
            <p className="mt-6 text-center font-mono text-[11px] text-[#555]">
              No account?{" "}
              <Link href="/signup" className="text-[#00ff88] hover:opacity-70 font-semibold transition-opacity">
                Sign up free
              </Link>
            </p>
          )}

          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_rgba(0,255,136,0.5)]" />
              <span className="font-mono text-[9.5px] text-[#333] uppercase tracking-widest">Secure</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
              <span className="font-mono text-[9.5px] text-[#333] uppercase tracking-widest">GDPR</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              <span className="font-mono text-[9.5px] text-[#333] uppercase tracking-widest">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
