"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthUser } from "@/lib/providers/authProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Home } from "react-feather";

export function MiniProfile({ className }: { className?: string }) {
  const { user } = useAuthUser();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="flex items-center gap-1.5 m-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          padding: "0.25rem 0.375rem",
          borderRadius: "0.125rem",
          border: "1px solid rgba(74, 246, 38, 0.3)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
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
          onClick={() => {
            router.push("/");
          }}
        >
          <Home className="size-4" />
        </Button>
      </motion.div>
    </div>
  );
}
