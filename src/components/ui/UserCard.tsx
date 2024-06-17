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

function UserCard({ user }: { user: User }) {
  const userMajor = Degree.find((degree) => degree.value === user.major);
  const userMinor = Degree.find((degree) => degree.value === user.minor);

  if (user.firstName === "" && user.lastName === "") {
    return null;
  }
  return (
    <Link href={`/user/${user.username}`}>
      <Card className="mt-2 border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="leading-relaxed">
              {user.firstName} {user.lastName}
            </CardTitle>
            <Avatar className="w-24 h-24 ml-6">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="flex items-centers">
          <Badge
            className="w-24 h-10 flex items-center justify-center text-center border-2 mt-[-10px] font-semibold"
            // variant="outline"
            style={{
              backgroundColor: userMajor ? userMajor.color : "pink",
            }}
          >
            {userMajor?.name}
          </Badge>
          {userMinor?.name && user.minor !== "NONE" ? (
            <Badge
              className="w-24 h-10 flex items-center justify-center text-center border-2 mt-[-10px] ml-5"
              variant="outline"
              style={{ borderColor: userMinor ? userMinor.color : "pink" }}
            >
              {userMinor?.name}
            </Badge>
          ) : null}
        </CardContent>
        <CardFooter
          className="rounded-b-md"
          style={{
            height: "4px",
            backgroundColor: userMajor ? userMajor.color : "pink",
          }}
        />
      </Card>
    </Link>
  );
}

export default UserCard;
