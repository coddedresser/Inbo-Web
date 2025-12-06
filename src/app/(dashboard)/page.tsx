"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SEOHead } from "@/components/seo/SEOHead";

export default function DashboardPage() {
  const router = useRouter();

  // Redirect to Inbox
  useEffect(() => {
    router.replace("/inbox");
  }, [router]);

  return (
    <>
      <SEOHead title="Dashboard" description="User dashboard" />
      {/* Nothing else — layout already wraps this page */}
      <div className="flex items-center justify-center py-20 text-gray-500">
        Redirecting...
      </div>
    </>
  );
}
