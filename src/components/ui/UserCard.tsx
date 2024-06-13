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
import Image from "next/image";

function UserCard({ user }: { user: User }) {
  return (
    <Link href={`/user/${user.username}`}>
      <Card className="mt-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {user.firstName} {user.lastName}
            </CardTitle>
            <Avatar className="w-24 h-24">
              <AvatarImage src="" />
              <AvatarFallback>
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent>{user.major}</CardContent>
        <CardFooter />
      </Card>
    </Link>
  );
}

export default UserCard;
