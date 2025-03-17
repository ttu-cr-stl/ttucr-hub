"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils/cn";

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: string[];
}

const AvatarCircles = ({
  className,
  numPeople,
  avatarUrls,
}: AvatarCirclesProps) => {
  // Filter out empty URLs and use initials for empty ones
  const validUrls = avatarUrls
    .filter((url) => url?.trim())
    .slice(0, 3)
    .map((url, index) => ({
      url,
      initial: String(index + 1),
    }));

  const displayNum = Math.max(0, (numPeople || 0) - validUrls.length);

  return (
    <div className={cn("flex -space-x-4", className)}>
      {validUrls.map(({ url, initial }, index) => (
        <Avatar
          key={index}
          className={cn(
            "ring-2 ring-white dark:ring-gray-800",
            className
              ?.split(" ")
              .find((c) => c.startsWith("*:"))
              ?.slice(2)
          )}
        >
          {url && <AvatarImage src={url} alt={`User ${index + 1}`} />}
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
      ))}
      {displayNum > 0 && (
        <div
          className={cn(
            "flex items-center justify-center size-10 rounded-full bg-white text-black text-xs font-medium ring-2 ring-white dark:ring-gray-800 relative z-10",
            className
              ?.split(" ")
              .find((c) => c.startsWith("*:"))
              ?.slice(2)
          )}
        >
          +{displayNum}
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
