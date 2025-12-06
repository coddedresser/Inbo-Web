"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SEOHead } from "@/components/seo/SEOHead";
import AuthCarousel from "@/components/auth/AuthCarousel";

// Steps
import EmailStep from "@/components/auth/register/EmailStep";
import CheckEmailStep from "@/components/auth/register/CheckEmailStep";
import UsernameStep from "@/components/auth/register/UsernameStep";
import CategoriesStep from "@/components/auth/register/CategoriesStep";
import ReminderStep from "@/components/auth/register/ReminderStep";
import WhereStep from "@/components/auth/register/WhereHeardStep";

type Step =
  | "email"
  | "check-email"
  | "username"
  | "categories"
  | "reminder"
  | "where";

export default function SignupPage() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const DEV_MODE = true;

  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [reminder, setReminder] = useState("none");
  const [reminderTime, setReminderTime] = useState("13:00");
  const [whereHeard, setWhereHeard] = useState("");

  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- SIMULATED FLOWS ---------------- */

  const handleEmailContinue = () => {
    if (!formData.email.includes("@")) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("check-email");
    }, 600);
  };

  const handleFinalSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/inbox");
    }, 800);
  };

  const handleBack = () => {
    if (step === "check-email") setStep("email");
    else if (step === "username") setStep("check-email");
    else if (step === "categories") setStep("username");
    else if (step === "reminder") setStep("categories");
    else if (step === "where") setStep("reminder");
  };

  /* ---------------- CONDITIONS ---------------- */

  const showCarousel = step === "email" || step === "check-email";

  return (
    <>
      <SEOHead title="Sign up" description="Create an account" />

      <div className="flex h-screen bg-white">

        {/* LEFT SIDE — only for first 2 steps */}
        {showCarousel && (
          <div className="hidden lg:flex w-1/2 h-full">
            <AuthCarousel />
          </div>
        )}

        {/* RIGHT SIDE */}
        <div
          className={`
            flex flex-col relative text-[#0C1014]
            ${showCarousel ? "w-full lg:w-1/2" : "w-full items-center justify-center"}
          `}
        >
          {/* MAIN CONTENT WRAPPER */}
          <div
            className={`
              flex flex-col items-center justify-center
              px-10
              ${showCarousel ? "flex-1" : "w-full max-w-[700px] mx-auto"}
            `}
          >
            {/* Logo */}
            {showCarousel &&(<Image
              src="/logos/inbo-logo.png"
              width={140}
              height={55}
              alt="Logo"
              className={`mb-10 transition-all ${showCarousel ? "mt-0" : "mt-6"}`}
            />)}

            {/* STEP CONTENT */}
            <div className="w-full max-w-[380px]">

              {step === "email" && (
                <EmailStep
                  formData={formData}
                  setFormData={setFormData}
                  onContinue={handleEmailContinue}
                  googleLogin={() => alert("Simulated Google")}
                  isLoading={isLoading}
                  devMode={DEV_MODE}
                />
              )}

              {step === "check-email" && (
                <CheckEmailStep
                  email={formData.email}
                  onResend={() => alert("Simulated resend")}
                  onSimulateOpen={() => setStep("username")}
                  devMode={DEV_MODE}
                />
              )}

              {step === "username" && (
                <UsernameStep
                  ref={usernameInputRef}
                  formData={formData}
                  setFormData={setFormData}
                  suggestions={[]}
                  selectedSuggestion={null}
                  setSelectedSuggestion={() => {}}
                  generateUsernameSuggestions={() => []}
                  onContinue={() => setStep("categories")}
                  onBack={handleBack}
                />
              )}

              {step === "categories" && (
                <CategoriesStep
                  categories={categories}
                  toggleCategory={(c: string) =>
                    setCategories((prev) =>
                      prev.includes(c)
                        ? prev.filter((x) => x !== c)
                        : [...prev, c]
                    )
                  }
                  onContinue={() => setStep("reminder")}
                  onBack={handleBack}
                />
              )}

              {step === "reminder" && (
                <ReminderStep
                  reminder={reminder}
                  setReminder={setReminder}
                  reminderTime={reminderTime}
                  setReminderTime={setReminderTime}
                  onContinue={() => setStep("where")}
                  onBack={handleBack}
                />
              )}

              {step === "where" && (
                <WhereStep
                  whereHeard={whereHeard}
                  setWhereHeard={setWhereHeard}
                  onContinue={handleFinalSubmit}
                  onBack={handleBack}
                  isLoading={isLoading}
                />
              )}
            </div>

            {/* LANGUAGE SELECTOR */}
            <div className="mt-10 text-center">
              <span className="text-[#6F7680] mr-2 text-lg">Language</span>
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="text-[#0C1014] font-semibold text-md bg-transparent border-none outline-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
