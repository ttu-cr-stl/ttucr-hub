"use client";

import { useState } from "react";
import { createSubmissionAction, getSubmissionAction } from "../actions/judge0";
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
      const token = await createSubmissionAction({
        source_code: code,
        language_id: SUPPORTED_LANGUAGES[language].id,
        stdin: testCase.input,
        expected_output: testCase.expectedOutput,
      });

      const result = await pollSubmissionResult(token);

      let actualOutput = result.stdout?.trim() || "";
      if (
        language === "python" &&
        (actualOutput === "True" || actualOutput === "False")
      ) {
        actualOutput = actualOutput;
      }

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
        error: "Failed to execute code",
        executionTime: 0,
      };
    }
  };

  const pollSubmissionResult = async (
    token: string,
    retries = 10
  ): Promise<any> => {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await getSubmissionAction(token);
        if (result.status.id >= 3) {
          return result;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Polling error:", error);
        throw error;
      }
    }
    throw new Error("Submission timeout");
  };

  return {
    executeCode,
    isExecuting,
    setIsExecuting,
    results,
  };
}
