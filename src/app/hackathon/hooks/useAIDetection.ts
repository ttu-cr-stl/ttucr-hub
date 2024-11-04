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
  const lastAnalyzedCode = useRef<string>("");
  const previousSubmission = useRef<string>("");
  const submissionCount = useRef<number>(0);

  const resetDetection = useCallback(() => {
    editHistory.current = [];
    startTime.current = Date.now();
    lastAnalyzedCode.current = "";
  }, []);

  const trackEdit = useCallback((event: EditEvent) => {
    editHistory.current.push(event);
  }, []);

  const analyzeCode = useCallback((code: string): AIDetectionResult => {
    submissionCount.current += 1;
    
    // Check for sudden improvement after a failed attempt
    let suddenImprovementScore = 0;
    if (previousSubmission.current && code !== previousSubmission.current) {
      const prevLength = previousSubmission.current.length;
      const currentLength = code.length;
      const lengthDiff = Math.abs(currentLength - prevLength);
      
      // If the new submission is significantly different from the previous one
      if (lengthDiff > 50 || lengthDiff / prevLength > 0.5) {
        suddenImprovementScore = 0.4;
      }
    }

    // Primary detection: Large paste events
    const pasteEvents = editHistory.current.filter(e => e.type === 'paste');
    const hasSuspiciousPaste = pasteEvents.some(e => e.contentLength > 100);
    
    // Secondary detection: Common AI patterns
    const aiPatterns = [
      // Function and class patterns
      /def\s+solution\(/,
      /class\s+Solution:/,
      
      // Documentation patterns
      /Time[:\s]+O\([^)]+\)/i,
      /Space[:\s]+O\([^)]+\)/i,
      /"""[\s\S]*?"""/,  // Multi-line docstring
      /#\s*@param/,      // Parameter documentation
      /#\s*@return/,     // Return documentation
      
      // Common AI solution patterns
      /return\s+result$/m,
      /if\s+__name__\s*==\s*['"]__main__['"]/,
      /(?:left|right|start|end)\s*=\s*\d+/,
      /while\s+(?:left|right|start|end)/,
      /for\s+i\s+in\s+range/,
      
      // Variable naming patterns
      /(?:result|output|ans|temp|curr|prev)(?:\d*)(?!\w)/,
      
      // Common optimization comments
      /two[- ]pointer/i,
      /sliding[- ]window/i,
      /dynamic[- ]programming/i,
    ];

    const matchedPatterns = aiPatterns.filter(pattern => pattern.test(code));

    // Calculate confidence score
    let confidence = 0;

    // Paste-based confidence
    if (hasSuspiciousPaste) {
      confidence += 0.6;
    }

    // Pattern-based confidence
    confidence += (matchedPatterns.length / aiPatterns.length) * 0.4;

    // Add sudden improvement score
    confidence += suddenImprovementScore;

    // Time-based adjustments
    const totalTime = (Date.now() - startTime.current) / 1000; // in seconds
    if (totalTime < 30 && code.length > 200) {
      confidence += 0.2;
    }

    // Adjust confidence based on submission history
    if (submissionCount.current > 1 && suddenImprovementScore > 0) {
      confidence += 0.2; // Additional penalty for sudden improvements after failed attempts
    }

    // Generate explanation
    const reasons: string[] = [];
    if (hasSuspiciousPaste) {
      reasons.push("Large code block pasted");
    }
    if (matchedPatterns.length > 0) {
      reasons.push("Common AI code patterns detected");
    }
    if (totalTime < 30 && code.length > 200) {
      reasons.push("Suspiciously quick submission");
    }
    if (suddenImprovementScore > 0) {
      reasons.push("Sudden improvement after previous attempt");
    }

    const result = {
      isAIGenerated: confidence > 0.5,
      confidence,
      explanation: reasons.length > 0 
        ? `Potential AI-generated code: ${reasons.join(", ")}`
        : "Code appears to be manually written"
    };

    // Store current submission for future comparison
    previousSubmission.current = code;

    return result;
  }, []);

  return {
    trackEdit,
    analyzeCode,
    resetDetection,
  };
} 