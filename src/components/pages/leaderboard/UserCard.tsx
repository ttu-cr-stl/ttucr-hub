import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import StucoTitle from "@/components/utils/StucoTitle";
import { Degree } from "@/lib/utils/consts";
import { Org, User } from "@prisma/client";
import Link from "next/link";

interface UserCardProps {
  user: User & { orgs: Org[] };
}

function UserCard({ user }: UserCardProps) {
  const userMajor = Degree.find((degree) => degree.value === user.major);
  const userMinor = Degree.find((degree) => degree.value === user.minor);

  const getInitials = (phrase: string): string => {
    const words = phrase.split(" ");
    const initials = words
      .filter((word) => word.length > 2)
      .map((word) => word[0].toUpperCase())
      .join("");
    return initials;
  };

  return (
    <Link href={`/user/${user.username}`}>
      <div
        className={`flex justify-between items-center px-2 py-1.5 border-2 rounded-2xl bg-white`}
        style={{
          borderColor: userMajor ? userMajor.color : "lightgrey",
        }}
      >
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mt-0.5 mr-2 self-start">
            <AvatarImage src={user.profilePic || "users/default.jpg"} />
            <AvatarFallback className="bg-gray-200">
              {/* {user.firstName[0]}
              {user.lastName[0]} */}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center gap-y-0.5">
            <span className="leading-tight">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex flex-row flex-wrap gap-2">
              <StucoTitle username={user.username} />
              {userMajor && user.major !== "NONE" && (
                <Badge
                  className="text-xs font-normal"
                  style={{
                    backgroundColor: userMajor.color,
                  }}
                >
                  {userMajor.value}
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
                    backgroundColor: org.color || "gray",
                  }}
                >
                  {getInitials(org.name)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        {/*         <div className="flex justify-center items-center w-16 h-11 rounded-xl bg-red-500 text-white text-lg">
          30k
        </div> */}
      </div>
    </Link>
  );
}

export default UserCard;
