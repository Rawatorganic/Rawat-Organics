"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { BRAND } from "@/lib/constants";

const LightPillar = dynamic(() => import("@/components/LightPillar"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Light pillar background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <LightPillar
            topColor="#10b9a2"
            bottomColor="#40d03c"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.005}
            pillarWidth={5}
            pillarHeight={0.4}
            noiseIntensity={0}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="high"
          />
        </div>
      </div>

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <div className="noise-overlay" style={{ zIndex: 1 }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Glassmorphism Card */}
        <div className="bg-black/30 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative">
          {/* Subtle top reflection */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="px-10 py-12 relative z-10">
            {/* Logo / Brand */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/10 mb-5 shadow-[0_0_30px_rgba(16,185,162,0.2)]">
                <span
                  className="material-symbols-outlined text-primary-fixed"
                  style={{
                    fontSize: "32px",
                    fontVariationSettings: "'FILL' 1",
                  }}
                >
                  eco
                </span>
              </div>
              <h1 className="font-headline font-extrabold text-2xl text-white tracking-tight">
                {BRAND.fullName}
              </h1>
              <p className="text-white/50 text-sm font-headline mt-1 tracking-wider uppercase">
                Admin Portal
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm backdrop-blur-md"
              >
                <span
                  className="material-symbols-outlined text-red-400"
                  style={{ fontSize: "18px" }}
                >
                  error
                </span>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-[11px] font-headline font-bold text-white/50 uppercase tracking-[0.2em] mb-2">
                  Email
                </label>
                <div className="relative group">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 group-focus-within:text-primary-fixed transition-colors"
                    style={{ fontSize: "20px" }}
                  >
                    mail
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@rawatorganics.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary-fixed/50 focus:bg-white/10 outline-none text-sm text-white placeholder:text-white/20 transition-all focus:shadow-[0_0_20px_rgba(16,185,162,0.1)]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-headline font-bold text-white/50 uppercase tracking-[0.2em] mb-2">
                  Password
                </label>
                <div className="relative group">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-white/30 group-focus-within:text-primary-fixed transition-colors"
                    style={{ fontSize: "20px" }}
                  >
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-primary-fixed/50 focus:bg-white/10 outline-none text-sm text-white placeholder:text-white/20 transition-all focus:shadow-[0_0_20px_rgba(16,185,162,0.1)]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 mt-8 bg-primary-fixed text-on-primary-fixed font-headline font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,162,0.3)] hover:shadow-[0_0_30px_rgba(16,185,162,0.5)]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary-fixed/30 border-t-on-primary-fixed rounded-full animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign In
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "18px" }}
                    >
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-8 font-headline tracking-wide">
          {BRAND.copyright}
        </p>
      </motion.div>
    </div>
  );
}
