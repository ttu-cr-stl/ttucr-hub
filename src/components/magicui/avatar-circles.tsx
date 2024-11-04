"use client";

import { cn } from "@/lib/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <Avatar
          key={index}
          className="size-10 rounded-full border-2 border-white dark:border-gray-800 bg-gray-500"
        >
          <AvatarImage src={url} />
          <AvatarFallback className="bg-[#D9D9D9]"></AvatarFallback>
        </Avatar>
      ))}
      {displayNum > 0 && (
        <div className="z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white dark:border-gray-800 dark:bg-white dark:text-black">
          +{displayNum}
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
