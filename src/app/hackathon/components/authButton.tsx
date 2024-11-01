"use client";

import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { TerminalText } from "../utils/terminalText";

interface AuthButtonProps {
  onStart: () => void;
}

export const AuthButton = ({ onStart }: AuthButtonProps) => {
  const { user } = useAuthUser();
  const { authenticated } = usePrivy();
  const [showButton, setShowButton] = useState(false);

  if (user == null) {
    return <TerminalText text={[" "]} prompt="  " />;
  }

  if (!authenticated)
    return (
      <>
        <span className="text-sm -mb-4">Please login to continue</span>

        <Link
          href={NavPath.LOGIN}
          className="border border-[#4AF626] rounded-sm px-4 py-2"
        >
          <span>REDIRECT TO LOGIN</span>
        </Link>
      </>
    );

  return (
    <div className="flex flex-col justify-center space-y-4">
      <TerminalText
        text={[
          // "INITIALIZING SYSTEM...",
          // "ESTABLISHING SECURE CONNECTION...",
          // "RUNNING SECURITY PROTOCOLS...",
          // "ACCESS GRANTED.",
          // "READY TO BEGIN CHALLENGE.",
          `Welcome `,
          "display_user",
        ]}
        typingSpeed={124}
        onComplete={() => setShowButton(true)}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {showButton && (
          <>
            <button
              className="border border-[#4AF626] rounded-sm px-4 py-2"
              onClick={onStart}
            >
              <span>START CHALLENGE</span>
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
};
