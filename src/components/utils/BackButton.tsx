"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ChevronLeft } from "react-feather";

export const BackButton: FC = () => {
  const router = useRouter();
  const { user } = useAuthUser();

  if (!user) return null;

  return (
    <div className="flex items-center justify-center w-12 h-12 bg-[#F5F5F5] rounded-lg">
      <ChevronLeft className="w-10 h-10" onClick={router.back} />
    </div>
  );
};
