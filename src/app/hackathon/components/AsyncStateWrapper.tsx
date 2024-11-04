"use client";

import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { ChallengeLoadingState, RankingsLoadingState } from './LoadingStates';

interface AsyncStateWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  error?: Error | null;
  loadingComponent?: ReactNode;
  type?: 'challenge' | 'rankings';
}

export function AsyncStateWrapper({
  children,
  isLoading,
  error,
  loadingComponent,
  type = 'challenge'
}: AsyncStateWrapperProps) {
  const defaultLoadingComponent = 
    type === 'challenge' ? <ChallengeLoadingState /> :
    type === 'rankings' ? <RankingsLoadingState /> :
    <div>Loading...</div>;

  return (
    <ErrorBoundary>
      {isLoading ? (loadingComponent || defaultLoadingComponent) : children}
    </ErrorBoundary>
  );
} 