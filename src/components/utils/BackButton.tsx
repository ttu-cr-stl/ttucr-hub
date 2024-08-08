"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { ChevronLeft } from "react-feather";

export const BackButton: FC = () => {
  const router = useRouter();
  const { user } = useAuthUser();

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined") {
      const previousPage = document.referrer;
      const allowedDomains = ["https://ttu-hub.vercel.app", "localhost:3000"]; // Allow both production and local development
      const isAllowedDomain = allowedDomains.some(domain => new URL(previousPage).hostname.includes(domain));

      if (
        previousPage &&
        isAllowedDomain
      ) {
        router.back();
      } else {
        // Fallback action if the previous page is not from the allowed domain
        router.push("/"); // Or any other default route
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
