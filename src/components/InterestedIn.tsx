// InterestedIn.tsx
"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function InterestedIn() {
  const categories = [
    "Technology","AI","Economics","Startups","Business",
    "Finance","Career","Productivity","Design","Marketing",
    "Culture","Health","Current Affairs","Crypto",
  ];

  // Desktop: split into two rows
  const row1 = categories.filter((_, i) => i % 2 === 0);
  const row2 = categories.filter((_, i) => i % 2 === 1);

  // Mobile: 1 row contains ALL
  const mobileRow = categories;

  const [selected, setSelected] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const toggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const step = el.clientWidth * 0.65;
    const max = el.scrollWidth - el.clientWidth;

    const next =
      dir === "left"
        ? Math.max(0, el.scrollLeft - step)
        : Math.min(max, el.scrollLeft + step);

    el.scrollTo({ left: next, behavior: "smooth" });
  };

  const Pill = ({ label }: { label: string }) => (
    <button
      onClick={() => toggle(label)}
      className={
        "px-5 py-2 rounded-full flex items-center gap-3 whitespace-nowrap text-[16px] font-medium transition " +
        (selected.includes(label)
          ? "bg-black text-white"
          : "bg-[#F3F4F6] text-[#0C1014]")
      }
    >
      <div className="relative w-[48px] h-5 flex-shrink-0">
        <span className="absolute left-0 w-5 h-5 rounded-full bg-[#08DC2F] z-[3]" />
        <img
          src='/icons/forbes-icon.png'
          className="absolute left-[14px] w-5 h-5 rounded-full z-[2]"
        />
        <span className="absolute left-[28px] w-5 h-5 rounded-full bg-[#DC4949] z-[1]" />
      </div>

      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-white border rounded-2xl p-4 w-full flex flex-col gap-4">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/icons/InterestedIn-icon.png" className="w-6 h-6" />
          <p className="text-[16px] font-medium px-2">
            What are you interested in?
          </p>
        </div>

        {/* Desktop arrows */}
        <div className="hidden sm:flex gap-2">
          <button onClick={() => scroll("left")} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20}/>
          </button>
          <button onClick={() => scroll("right")} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      {/* Scroll wrapper */}
      <div
        ref={scrollRef}
        className="no-scrollbar overflow-x-auto overflow-y-hidden"
      >
        {/* Desktop: 2 rows */}
        <div className="hidden sm:flex flex-col gap-3 w-max">
          <div className="flex gap-4 flex-nowrap">
            {row1.map(item => <Pill key={item} label={item} />)}
          </div>
          <div className="flex gap-4 flex-nowrap">
            {row2.map(item => <Pill key={item} label={item} />)}
          </div>
        </div>

        {/* Mobile: 1 long row */}
        <div className="flex sm:hidden gap-4 flex-nowrap w-max">
          {mobileRow.map(item => <Pill key={item} label={item} />)}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display:none; }
        .no-scrollbar { scrollbar-width:none; -ms-overflow-style:none; }
      `}</style>
    </div>
  );
}
