"use client";

import Image from "next/image";
import Link from "next/link";

export default function EmailStep({
  formData,
  setFormData,
  googleLogin,
  isLoading,
  onContinue,
  devMode = false,
}: any) {
  return (
    <div className="w-full border-black">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-[#0C1014] leading-[38px]">
          Create an account
        </h1>
        <p className="text-[#6F7680] text-[16px] mt-2 leading-[22px] max-w-[320px] mx-auto">
          We’ll email you a magic link so we can verify your email address.
        </p>
      </div>

      {/* Google Button */}
      <button
        onClick={() => googleLogin?.()}
        className="
          w-full flex items-center justify-center gap-3
          bg-[#F3F4F6]
          py-3.5 rounded-full
          text-[15px] font-medium text-[#272727]
          hover:bg-[#ECECEC]
          transition
        "
      >
        <Image src="/icons/google-icon.png" width={18} height={18} alt="Google" />
        Continue with Google
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-[#E3E5E8]" />
        <span className="text-[#A2AAB4] text-[14px] font-medium">OR</span>
        <div className="flex-1 h-px bg-[#E3E5E8]" />
      </div>

      {/* Email Label */}
      <label className="text-sm text-[#6F7680] block mb-2">
        Email address
      </label>

      {/* Email Input */}
      <input
        type="email"
        value={formData.email}
        placeholder="you@example.com"
        onChange={(e) =>
          setFormData((p: any) => ({ ...p, email: e.target.value }))
        }
        className="
          w-full py-3.5 px-4 
          rounded-full
          border border-[#DBDFE4]
          text-[15px]
          placeholder-[#A2AAB4]
          focus:ring-2 focus:ring-[#C46A54]
          outline-none
          transition
        "
      />

      {/* Continue Button */}
      <button
        onClick={onContinue}
        disabled={isLoading}
        className="
          w-full mt-5 
          bg-[#C46A54] text-white 
          py-3.5 rounded-full text-[16px] font-medium
          hover:bg-[#b55c46]
          transition
          disabled:opacity-50
        "
      >
        {isLoading ? "Sending..." : "Send Link"}
      </button>

      {/* Simulate Button */}
      {devMode && (
        <button
          onClick={onContinue}
          className="
            w-full mt-3 bg-[#616161] text-white py-2 
            rounded-full text-sm opacity-70
          "
        >
          Simulate → Next Step
        </button>
      )}

      {/* Already have account + Terms */}
      <div className="mt-6 text-center space-y-3">
        <p className="text-[#6F7680]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#C46A54] underline font-medium">
            Log in
          </Link>
        </p>

        <p className="text-[#6F7680] text-[14px] leading-[16px] mx-4">
          By continuing you agree to the
          <br />
          <Link href="/terms" className="text-[#C46A54] font-normal underline">
            Terms of service
          </Link>
          <span className="text-[#6F7680]">{" "}and{" "}</span>
          <Link href="/privacy" className="text-[#C46A54] font-normal underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
