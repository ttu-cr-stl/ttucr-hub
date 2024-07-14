import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { getOrgById } from "@/db/orgs";
import { getUserByUsername } from "@/db/users";
import Link from "next/link";
import { format, formatDistance } from "date-fns";

export default async function Org({ params }: { params: { id: string } }) {
  const org = await getOrgById(params.id);
  const user = await getUserByUsername("andysanc");

  console.log(org);
  console.log(user);

  if (!org) return <div>Organization not found</div>;

  let orgInitials = org.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-20 h-20 rounded-none">
        <AvatarImage src={org.orgPicture ?? ""} alt="" />
        <AvatarFallback>{orgInitials}</AvatarFallback>
      </Avatar>

      <span className="mt-1 text-3xl text-gray-800">{org.name}</span>
      <span className="text-sm text-gray-500">Established: {format(org.createdAt, "MMM do, yyyy")}</span>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        {(
          org.officers as unknown as { position: string; username: string }[]
        ).map(
          (member) =>
            member !== null && (
              <Link key={member.position} href={`/user/${member.username}`}>
                <div className="text-sm text-white">
                  <div className="bg-teal-600 rounded-full px-2 py-1">
                    <span className="block">{member.position}</span>
                    <span className="block font-semibold">@{member.username}</span>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>

      <span className="text-md text-gray-600 text-justify">
        {org.description}
      </span>
    </div>
  );
}
