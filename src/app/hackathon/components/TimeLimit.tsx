"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock } from "react-feather";

interface TimeLimitProps {
  startTime: Date;
  duration: number; // in minutes
  onTimeUp: () => void;
}

export function TimeLimit({ startTime, duration, onTimeUp }: TimeLimitProps) {
  const [timeLeft, setTimeLeft] = useState<number>(duration * 60 * 1000);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const sessionStart = new Date(startTime).getTime();
      const elapsed = now - sessionStart;
      const remaining = Math.max(0, (duration * 60 * 1000) - elapsed);
      
      setTimeLeft(remaining);
      setIsWarning(remaining > 0 && remaining < 5 * 60 * 1000);
      
      if (remaining <= 0) {
        onTimeUp();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration, onTimeUp]);

  const minutes = Math.floor(timeLeft / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.375rem 0.75rem',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: `1px solid ${isWarning ? 'rgba(239, 68, 68, 0.5)' : 'rgba(74, 246, 38, 0.3)'}`,
        borderRadius: '0.375rem',
        color: isWarning ? 'rgb(239, 68, 68)' : 'rgb(74, 246, 38)'
      }}
    >
      <Clock className="w-4 h-4" />
      <div className="flex items-baseline gap-1">
        <span className="text-sm font-medium">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-xs opacity-70">remaining</span>
      </div>
    </motion.div>
  );
} 