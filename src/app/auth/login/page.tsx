"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import AuthCarousel from "@/components/auth/AuthCarousel";
import { SEOHead } from "@/components/seo/SEOHead";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { isAuthenticated, requestMagicLink, googleAuth  } = useAuth();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectRef = useRef<HTMLSelectElement>(null);

  const openDropdown = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  const handleMagicLink = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await requestMagicLink(email);
      router.push(`/auth/verify?email=${email}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Login" description="Login to Inbo" />

      <div className="flex h-screen bg-white">

        {/* LEFT HALF: FIXED WIDTH + YOUR CAROUSEL */}
        <div className="hidden lg:flex w-1/2 h-full">
          <AuthCarousel />
        </div>

        {/* RIGHT HALF */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-10 bg-white">
          <div className="w-full max-w-sm">

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/logos/inbo-logo.png"
                alt="Inbo Logo"
                width={110}
                height={45}
              />
            </div>

            {/* Heading */}
            <div className="text-center flex flex-col items-center mb-8">
              <h1 className="text-[32px] font-bold text-[#0C1014]">
                Welcome back 👋
              </h1>
              <p className="text-[#6F7680] text-[16px] max-w-[260px] mt-2">
                We’ll email you a magic link so we can verify your email.
              </p>
            </div>

            {/* Google Login */}
            <button
              onClick={()=>{googleAuth}}
              className="w-full flex items-center justify-center gap-3 bg-[#F3F4F6] py-3.5 rounded-full hover:bg-gray-200 transition"
            >
              <Image src="/icons/google-icon.png" width={18} height={18} alt="Google" />
              <span className="text-[#272727] font-medium">
                Continue with Google
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#E3E5E8]" />
              <span className="text-[#A2AAB4] text-sm font-medium">OR</span>
              <div className="flex-1 h-px bg-[#E3E5E8]" />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label className="text-sm text-[#6F7680]">Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full py-3 px-4 mt-2 rounded-full border border-[#DBDFE4]
                  text-gray-700 placeholder-[#A2AAB4]
                  focus:ring-2 focus:ring-[#C46A54]
                "
              />
            </div>

            {/* Send Link */}
            <button
              onClick={handleMagicLink}
              disabled={isLoading}
              className="
                w-full bg-[#C46A54] text-white py-3.5 rounded-full font-medium
                hover:bg-[#b25949] transition disabled:opacity-50
              "
            >
              {isLoading ? "Sending..." : "Send Link"}
            </button>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 bg-red-50 px-4 py-2 rounded text-sm text-center mt-3">
                {error}
              </p>
            )}

            {/* Footer */}
            <div className="text-center mt-10 space-y-5">

              <p className="text-[#6F7680]">
                No account yet?{" "}
                <a href="/auth/register" className="text-[#C46A54] underline font-medium">
                  Sign up
                </a>
              </p>

              {/* Terms + Privacy */}
              <div style={{ width: "100%", textAlign: "center" }}>
                <span
                  style={{
                    color: "var(--Text-body, #6F7680)",
                    fontSize: 14,
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  By continuing you agree to the<br />
                </span>
                <span
                  style={{
                    color: "var(--Text-action, #C46A54)",
                    fontSize: 14,
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  Terms of service
                </span>
                <span
                  style={{
                    color: "var(--Text-body, #6F7680)",
                    fontSize: 14,
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  {" "}and{" "}
                </span>
                <span
                  style={{
                    color: "var(--Text-action, #C46A54)",
                    fontSize: 14,
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    lineHeight: "16px",
                    wordWrap: "break-word",
                  }}
                >
                  Privacy Policy
                </span>
              </div>

              {/* Language Dropdown */}
              <div className="relative flex items-center justify-center gap-2 pt-2">
                <span className="text-[#6F7680] text-md">Language</span>

                <div className="relative flex items-center">
                  <select
                    ref={selectRef}
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                    className="
                      text-[#0C1014] text-md font-medium
                      bg-transparent py-1 pl-2 pr-6
                      border-none outline-none
                      cursor-pointer appearance-none
                    "
                  >
                    <option value="en">English (US)</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                  </select>

                  <svg
                    className="pointer-events-none absolute right-0 w-4 h-4 text-[#0C1014]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
