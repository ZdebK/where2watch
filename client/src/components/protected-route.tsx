import React from 'react';
import { useAuth } from '../contexts/auth.context';
import { LoadingScreen } from './loading-screen';

/**
 * Protected Route Component
 * Ensures user is authenticated before rendering component
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <div className="flex items-center justify-center h-screen">Not authenticated</div>;
  }

  return <>{children}</>;
}
