"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "react-feather";
import { useState } from "react";

interface TestCasesProps {
  testCases: any[];
  results?: any[];
  isExecuting?: boolean;
}

export function TestCasesComponent({
  testCases,
  results,
  isExecuting,
}: TestCasesProps) {
  const [openTestCase, setOpenTestCase] = useState<number | null>(null);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[#4AF626] text-sm font-semibold">Test Cases</h3>
        {results && (
          <div className="flex items-center gap-2">
            <Badge variant={results.every(r => r.passed) ? "default" : "destructive"}>
              {results.filter(r => r.passed).length}/{results.length} Passed
            </Badge>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {testCases.map((testCase, index) => (
          <div
            key={index}
            className="border border-[#4AF626]/30 rounded-md bg-black/30 overflow-hidden"
          >
            <Button
              variant="ghost"
              className="w-full px-4 py-2 h-auto hover:bg-black/40"
              onClick={() => setOpenTestCase(openTestCase === index ? null : index)}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-[#4AF626]/70">
                  Test Case {index + 1}
                </span>
                <div className="flex items-center gap-2">
                  {results?.[index] && (
                    <>
                      <Badge 
                        variant={results[index].passed ? "default" : "destructive"}
                        className={isExecuting ? "opacity-50" : ""}
                      >
                        {results[index].passed ? "Passed" : "Failed"}
                      </Badge>
                      {results[index].executionTime && !isExecuting && (
                        <span className="text-xs text-[#4AF626]/70">
                          {results[index].executionTime.toFixed(2)}ms
                        </span>
                      )}
                    </>
                  )}
                  {openTestCase === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </div>
            </Button>

            {openTestCase === index && (
              <div className="px-4 py-2 text-sm space-y-4">
                <div>
                  <span className="text-[#4AF626]/70">Input:</span>
                  <pre className="mt-1 p-2 rounded bg-black/50 overflow-x-auto">
                    {testCase.input}
                  </pre>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#4AF626]/70">Expected Output:</span>
                    <pre className="mt-1 p-2 rounded bg-black/50 overflow-x-auto">
                      {testCase.expectedOutput}
                    </pre>
                  </div>
                  
                  {results?.[index] && (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#4AF626]/70">Your Output:</span>
                        <Badge 
                          variant={results[index].passed ? "default" : "destructive"}
                          className={`text-xs ${isExecuting ? "opacity-50" : ""}`}
                        >
                          {results[index].passed ? "Passed" : "Failed"}
                        </Badge>
                        {results[index].executionTime && !isExecuting && (
                          <span className="text-xs text-[#4AF626]/70">
                            {results[index].executionTime.toFixed(2)}ms
                          </span>
                        )}
                      </div>
                      <pre className="mt-1 p-2 rounded bg-black/50 overflow-x-auto">
                        {results[index].actualOutput}
                      </pre>
                    </div>
                  )}
                </div>

                {results?.[index]?.error && (
                  <div>
                    <span className="text-red-500">Error:</span>
                    <pre className="mt-1 p-2 rounded bg-black/50 text-red-400 overflow-x-auto">
                      {results[index].error}
                    </pre>
                  </div>
                )}
                
                {testCase.explanation && (
                  <div>
                    <span className="text-[#4AF626]/70">Explanation:</span>
                    <p className="mt-1 text-gray-300">{testCase.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
