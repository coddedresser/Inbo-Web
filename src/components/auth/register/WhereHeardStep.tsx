"use client";

import {
  Apple,
  Search,
  Instagram,
  Users,
  MoreHorizontal,
} from "lucide-react";

export default function WhereStep({
  whereHeard,
  setWhereHeard,
  onContinue,
  onBack,
}: any) {
  const options = [
    { key: "app_store", label: "App Store", icon: <Apple size={18} /> },
    { key: "google", label: "Google Search", icon: <Search size={18} /> },
    {
      key: "social",
      label: "Facebook/Instagram",
      icon: <Instagram size={18} />,
    },
    { key: "friends", label: "Friends/family", icon: <Users size={18} /> },
    { key: "other", label: "Other", icon: <MoreHorizontal size={18} /> },
  ];

  const canContinue = !!whereHeard;

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-[32px] font-bold text-[#0C1014] leading-[38px]">
          Where did you hear<br />about inbo?
        </h1>
      </div>

      {/* OPTIONS LIST */}
      <div className="flex flex-col gap-3 w-full max-w-[380px]">

        {options.map((opt) => {
          const active = whereHeard === opt.key;

          return (
            <button
              key={opt.key}
              onClick={() => setWhereHeard(opt.key)}
              className={`
                flex items-center gap-3 px-5 py-4 rounded-full w-full
                text-[15px] transition-all border
                ${
                  active
                    ? "bg-[#F6ECE7] border-[#C46A54]"
                    : "bg-[#F5F6F8] border-transparent hover:bg-[#ECECEC]"
                }
              `}
            >
              <span className="text-[#0C1014]">{opt.icon}</span>
              <span className="text-[#0C1014]">{opt.label}</span>
            </button>
          );
        })}

      </div>

      {/* CONTINUE BUTTON */}
      <button
        onClick={onContinue}
        disabled={!canContinue}
        className={`
          mt-10 w-[280px] py-3 rounded-full text-[19px] font-medium
          ${
            canContinue
              ? "bg-[#C46A54] text-white"
              : "bg-[#F0F1F3] text-[#A0A4A8] cursor-not-allowed"
          }
        `}
      >
        Continue
      </button>

      {/* BACK */}
      <button
        onClick={onBack}
        className="text-[#0C1014] font-semibold underline text-md mt-4"
      >
        ← Back
      </button>
    </div>
  );
}
