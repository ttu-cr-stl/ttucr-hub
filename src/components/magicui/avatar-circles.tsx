"use client";

import { useAuthUser } from "@/lib/providers/authProvider";
import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  const displayNum = (numPeople || 0) - avatarUrls.length;

  const { user } = useAuthUser();

  if (!user) return null;

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <Image
          key={index}
          className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-500 object-cover"
          src={url || "users/default.jpg"}
          width={40}
          height={40}
          alt=""
        />
      ))}
      {displayNum > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white dark:border-gray-800 dark:bg-white dark:text-black">
          +{displayNum}
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
