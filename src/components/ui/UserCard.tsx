import React from "react";
import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
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
      <Card
        className="mt-2 border-2 rounded-b-md p-1" // Adjust padding here
        style={{
          border: "2px solid",
          borderColor: userMajor ? userMajor.color : "pink",
          borderRadius: "10px",
        }}
      >
        <CardHeader>
          <div className="flex items-center justify-left">
            <Avatar className="w-20 h-20 mr-6">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start leading-loose">
              <CardTitle className="mb-2 text-xl">
                {" "}
                {/* Apply font size here */}
                {user.firstName}
                <div className="font-normal text-xl">{user.lastName}</div>{" "}
                {/* Apply font size here */}
              </CardTitle>
              <div className="flex flex-col leading-none">
                <div className="mr-2 text-base">{userMajor?.name}</div>
                {userMinor?.name && user.minor !== "NONE" ? (
                  <div className="text-sm">{userMinor?.name}</div>
                ) : null}
              </div>
            </div>
          </div>
        </CardHeader>
        {/* <CardFooter
          className="rounded-b-md"
          style={{
            backgroundColor: userMajor ? userMajor.color : "pink",
          }}
        ></CardFooter> */}
      </Card>
    </Link>
  );
}

export default UserCard;
