"use client";

import Image from "next/image";

export default function FlameBadge({ streak = 5 }: { streak?: number }) {
  return (
    <div className="relative flex items-center justify-center w-[28px] h-[28px]">
      {/* Centered streak number */}
      <span className="absolute text-black bottom-0 fontFamily: 'Helvetica Neue' font-semibold text-[22px] leading-none">
        {streak}
      </span>

      {/* Flame Icon */}
      <Image
        src="/badges/flame-badge.png"
        alt="Flame Badge"
        width={28}
        height={28}
        className="pointer-events-none select-none"
      />
    </div>
  );
}
