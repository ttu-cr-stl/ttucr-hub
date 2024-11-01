"use client";

import { cn } from "@/lib/utils/cn";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MiniProfile } from "../components/miniProfile";

interface TerminalTextProps {
  text: string | string[];
  className?: string;
  typingSpeed?: number;
  lineDelay?: number;
  showCursor?: boolean;
  color?: string;
  startDelay?: number;
  prompt?: string;
  onComplete?: () => void;
}

const blinkAnimation = `
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

export function TerminalText({
  text,
  className,
  typingSpeed = 150,
  lineDelay = 500,
  showCursor = true,
  color = "#4AF626",
  startDelay = 0,
  prompt = "$ ",
  onComplete,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const textLines = Array.isArray(text)
    ? text
    : text.split("\n").filter((line) => line.length > 0);

  useEffect(() => {
    if (!isComplete) {
      setDisplayedText([]);
      setIsComplete(false);

      let currentLineIndex = 0;
      let currentCharIndex = 0;
      let timeoutId: NodeJS.Timeout;

      const typeNextChar = () => {
        if (currentLineIndex >= textLines.length) {
          setIsComplete(true);
          onComplete?.();
          return;
        }

        const currentLine = textLines[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
          setDisplayedText((prev) => {
            const newLines = [...prev];
            if (!newLines[currentLineIndex]) newLines[currentLineIndex] = "";
            newLines[currentLineIndex] = currentLine.slice(
              0,
              currentCharIndex + 1
            );
            return newLines;
          });
          currentCharIndex++;
          timeoutId = setTimeout(typeNextChar, typingSpeed);
        } else {
          currentCharIndex = 0;
          currentLineIndex++;
          timeoutId = setTimeout(typeNextChar, lineDelay);
        }
      };

      timeoutId = setTimeout(typeNextChar, startDelay);

      return () => clearTimeout(timeoutId);
    }
  }, [
    text,
    typingSpeed,
    lineDelay,
    startDelay,
    textLines,
    onComplete,
    isComplete,
  ]);

  const renderLineWithUserComponent = (line: string) => {
    const parts = line.split(/(display_user)/gi);
    return parts.map((part, i) => {
      if (part.toLowerCase() === "display_user") {
        return <React.Fragment key={i}>{<MiniProfile />}</React.Fragment>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      <style>{blinkAnimation}</style>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("flex flex-col space-y-1 font-mono", className)}
        style={{ color }}
        as="div"
      >
        {displayedText.map((line, index) => (
          <div key={index} className="flex items-center">
            <span className="mr-2">{prompt}</span>
            {renderLineWithUserComponent(line)}
            {showCursor &&
              index === displayedText.length - 1 &&
              !isComplete && <span className="ml-[2px] animate-blink">_</span>}
          </div>
        ))}
        {isComplete && showCursor && (
          <div className="flex items-center">
            <span className="mr-2">{prompt}</span>
            <span className="animate-blink">_</span>
          </div>
        )}
      </motion.div>
    </>
  );
}
