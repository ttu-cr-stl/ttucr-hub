"use client";

import { useEffect, useState } from "react";
import { AuthButton } from "./components/authButton";
import { Challenge } from "./components/Challenge";
import { sampleChallenges } from "./data/challenges";

export default function Hackathon() {
  const [isLoading, setIsLoading] = useState(true);
  const [startChallenge, setStartChallenge] = useState(false);

  useEffect(() => {
    // Get stored value
    const storedValue = localStorage.getItem("startChallenge");
    setStartChallenge(storedValue === "true");
    setIsLoading(false);
  }, []);

  const handleStartChallenge = (value: boolean) => {
    setStartChallenge(value);
    localStorage.setItem("startChallenge", String(value));
  };

  // Show nothing during initial load to prevent hydration mismatch
  if (isLoading) {
    return null;
  }

  return (
    <div className="h-4/5 w-3/4 p-4 rounded-lg border border-[#4AF626] bg-black/90 font-mono text-[#4AF626] shadow-lg shadow-[#4AF626]/20">
      <div className="flex items-center justify-between border-b border-[#4AF626]/30 pb-2 mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm opacity-50">Terminal</div>
        {startChallenge && (
          <button
            onClick={() => handleStartChallenge(false)}
            className="text-sm hover:text-white transition-colors"
          >
            Exit Challenge
          </button>
        )}
      </div>
      <div className="h-[calc(100%-3rem)] overflow-y-auto">
        {startChallenge ? (
          <Challenge challenge={sampleChallenges[0]} />
        ) : (
          <AuthButton onStart={() => handleStartChallenge(true)} />
        )}
      </div>
    </div>
  );
}
