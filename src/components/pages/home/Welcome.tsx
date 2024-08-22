"use client";
import { Badge } from "@/components/ui/shadcn/badge";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { useAuthUser } from "@/lib/providers/authProvider";
import { Degree } from "@/lib/utils/consts";
import { FC } from "react";

interface WelcomeProps {}

export const Welcome: FC<WelcomeProps> = ({}) => {
  const { user } = useAuthUser();

  if (!user) return <Skeleton className="h-[110px]" />;

  const userMajor = Degree.find((degree) => degree.value === user.major);
  const userMinor = Degree.find((degree) => degree.value === user.minor);

  return (
    <div className="flex flex-col w-full px-1">
      <span className="font-light text-lg leading-none px-2">Welcome,</span>
      <span className="text-5xl font-medium">{user.firstName} 👋</span>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-light pt-2">
        {userMajor && (
          <Badge
            style={{
              backgroundColor: userMajor?.color,
            }}
          >
            {userMajor.name}
          </Badge>
        )}

        {user?.minor !== "NONE" && user?.minor !== user?.major && (
          <Badge
            style={{
              backgroundColor: userMinor?.color,
            }}
          >
            {userMinor?.name}
          </Badge>
        )}

        {user?.orgs?.map((org) => (
          <Badge
            key={org.id}
            style={{
              backgroundColor: org.color || undefined,
            }}
          >
            {org.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};