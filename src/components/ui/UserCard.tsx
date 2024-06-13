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
  const userDegree = Degree.find((degree) => degree.value === user.major);

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
            <Avatar className="w-35 h-35 ml-6">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>
          <Badge
            className="w-20 h-10 flex items-center justify-center text-center border-2 mt-[-10px]"
            // variant="outline"
            style={{ backgroundColor: userDegree ? userDegree.color : "pink" }}
          >
            {user.major}
          </Badge>
        </CardContent>
        <CardFooter />
      </Card>
    </Link>
  );
}

export default UserCard;
