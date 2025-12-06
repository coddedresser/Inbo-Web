"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-[48px] h-[24px] bg-[#CBD5E1] rounded-full"
    >
      <div
        className={`
          absolute top-[1px] w-[22px] h-[22px]
          rounded-full bg-white shadow transition-all
          ${dark ? "left-[24px]" : "left-[1px]"}
        `}
      />

      <Sun
        size={14}
        className={`absolute left-[6px] top-[5px] transition-opacity ${
          dark ? "opacity-0" : "opacity-100"
        }`}
      />

      <Moon
        size={14}
        className={`absolute right-[6px] top-[5px] transition-opacity ${
          dark ? "opacity-100" : "opacity-0"}
        `}
      />
    </button>
  );
}
