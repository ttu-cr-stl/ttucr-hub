"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { useRouter } from "next-nprogress-bar";
import { FC, useCallback } from "react";
import { ChevronLeft } from "react-feather";

export const BackButton: FC = () => {
  const router = useRouter();
  const { user } = useAuthUser();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined") {
      // Check if there's a previous page in the history
      if (window.history.length > 1) {
        router.back();
      } else {
        // If no previous page, push to '/'
        router.push("/");
      }
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-[#F5F5F5] rounded-lg">
      <ChevronLeft className="w-10 h-10 cursor-pointer" onClick={handleBack} />
    </div>
  );
};
