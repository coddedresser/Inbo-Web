"use client";

import {
  Check,
  Laptop,
  BarChart3,
  Briefcase,
  Palette,
  Sparkles,
  Rocket,
  Film,
  Landmark,
  HeartPulse,
  Globe,
} from "lucide-react";

export default function CategoriesStep({
  categories,
  toggleCategory,
  onContinue,
  onBack,
}: any) {
  const allCategories = [
    { label: "Tech", icon: Laptop },
    { label: "News", icon: BarChart3 },
    { label: "Business", icon: Briefcase },
    { label: "Productivity", icon: Sparkles },
    { label: "Startups", icon: Rocket },
    { label: "Entertainment", icon: Film },
    { label: "Finance", icon: Landmark },
    { label: "Personal Growth", icon: HeartPulse },
    { label: "Culture", icon: Globe },
  ];

  const canContinue = categories.length >= 3;

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-[32px] font-bold text-[#0C1014] leading-[38px]">
          Please select Topics you<br />are interested in
        </h1>
      </div>

      {/* Pills Wrapper */}
      <div className="flex flex-wrap justify-center gap-3 max-w-[520px]">

        {allCategories.map(({ label, icon: Icon }) => {
          const active = categories.includes(label);

          return (
            <button
              key={label}
              onClick={() => toggleCategory(label)}
              className={`
                flex items-center justify-between gap-3
                px-5 py-2.5 rounded-full border text-[17px]
                whitespace-nowrap
                transition-all 
                ${active
                  ? "bg-[#F6ECE7] border-[#C46A54]"
                  : "bg-[#F5F5F5] border-transparent hover:bg-[#ECECEC]"
                }
              `}
            >
              {/* Label + Icon */}
              <span className="flex items-center gap-2 text-[#0C1014]">
                <Icon size={17} />
                {label}
              </span>

              {/* Checkmark */}
              {active && <Check size={18} className="text-[#4CAF50]" />}
            </button>
          );
        })}

      </div>

      {/* Minimum Selection Warning */}
      {!canContinue && (
        <p className="text-center text-[#C46A54] text-[14px] mt-6">
          Select at least 3 to Continue
        </p>
      )}

      {/* Buttons */}
      <div className="mt-8 flex flex-col items-center gap-6">
        <button
          disabled={!canContinue}
          onClick={onContinue}
          className={`
            w-[280px] py-3 rounded-full text-white text-[19px] font-medium
            ${canContinue ? "bg-[#C46A54]" : "bg-[#d8a89c] cursor-not-allowed"}
          `}
        >
          Start reading
        </button>

        <button onClick={onBack} className="text-[#0C1014] font-semibold underline text-md">
          ← Back
        </button>
      </div>
    </div>
  );
}
