"use client";

import { useRef, useCallback } from 'react';

interface EditEvent {
  type: 'paste' | 'type' | 'delete';
  timestamp: number;
  contentLength: number;
}

interface AIDetectionResult {
  isAIGenerated: boolean;
  confidence: number;
  explanation?: string;
}

export function useAIDetection() {
  const editHistory = useRef<EditEvent[]>([]);
  const startTime = useRef<number>(Date.now());
  const previousSubmission = useRef<string>("");

  const resetDetection = useCallback(() => {
    editHistory.current = [];
    startTime.current = Date.now();
  }, []);

  const trackEdit = useCallback((event: EditEvent) => {
    editHistory.current.push(event);
  }, []);

  const analyzeCode = useCallback((code: string): AIDetectionResult => {
    const totalTime = (Date.now() - startTime.current) / 1000; // in seconds
    
    // Calculate confidence based on key factors
    let confidence = 0;
    const reasons: string[] = [];

    // 1. Check for large paste events
    const pasteEvents = editHistory.current.filter(e => e.type === 'paste');
    const hasSuspiciousPaste = pasteEvents.some(e => e.contentLength > 100);
    if (hasSuspiciousPaste) {
      confidence += 0.6;
      reasons.push("Large code block pasted");
    }

    // 2. Check for suspiciously quick complex solutions
    if (totalTime < 30 && code.length > 200) {
      confidence += 0.3;
      reasons.push("Suspiciously quick submission");
    }

    // 3. Check for extensive documentation (common in AI responses)
    const hasDetailedComments = (code.match(/\/\*|\*\/|\/\/|#/g) || []).length > 5;
    if (hasDetailedComments) {
      confidence += 0.2;
      reasons.push("Unusually detailed documentation");
    }

    // Store current submission
    previousSubmission.current = code;

    return {
      isAIGenerated: confidence > 0.5,
      confidence,
      explanation: reasons.length > 0 
        ? `Potential AI-generated code: ${reasons.join(", ")}`
        : "Code appears to be manually written"
    };
  }, []);

  return {
    trackEdit,
    analyzeCode,
    resetDetection,
  };
} 