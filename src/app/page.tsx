"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // wait until auth state is loaded

    if (isAuthenticated) {
      router.push("/inbox");
    } else {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // ⬅ FIX — do NOT block redirect, return null instead
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}
