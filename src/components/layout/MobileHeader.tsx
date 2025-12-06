"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

export default function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex md:hidden w-full px-4 py-3 bg-white shadow-sm">
      <div className="flex items-center justify-between w-full">

        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="p-2">
          <Menu size={26} />
        </button>

        {/* Logo */}
        <Image
          src="/logos/inbo-logo.png"
          alt="Inbo Logo"
          width={110}
          height={40}
          className="object-contain"
        />

        {/* Optional right side items */}
        <div className="w-[26px]" />
      </div>
    </header>
  );
}
