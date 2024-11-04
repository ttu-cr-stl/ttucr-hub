"use client";

import { useState } from "react";
import { Challenge, ExecutionResult, TestCase } from "../types";
import { SUPPORTED_LANGUAGES } from "../types/languages";

interface AIDetectionResult {
  isAIGenerated: boolean;
  confidence: number;
  explanation?: string;
}

export function useCodeExecution() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [results, setResults] = useState<ExecutionResult[]>([]);

  const executeCode = async (
    code: string,
    language: keyof typeof SUPPORTED_LANGUAGES,
    challenge: Challenge,
    aiDetectionResult: AIDetectionResult
  ): Promise<ExecutionResult[]> => {
    setIsExecuting(true);
    try {
      const executionResults = await Promise.all(
        challenge.testCases.map((testCase) =>
          executeTestCase(code, language, testCase, aiDetectionResult)
        )
      );

      setResults(executionResults);
      return executionResults;
    } catch (error) {
      console.error("Error executing code:", error);
      const errorResults = challenge.testCases.map(() => ({
        passed: false,
        actualOutput: "Execution error",
        expectedOutput: "",
        error: "Failed to execute code",
        executionTime: 0,
      }));
      setResults(errorResults);
      return errorResults;
    } finally {
      setIsExecuting(false);
    }
  };

  const executeTestCase = async (
    code: string,
    language: keyof typeof SUPPORTED_LANGUAGES,
    testCase: TestCase,
    aiDetectionResult: AIDetectionResult
  ): Promise<ExecutionResult> => {
    try {
      const response = await fetch('/api/code-execution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: SUPPORTED_LANGUAGES[language].id,
          stdin: testCase.input,
          expected_output: testCase.expectedOutput,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || error.error || 'Execution failed');
      }

      const result = await response.json();
      
      let actualOutput = result.stdout?.trim() || "";
      const passed = actualOutput === testCase.expectedOutput;

      return {
        passed,
        actualOutput: result.stderr || result.compile_output || actualOutput,
        expectedOutput: testCase.expectedOutput,
        executionTime: parseFloat(result.time || "0") || 0,
        error: result.stderr || result.compile_output || undefined,
        aiDetection: aiDetectionResult,
      };
    } catch (error) {
      console.error("Test case execution error:", error);
      return {
        passed: false,
        actualOutput: "Execution error",
        expectedOutput: testCase.expectedOutput,
        error: error instanceof Error ? error.message : "Failed to execute code",
        executionTime: 0,
      };
    }
  };

  return {
    executeCode,
    isExecuting,
    setIsExecuting,
    results,
  };
}
