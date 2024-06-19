import { Button } from "@/components/ui/button";
import { getOrgById } from "@/db/orgs";
import Image from "next/image";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export default async function Org({ params }: { params: { id: string } }) {
  const org = await getOrgById(params.id);

  if (!org) return <div>Organization not found</div>;

  let orgInitials = org.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex flex-col items-center space-y-4 font-bold">
        <Avatar>
          <AvatarImage src={org.orgPicture ?? ""} alt="" />
          <AvatarFallback>{orgInitials}</AvatarFallback>
        </Avatar>

        <span className="text-xl text-gray-800">{org.name}</span>
        <span className="text-md text-gray-600 text-justify">
          {org.description}
        </span>
        <span className="text-lg text-gray-800 text-center">
          {org.name}s Board Members
        </span>

        <div className="w-full space-y-2 text-center">
          {(
            org.officers as unknown as { position: string; username: string }[]
          ).map(
            (member) =>
              member !== null && (
                <Link key={member.position} href={`/user/${member.username}`}>
                  <div className="text-sm text-gray-600">
                    <span>{member.position}</span>: <br />
                    <span className="font-semibold">{member.username}</span>
                  </div>
                </Link>
              )
          )}
        </div>

        <Button className="mt-4 font-bold py-2 px-4 rounded">
          Ask to join
        </Button>
      </div>
    </div>
  );
}
