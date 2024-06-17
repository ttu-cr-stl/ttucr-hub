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
      <Card className="mt-2 border-2">
        <CardHeader>
          <div className="flex items-center justify-left">
            <Avatar className="w-24 h-24 mr-6">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-start">
              <CardTitle className="leading-relaxed">
                {user.firstName}
                <div className="font-normal">{user.lastName}</div>
              </CardTitle>
              <div className="flex flex-wrap">
                <div className="mr-2 text-lg">{userMajor?.name}</div>
                {userMinor?.name && user.minor !== "NONE" ? (
                  <div className="">{userMinor?.name}</div>
                ) : null}
              </div>
            </div>
            {/* <Link href={`/user/${user.id}`}>
              <Button>View User</Button>
            </Link> */}
          </div>
        </CardHeader>
        {/* <CardContent className="flex items-centers">
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
        </CardContent> */}
        <CardFooter
          className="rounded-b-md"
          style={{
            backgroundColor: userMajor ? userMajor.color : "pink",
          }}
        ></CardFooter>
      </Card>
    </Link>
  );
}

export default UserCard;
