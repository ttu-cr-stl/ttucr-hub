"use client";

import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle } from "react-feather";
import { TestCasesComponent } from "./TestCases";

interface ChallengeProps {
  challenge: any;
}

// Add loading state component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4AF626] border-t-transparent" />
    </div>
  );
}

export function Challenge({ challenge }: ChallengeProps) {
  // Simplified state management
  const [mounted, setMounted] = useState(false);
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("python");

  // Initialize states after component mounts
  useEffect(() => {
    setMounted(true);
    setCode(challenge.starterCode);
    setLanguage("python");
  }, [challenge.starterCode]);

  // Show loading state while component hydrates
  if (!mounted) return <LoadingSpinner />;

  return (
    <div className="flex flex-col h-full space-y-2">
      <div className="flex justify-between items-center">
        <h2 className="text-[#4AF626] text-lg">{challenge.title}</h2>
        <Button 
          onClick={() => {}}
          className="bg-[#4AF626] text-black hover:bg-[#4AF626]/80 text-sm h-8"
        >
          Run Code
        </Button>
      </div>

      <div className="flex flex-col space-y-2 flex-1">
        <div className="h-[60%] flex flex-col space-y-1">
          <span className="text-[#4AF626] text-xs">Code:</span>
          <div className="flex-1 border border-[#4AF626]/30 rounded-md overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={language || "python"}
              language={language || "python"}
              theme="vs-dark"
              value={code || ""}
              onChange={(value) => setCode(value || "")}
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

        <div className="flex-1 flex flex-col space-y-2">
          <TestCasesComponent
            testCases={challenge.testCases}
            results={[]}
            isExecuting={false}
          />

          <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[#4AF626] text-xs">Output:</span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#4AF626]">
                  {"// Run your code to see output"}
                </span>
              </div>
            </div>
            <pre className="flex-1 p-3 bg-black/50 border border-[#4AF626]/30 rounded-md overflow-auto font-mono text-[#4AF626] text-xs">
              {[{stdout: "", stderr: ""}]
                .map((r) => {
                  if (r.stderr) return `Error: ${r.stderr}`;
                  return r.stdout || '';
                })
                .filter(Boolean)
                .join('\n') || "// Run your code to see output"}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
