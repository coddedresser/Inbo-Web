"use client";

import React from "react";

export default function CheckEmailStep({
  email,
  onResend,
  onSimulateOpen,
  devMode = false,
}: any) {
  // Shared inline style objects (converted to React style)
  const bodyStyle: React.CSSProperties = {
    color: "var(--Text-body, #6F7680)",
    fontSize: 16,
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontWeight: 400,
    lineHeight: "20px",
    wordWrap: "break-word",
  };

  const actionStyle: React.CSSProperties = {
    color: "var(--Text-action, #C46A54)",
    fontSize: 16,
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontWeight: 400,
    lineHeight: "20px",
    wordWrap: "break-word",
    textDecoration: "underline",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    padding: 0,
  };

  return (
    <div className="w-full flex flex-col items-center text-center">

      {/* Title */}
      <h1 className="text-[30px] lg:text-[32px] font-bold text-[#0C1014]">
        Check your mail!
      </h1>

      {/* Subtitle */}
      <p className="text-[#6F7680] text-[15px] max-w-[380px] mt-3 leading-[22px]">
        Confirm your email address by clicking the link in the email we just
        sent you.
      </p>

      {/* Inbox Placeholder */}
      <div className="w-full max-w-[360px] h-[160px] bg-white  mt-8 mb-6 flex items-center justify-center ">
        <div className="text-[#A2AAB4] text-sm"></div>
      </div>

      {/* "Don't receive" title */}
      <div className="mt-4 mb-2">
        <p className="text-[#6F7680] text-[15px]">Don’t receive an email?</p>
      </div>

      {/* The exact centered block you provided (converted to React) */}
      <div style={{ width: "100%", textAlign: "center" }}>
        <span style={bodyStyle}>
          Check your spam folder,
          <br />
        </span>

        {/* Resend email button styled as action span */}
        <button
          onClick={onResend}
          style={actionStyle}
          aria-label="Resend email"
        >
          Resend email
        </button>

        <span style={bodyStyle}>{" "}and{" "}</span>

        {/* Contact link styled as action span */}
        <a href="/contact" style={actionStyle}>
          Contact us.
        </a>
      </div>

      {/* Simulate (dev only) */}
      {devMode && (
        <div className="w-full max-w-[360px] mt-8">
          <button
            onClick={onSimulateOpen}
            className="w-full bg-[#616161] hover:bg-[#555] text-white py-3 rounded-full text-sm transition"
          >
            Simulate → Open Magic Link
          </button>
        </div>
      )}
    </div>
  );
}
