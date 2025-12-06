"use client";

import { useEffect, type ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import DeepLinkHandler from "@/utils/deepLink";

// ✅ ADD THIS — required so useTranslation stops throwing errors
import "@/i18n"; 

export default function ClientProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    DeepLinkHandler.getInstance();
  }, []);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
