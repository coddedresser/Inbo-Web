"use client";

import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export interface PublicationItemProps {
  rank: number;
  logo: string;
  name: string;
  desc: string;
  onClick?: () => void;
}

export default function PublicationItem({
  rank,
  logo,
  name,
  desc,
  onClick
}: PublicationItemProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white p-4 border border-[#E5E7EB] rounded-2xl shadow-sm w-full max-l-6 relative z-10">

      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Rank */}
        <span className="
          w-6 flex-shrink-0
          text-[22px] leading-[30px] font-semi-bold
          text-[#0C1014]
          font-['Helvetica_Neue']
        ">
          {rank}
        </span>

        {/* Logo */}
        <img
          src={logo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover pointer-events-none"
        />

        {/* Name + Description */}
        <div className="flex flex-col">

          <p className="
            text-[20px] leading-[30px] font-medium
            text-black
            font-['Helvetica_Neue']
          ">
            {name}
          </p>

          <p className="
            text-[16px] leading-[20px] font-normal
            text-[#A2AAB4]
            font-['Helvetica_Neue']
          ">
            {desc}
          </p>
        </div>
      </div>

      {/* Right Section */}
      {isMobile ? (
        <button
          onClick={onClick}
          className="
            max-w-8 max-h-8 rounded-2xl
            border border-[#E5E7EB] 
            flex items-center justify-center
            hover:bg-gray-100 transition
          "
        >
          <ChevronRight />
        </button>
      ) : (
        <button
          onClick={onClick}
          className="
            max-w-24 max-h-8
            flex items-center justify-center
            rounded-2xl
            p-2
            border border-[#E5E7EB]
            text-[14px] leading-[16px] font-medium
            text-[#0C1014]
            font-['Helvetica_Neue']
            hover:bg-gray-100 transition
            whitespace-nowrap
          "
        >
          see details
        </button>
      )}
    </div>
  );
}