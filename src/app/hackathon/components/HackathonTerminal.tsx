"use client";

import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { TerminalText } from "../utils/terminalText";

interface HackathonTerminalProps {
  onStart: () => void;
  onViewRankings: () => void;
  hasSeenIntro: boolean;
  onIntroComplete: () => void;
  hasActiveSession?: boolean;
  onStartNewSession?: () => void;
}

export function HackathonTerminal({ 
  onStart, 
  onViewRankings, 
  hasSeenIntro, 
  onIntroComplete, 
  hasActiveSession = false, 
  onStartNewSession 
}: HackathonTerminalProps) {
  const { user } = useAuthUser();
  const { authenticated } = usePrivy();
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const menuOptions = useMemo(() => [
    {
      id: "1",
      label: hasActiveSession 
        ? "Resume Challenge (In Progress)" 
        : "Start Challenge (45 min time limit)",
      action: onStart,
    },
    {
      id: "2",
      label: "View Rankings",
      action: onViewRankings,
    },
    ...(hasActiveSession ? [{
      id: "3",
      label: "Start New Session",
      action: onStartNewSession || (() => {}),
    }] : []),
  ], [hasActiveSession, onStart, onViewRankings, onStartNewSession]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const option = menuOptions.find((opt) => opt.id === e.key);
      if (option) {
        setSelectedOption(option.id);
        setTimeout(() => {
          option.action();
        }, 500);
      }
    };

    if (showOptions) {
      window.addEventListener("keypress", handleKeyPress);
      return () => window.removeEventListener("keypress", handleKeyPress);
    }
  }, [showOptions, menuOptions]);

  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: 'rgba(74, 246, 38, 0.8)',
            fontSize: '1.25rem'
          }}
        >
          ACCESS DENIED
        </motion.div>
        
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              color: 'rgba(74, 246, 38, 0.6)',
              fontSize: '0.875rem'
            }}
          >
            Authentication required to access terminal
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              color: 'rgba(74, 246, 38, 0.4)',
              fontSize: '0.75rem'
            }}
          >
            Please authenticate to continue...
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Link
            href={NavPath.LOGIN}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black border border-[#4AF626] rounded-sm text-sm text-[#4AF626] hover:bg-[#4AF626]/10 transition-colors duration-200"
          >
            <span className="font-mono">&gt;</span>
            <span>REDIRECT TO LOGIN</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  const welcomeText = hasSeenIntro
    ? [
        `Welcome back, ${user?.firstName || 'user'}`,
        " ",
        hasActiveSession ? "You have an active session." : "",
      ]
    : [
        "INITIALIZING SYSTEM...",
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESS GRANTED.",
        `Welcome ${user?.firstName || 'user'}`,
        hasActiveSession ? "You have an active session." : "",
      ];

  return (
    <div className="flex flex-col justify-center space-y-4">
      <TerminalText
        text={welcomeText}
        typingSpeed={hasSeenIntro ? 50 : 25}
        lineDelay={hasSeenIntro ? 500 : 200}
        onComplete={() => {
          setShowOptions(true);
          if (!hasSeenIntro) {
            onIntroComplete();
          }
        }}
      />

      {showOptions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-2">
            {menuOptions.map((option) => (
              <motion.div
                key={option.id}
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => {
                    setSelectedOption(option.id);
                    setTimeout(() => {
                      option.action();
                    }, 500);
                  }}
                  className={`w-full text-left px-2 py-1 font-mono text-sm transition-colors ${
                    selectedOption === option.id
                      ? "bg-[#4AF626] text-black"
                      : "hover:bg-[#4AF626]/10"
                  }`}
                >
                  <span className="mr-2">&gt;</span>
                  {option.id}) {option.label}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
