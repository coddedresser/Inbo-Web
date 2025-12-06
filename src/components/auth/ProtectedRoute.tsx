'use client';

import { useEffect } from 'react';
import { useRouter,usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { ReactNode } from 'react';
import path from 'node:path';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireGuest?: boolean;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireGuest = false,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        const redirect = redirectTo || '/auth/login';
        router.push(`${redirect}?redirect=${encodeURIComponent(pathname)}`);
      } else if (requireGuest && isAuthenticated) {
        const redirect = redirectTo || '/dashboard';
        router.push(redirect);
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, requireGuest, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show content if conditions are met
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect
  }

  if (requireGuest && isAuthenticated) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

// HOC for protecting pages
export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: { requireAuth?: boolean; requireGuest?: boolean; redirectTo?: string }
) => {
  const ProtectedComponent = (props: P) => {
    return (
      <ProtectedRoute
        requireAuth={options?.requireAuth ?? true}
        requireGuest={options?.requireGuest ?? false}
        redirectTo={options?.redirectTo}
      >
        <Component {...props} />
      </ProtectedRoute>
    );
  };

  ProtectedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;

  return ProtectedComponent;
};

