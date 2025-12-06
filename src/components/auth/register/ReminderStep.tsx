"use client";

import { useState } from "react";

export default function ReminderStep({
  reminder,
  setReminder,
  reminderTime,
  setReminderTime,
  onContinue,
  onBack,
}: any) {
  const [showTimeSelect, setShowTimeSelect] = useState(false);

  const options = [
    ["after_waking_up", "After waking up"],
    ["while_commuting", "While commuting"],
    ["at_lunchtime", "At lunchtime"],
    ["before_bedtime", "Before bedtime"],
  ];

  // Continue button enabled only when a real reminder is selected
  const canContinue = reminder !== "" && reminder !== "none";

  const handleOptionClick = (key: string) => {
    setReminder(key);
  };

  const handleContinue = () => {
    if (!canContinue) return;

    // Move to time picker screen
    setShowTimeSelect(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#0C1014] leading-[38px]">
          Would you like to get a<br />reading reminder?
        </h1>

        <p className="text-[#6F7680] text-[15px] mt-3 max-w-[360px] mx-auto leading-[22px]">
          Having a specific time set apart for reading can help
          build a habit and be more consistent
        </p>
      </div>

      {/* ======================================
          VIEW 1: REMINDER OPTIONS (No time yet)
      =======================================*/}
      {!showTimeSelect && (
        <>
          <div className="flex flex-col gap-3 w-full max-w-[380px]">

            {options.map(([key, label]) => {
              const active = reminder === key;

              return (
                <button
                  key={key}
                  onClick={() => handleOptionClick(key)}
                  className={`
                    flex items-center gap-3 px-5 py-4 w-full rounded-full border text-[15px]
                    transition-all
                    ${active
                      ? "bg-[#F6ECE7] border-[#C46A54]"
                      : "bg-[#F5F7F9] border-transparent hover:bg-[#ECECEC]"}
                  `}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Continue Button (disabled unless chosen) */}
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`
              mt-10 w-[280px] py-3 rounded-full text-[19px] font-medium
              ${canContinue
                ? "bg-[#C46A54] text-white"
                : "bg-[#E5C5BE] text-white opacity-50 cursor-not-allowed"}
            `}
          >
            Continue
          </button>

          {/* Back */}
          <button onClick={onBack} className="text-[#0C1014] underline text-md font-semibold mt-4">
            ← Back
          </button>

          {/* Skip (acts like "Skip → Next Step", NOT a real option) */}
          <button
            onClick={() => {
              setReminder("none");
              onContinue();        // go directly to next page
            }}
            className="text-[#6F7680] underline text-sm mt-3"
          >
            Skip
          </button>
        </>
      )}

      {/* ======================================
          VIEW 2: TIME SELECTION SCREEN
      =======================================*/}
      {showTimeSelect && (
        <>
          <div className="w-full max-w-[380px] bg-white border border-[#E9EAEE] shadow-sm py-10 px-6 rounded-2xl text-center mb-8">
            <h2 className="text-[20px] font-semibold text-[#0C1014] mb-3">
              Perfect!
            </h2>
            <p className="text-[#6F7680] text-[14px] leading-[20px] mb-6">
              We’ll send you a reminder one hour <br/> before your reading.
            </p>

            {/* Time Picker */}
            <div className="inline-flex items-center bg-[#F6F7F8] px-6 py-3 rounded-full border border-[#E0E1E3]">
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="bg-transparent outline-none font-semibold text-[19px]"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <option key={i} value={`${String(i).padStart(2, "0")}:00`}>
                    {String(i).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-[280px] py-3 rounded-full bg-[#C46A54] text-white text-[19px] font-medium"
          >
            Continue
          </button>

          {/* Back */}
          <button
            onClick={() => setShowTimeSelect(false)}
            className="text-[#0C1014] underline font-semibold text-md mt-4"
          >
            ← Back
          </button>

          {/* Skip */}
          <button
            onClick={() => {
              setReminder("none");
              onContinue();
            }}
            className="text-[#6F7680] underline text-sm mt-3"
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}
