"use client";

import { motion } from "framer-motion";

export function ChallengeLoadingState() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-[#4AF626]/10 rounded w-1/3" />
      <div className="space-y-2">
        <div className="h-4 bg-[#4AF626]/10 rounded w-full" />
        <div className="h-4 bg-[#4AF626]/10 rounded w-2/3" />
      </div>
      <div className="h-64 bg-[#4AF626]/5 rounded border border-[#4AF626]/10" />
    </div>
  );
}

export function RankingsLoadingState() {
  return (
    <div className="w-full space-y-2">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{
            height: "4rem",
            backgroundColor: "rgba(74, 246, 38, 0.1)",
            borderRadius: "0.25rem",
          }}
        />
      ))}
    </div>
  );
}

export function SubmissionLoadingState() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#4AF626] border-t-transparent" />
    </div>
  );
}
