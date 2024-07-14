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

  if (!org) return <div>Organization not found</div>;

  let orgInitials = org.name
    .split(" ")
    .map((word) => word[0])
    .join("");

  const getUserPic = async (username: string) => {
    let user;
    try {
      user = await getUserByUsername(username);
    }
    catch (e) {
      console.error
    }
    return user?.profilePic;
  }

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-20 h-20 rounded-none">
        <AvatarImage src={org.orgPicture ?? ""} alt="" />
        <AvatarFallback>{orgInitials}</AvatarFallback>
      </Avatar>

      <span className="mt-1 text-3xl text-gray-800">{org.name}</span>
      <span className="text-md text-gray-500">Established: {format(org.createdAt, "MMM do, yyyy")}</span>

      {org.officers.length <= 1 && (
        <div className="mt-2 grid grid-cols-1 gap-4 text-center">
        {(
          org.officers as unknown as { position: string; username: string }[]
        ).map(
          async (member) =>
            member !== null && (
              <Link key={member?.position} href={`/user/${member?.username}`}>
                <div className="text-sm text-gray-700">
                  <span className="block">{member?.position}</span>
                  <div className="bg-teal-600 rounded-full px-2 py-1 mt-1 flex items-center ml-1">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={await getUserPic(member?.username) ?? ""} alt={`${member?.username}`} />
                      <AvatarFallback>{member?.username?.charAt(0).toUpperCase() ?? ""}</AvatarFallback>
                    </Avatar>
                    <span className="block font-semibold text-white">@{member?.username}</span>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
      )}

    {org.officers.length > 1 && (
        <div className="mt-2 grid grid-cols-2 gap-4 text-center">
        {(
          org.officers as unknown as { position: string; username: string }[]
        ).map(
          async (member) =>
            member !== null && (
              <Link key={member?.position} href={`/user/${member?.username}`}>
                <div className="text-sm text-gray-700">
                  <span className="block">{member?.position}</span>
                  <div className="bg-teal-600 rounded-full px-2 py-1 mt-1 flex items-center ml-1">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src={await getUserPic(member?.username) ?? ""} alt={`${member?.username}`} />
                      <AvatarFallback>{member?.username?.charAt(0).toUpperCase() ?? ""}</AvatarFallback>
                    </Avatar>
                    <span className="block font-semibold text-white">@{member?.username}</span>
                  </div>
                </div>
              </Link>
            )
        )}
      </div>
    )}
      

      <span className="ml-6 mr-6 mt-6 text-md text-gray-800 text-justify">
        {org.description}
      </span>
    </div>
  );
}
