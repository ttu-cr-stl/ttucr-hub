"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { updateHackathonSubmission } from "@/db/hackathon";
import { useAuthUser } from "@/lib/providers/authProvider";
import { cn } from "@/lib/utils/cn";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { AlertTriangle, Loader } from "react-feather";
import { useAIDetection } from "../hooks/useAIDetection";
import { useCodeExecution } from "../hooks/useCodeExecution";
import { Challenge as ChallengeType } from "../types";
import { SupportedLanguage } from "../types/languages";
import { calculateScore } from "../utils/scoring";
import { AsyncStateWrapper } from "./AsyncStateWrapper";
import { HelpfulFunctions } from "./HelpfulFunctions";
import { TestCasesComponent } from "./TestCases";

interface ChallengeProps {
  challenge: ChallengeType;
  onShowCelebration: (show: boolean) => void;
  onSetLastExecutionTime: (time: number) => void;
  onMarkChallengeComplete: (challengeId: string, executionTime: number) => void;
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4AF626] border-t-transparent" />
    </div>
  );
}

export const Challenge = ({
  challenge,
  onShowCelebration,
  onSetLastExecutionTime,
  onMarkChallengeComplete,
}: ChallengeProps) => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const { executeCode, isExecuting, setIsExecuting, results } = useCodeExecution();
  const { trackEdit, analyzeCode, resetDetection } = useAIDetection();
  const { user } = useAuthUser();
  const { toast } = useToast();

  // Add state for showing warning
  const [showAIWarning, setShowAIWarning] = useState(false);

  useEffect(() => {
    setCode(challenge.starterCode);
    setLanguage("python");
  }, [challenge.starterCode]);

  const handleEditorChange = (value: string | undefined) => {
    const newCode = value || "";
    const contentDiff = Math.abs(newCode.length - code.length);

    // Reset AI warning when code changes significantly
    if (showAIWarning && contentDiff > 20) {
      setShowAIWarning(false);
    }

    // More aggressive paste detection
    const isPaste =
      contentDiff > 50 || (contentDiff > 20 && contentDiff / code.length > 0.5);

    console.log("Editor change:", {
      isPaste,
      contentDiff,
      oldLength: code.length,
      newLength: newCode.length,
      ratio: contentDiff / code.length,
    });

    const event = {
      type: isPaste ? "paste" : "type",
      timestamp: Date.now(),
      contentLength: contentDiff,
    } as const;

    trackEdit(event);
    setCode(newCode);
  };

  const handleExecutionError = (error: unknown) => {
    console.error("Execution error:", error);
    toast({
      variant: "destructive",
      title: "Execution Error",
      description:
        error instanceof Error ? error.message : "Failed to execute code",
    });
  };

  const handleRunCode = async () => {
    if (!user?.username) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please login to continue",
      });
      return;
    }

    try {
      setIsExecuting(true);
      const aiDetectionResult = analyzeCode(code);

      if (aiDetectionResult.isAIGenerated) {
        setShowAIWarning(true);
        return;
      }

      const executionResults = await executeCode(
        code,
        language,
        challenge,
        aiDetectionResult
      );

      if (!executionResults) {
        throw new Error("Execution failed");
      }

      if (executionResults.every((r) => r.passed)) {
        const totalExecutionTime = executionResults.reduce((sum, result) => {
          return sum + (result.executionTime || 0);
        }, 0);

        const averageExecutionTime =
          totalExecutionTime / executionResults.length;

        try {
          const score = calculateScore({
            executionTime: averageExecutionTime,
            difficulty: challenge.difficulty,
          });

          await updateHackathonSubmission(
            user.username,
            challenge.id,
            score,
            averageExecutionTime,
            true
          );

          onSetLastExecutionTime(averageExecutionTime);
          onShowCelebration(true);
          onMarkChallengeComplete(challenge.id, averageExecutionTime);
        } catch (error) {
          console.error("Error updating challenge completion:", error);
          toast({
            variant: "destructive",
            title: "Update Error",
            description: "Failed to update challenge completion",
          });
        }
      }
    } catch (error) {
      handleExecutionError(error);
    } finally {
      setIsExecuting(false);
    }
  };

  // Reset everything when user clicks "Reset Code"
  const handleReset = () => {
    setCode(challenge.starterCode);
    setShowAIWarning(false);
    resetDetection();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Add AI Warning Alert */}
      {showAIWarning && (
        <div className="mb-4 p-4 border border-yellow-500/50 bg-yellow-500/10 rounded-md">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-500 font-medium mb-1">
                AI-Generated Code Detected
              </h3>
              <p className="text-yellow-500/80 text-sm mb-3">
                We&apos;ve detected that this solution may be AI-generated.
                Please note:
              </p>
              <ul className="text-sm text-yellow-500/70 list-disc list-inside space-y-1 mb-3">
                <li>
                  Using AI-generated code is not allowed in this challenge
                </li>
                <li>Try solving the problem yourself to improve your skills</li>
                <li>
                  You can use pseudocode or break down the problem step by step
                </li>
              </ul>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                >
                  Reset Code & Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg text-[#4AF626]">{challenge.title}</h2>
          <Badge
            variant="outline"
            className={cn(
              "text-xs",
              challenge.difficulty === "Easy" &&
                "text-green-500 border-green-500/30",
              challenge.difficulty === "Medium" &&
                "text-yellow-500 border-yellow-500/30",
              challenge.difficulty === "Hard" &&
                "text-red-500 border-red-500/30"
            )}
          >
            {challenge.difficulty}
          </Badge>
          {challenge.helpfulFunctions &&
            challenge.helpfulFunctions.length > 0 && (
              <HelpfulFunctions functions={challenge.helpfulFunctions} />
            )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500/80 text-xs flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            AI-generated code is not allowed
          </span>
          <Button
            onClick={handleRunCode}
            disabled={isExecuting}
            className="bg-[#4AF626] text-black hover:bg-[#4AF626]/80 text-sm h-8"
          >
            {isExecuting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              "Run Code"
            )}
          </Button>
        </div>
      </div>

      {/* Problem Description Section */}
      <div className="mb-4 p-4 border border-[#4AF626]/30 rounded-md bg-black/30">
        <div className="prose prose-sm prose-invert max-w-none">
          <div className="mb-4">
            <div className="whitespace-pre-wrap text-[#4AF626]/90 text-sm">
              {challenge.description}
            </div>
          </div>

          {challenge.constraints.length > 0 && (
            <div className="mt-4">
              <h4 className="text-[#4AF626] text-xs mb-2">Constraints:</h4>
              <ul className="list-disc list-inside text-xs text-[#4AF626]/70 space-y-1">
                {challenge.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 flex-1 h-full">
        {/* Left side - Code Editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <span className="text-[#4AF626] text-xs mb-1">Code:</span>
          <div className="flex-1 border border-[#4AF626]/30 rounded-md overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={language}
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 12,
                lineNumbers: "on",
                roundedSelection: false,
                readOnly: false,
                theme: "vs-dark",
                padding: { top: 8, bottom: 8 },
              }}
            />
          </div>
        </div>

        {/* Right side - Test Cases */}
        <div className="w-[45%] min-w-0">
          <AsyncStateWrapper isLoading={isExecuting} type="challenge">
            {results && (
              <TestCasesComponent
                testCases={challenge.testCases}
                results={results}
                isExecuting={isExecuting}
              />
            )}
          </AsyncStateWrapper>
        </div>
      </div>
    </div>
  );
};
