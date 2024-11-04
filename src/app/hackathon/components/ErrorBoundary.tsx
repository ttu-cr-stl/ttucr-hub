"use client";

import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'react-feather';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Hackathon error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-6 border border-red-500/20 rounded-lg bg-black/50">
          <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-red-500 font-medium mb-2">Something went wrong</h3>
          <p className="text-red-500/70 text-sm mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Button
            onClick={() => this.setState({ hasError: false })}
            variant="outline"
            className="border-red-500/30 text-red-500 hover:bg-red-500/10"
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
} 