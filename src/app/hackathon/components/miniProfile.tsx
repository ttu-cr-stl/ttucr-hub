"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/providers/authProvider";
import { usePrivy } from "@privy-io/react-auth";
import { motion } from "framer-motion";
import Image from "next/image";
import { LogOut } from "react-feather";

export function MiniProfile({ className }: { className?: string }) {
  const { user } = useAuthUser();
  const { logout } = usePrivy();
  
  if (!user) return null;

  return (
    <div className="flex items-center gap-1.5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1.5 py-1 px-1.5 rounded-sm border border-[#4AF626]/30 bg-black/50"
      >
        <Avatar className="size-6 ring-1 ring-[#4AF626]/30">
          <Image
            src={user.profilePic || ""}
            alt={user.username}
            width={24}
            height={24}
            className="object-cover rounded-full"
          />
        </Avatar>
        <div className="font-mono text-xs text-[#4AF626]">
          <span className="opacity-50">@</span>
          {user.username}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-6 ml-1 text-[#4AF626] hover:text-[#4AF626]/80 hover:bg-[#4AF626]/10"
          onClick={() => logout()}
        >
          <LogOut className="size-4" />
        </Button>
      </motion.div>
    </div>
  );
}
