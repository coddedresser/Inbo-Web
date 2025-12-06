import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto py-10 bg-white border-t border-[#E8E9EB]">
      <div className="max-w-5xl mx-auto px-6 text-center text-[#6F7680]">

        <p className="text-[15px]">
          © {new Date().getFullYear()} Inbo — Discover newsletters you’ll love.
        </p>

        <div className="flex items-center justify-center gap-6 mt-4 text-[14px]">
          <Link href="/privacy" className="hover:text-[#0C1014]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#0C1014]">Terms</Link>
          <Link href="/support" className="hover:text-[#0C1014]">Support</Link>
        </div>

      </div>
    </footer>
  );
}
 