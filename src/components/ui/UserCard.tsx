import React from "react";
import { User } from "@prisma/client";
import { Org } from "@prisma/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/shadcn/badge";
import { Degree } from "@/lib/utils/consts";
import { Button } from "@/components/ui/shadcn/button";

function UserCard({ user }: { user: User }) {
  const userMajor = Degree.find((degree) => degree.value === user.major);
  const userMinor = Degree.find((degree) => degree.value === user.minor);

  if (user.firstName === "" && user.lastName === "") {
    return null;
  }
  return (
    <Link href={`/user/${user.username}`}>
      <div
        className="mt-2 border-2 rounded-b-md"
        style={{
          border: "3px solid",
          borderColor: userMajor ? userMajor.color : "black",
          borderRadius: "10px",
        }}
      >
        {/* <CardHeader> */}
        <div className="flex items-center justify-left m-3">
          <Avatar className="w-16 h-16 mr-6">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-200">
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start leading-loose">
            <div className="mb-2 text-xl">
              {" "}
              {user.firstName} {user.lastName}{" "}
            </div>
            <div className="flex flex-col leading-none">
              {/* <div className="mr-2 text-base">{userMajor?.name}</div>
              {userMinor?.name && user.minor !== "NONE" ? (
                <div className="text-sm">{userMinor?.name}</div>
              ) : null} */}
              <div className="flex flex-row">
                <Badge
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
                {/* <Badge></Badge> */}
              </div>
            </div>
          </div>
        </div>
        {/* </CardHeader> */}
      </div>
    </Link>
  );
}

export default UserCard;
