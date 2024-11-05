"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "react-feather";
import { Rankings } from "../components/Rankings";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RankingsPage() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between w-full border-b border-[#4AF626]/30 pb-2 mb-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-sm opacity-50">Rankings</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-[#4AF626] hover:text-[#4AF626]/80"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Rankings />
      </motion.div>
    </>
  );
} 