import React from "react";
import { User, Org } from "@prisma/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/shadcn/badge";
import { Degree } from "@/lib/utils/consts";

interface UserCardProps {
  user: User;
  orgs?: Org[];
}

function UserCard({ user, orgs }: UserCardProps) {
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

  if (user.firstName === "" && user.lastName === "") {
    return null;
  }

  return (
    <Link href={`/user/${user.username}`}>
      <div
        className={`flex justify-between items-center mx-2 px-2 py-2 border-2 rounded-2xl bg-white`}
        style={{
          borderColor: userMajor ? userMajor.color : "lightgrey",
        }}
      >
        <div className="flex items-center">
          <Avatar className="w-10 h-10 mr-2">
            <AvatarImage src={user.profilePic || ""} />
            <AvatarFallback className="bg-gray-200">
              {/* {user.firstName[0]}
              {user.lastName[0]} */}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <span className="leading-tight">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex flex-row flex-wrap gap-2">
              <Badge
                className="text-xs font-normal"
                style={{
                  backgroundColor: userMajor?.color,
                }}
              >
                {userMajor?.value}
              </Badge>
              {userMinor?.name && user.minor !== "NONE" ? (
                <Badge
                  style={{
                    backgroundColor: userMinor?.color,
                  }}
                >
                  {userMinor?.value}
                </Badge>
              ) : null}
              {orgs?.map((org) => (
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
