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
  orgs: Org[];
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
        className="flex justify-between items-center mt-5 mx-2 p-2 border-2 rounded-2xl bg-white"
        style={{
          border: "3px solid",
          borderColor: userMajor ? userMajor.color : "black",
        }}
      >
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-2">
            <AvatarImage src={user.profilePic || ""} />
            <AvatarFallback className="bg-gray-200">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start leading-loose">
            <div className=" text-lg">
              {user.firstName} {user.lastName}
            </div>
            <div className="flex flex-row flex-wrap gap-2">
              <Badge
                className="px-2 text-xs font-normal"
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
              {orgs.map((org) => (
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
        <div className="flex justify-center items-center w-16 h-11 rounded-xl bg-red-500 text-white text-lg">
          30k
        </div>
      </div>
    </Link>
  );
}

export default UserCard;
