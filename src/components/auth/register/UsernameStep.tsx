"use client";

import React, { forwardRef } from "react";
import { Check,AlertCircle } from "lucide-react";

const dummySuggestions = ["Alex", "AlexSmith", "Alex09"];

const UsernameStep = forwardRef(function UsernameStep(
  {
    formData,
    setFormData,
    suggestions = [],
    selectedSuggestion,
    setSelectedSuggestion,
    onContinue,
    onBack,
  }: any,
  ref: any
) {
  const list = suggestions.length > 0 ? suggestions : dummySuggestions;

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* TITLE */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-[#0C1014] leading-[38px]">
          Pick your INBO address!
        </h1>

        {/* Updated Newsletter Description */}
        <p className="text-[#6F7680] text-[16px] leading-[20px] mt-3 max-w-[420px] mx-auto text-center">
          This will be your new email for newsletters<br />
          no spam, just good stuff.
        </p>
      </div>

      {/* CARD WIDTH */}
      <div className="w-full max-w-[420px]">

        {/* Username Label */}
        <label className="text-[18px] text-[#6F7680]">Enter your username</label>

        {/* Username Input */}
        <div className="mt-2 flex items-center border border-[#DBDFE4] bg-white rounded-full overflow-hidden shadow-sm">
          <input
            ref={ref}
            type="text"
            placeholder="Enter Username"
            value={formData.username}
            onChange={(e) => {
              const v = e.target.value;
              setFormData((p: any) => ({ ...p, username: v }));
              setSelectedSuggestion?.(null);
            }}
            className="flex-1 px-4 py-3.5 text-[15px] outline-none placeholder:text-[#A2AAB4]"
          />
          <div className="px-4 py-[14px] bg-[#F6F7F8] text-[#6F7680] border-l border-[#E5E7EB]">
            @inbo.me
          </div>
        </div>

        {/* Username validation */}
        <div className="mt-2 h-[20px]">
          {formData.username && formData.username.length > 1 ? (
            <p className="text-green-600 text-sm">✓ Available</p>
          ) : (
            <p className="text-red-500 text-xs">Enter at least 2 characters</p>
          )}
        </div>

        {/* Suggestions Label */}
        <label className="text-[18px] text-[#6F7680] block mt-4">Suggestions</label>

        {/* Suggestions Grid */}
        <div className="mt-3 space-y-2">
          {list.map((name: string) => {
            const selected =
              selectedSuggestion === name || formData.username === name;

            return (
              <button
                key={name}
                onClick={() => {
                  setSelectedSuggestion?.(name);
                  setFormData((p: any) => ({ ...p, username: name }));
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all
                  ${
                    selected
                      ? "border-[#C46A54] bg-[#F6ECE7]"
                      : "border-[#E5E7EB] bg-[#FFFFFF] hover:bg-[#FAFAFB]"
                  }
                `}
              >
                <span className="text-[15px] font-semibold">{name}@inbo.me</span>
                <Check size={20} className="text-green-600" />
              </button>
            );
          })}
        </div>

        {/* UPDATED WARNING BOX */}
        <div className="mt-6 px-4 py-3 rounded-xl bg-[#FFF6EB] border border-[#FFDEBF] flex gap-3 items-start">

        {/* Warning Icon */}
        <AlertCircle
            size={30}
            strokeWidth={2}
            className="text-[#E59500] mt-[2px]"
        />

        {/* Warning Text */}
        <p className="text-[#E59500] text-[16px] font-medium leading-[20px]">
            You can't change this later, so choose wisely!
        </p>
        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex flex-col items-center">

          <button
            onClick={onContinue}
            className="w-full bg-[#C46A54] text-white py-4 rounded-full text-[16px] font-medium hover:bg-[#b25949] transition"
          >
            Start reading
          </button>

          <button
            onClick={onBack}
            className="mt-3 text-[#6F7680] underline text-sm"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
});

export default UsernameStep;
