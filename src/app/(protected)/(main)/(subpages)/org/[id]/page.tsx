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

interface Officer {
  username: string;
  position: string;
}

function isLightColor(color: string) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

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
      console.error(e);
    }
    return user?.profilePic;
  }

  const officersWithPics = await Promise.all(
    (org.officers as unknown as Officer[]).map(async (member) => ({
      ...member,
      profilePic: await getUserPic(member.username),
    }))
  );

  const isLight = org.color ? isLightColor(org.color) : false;

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-24 h-24 rounded-none">
        <AvatarImage className="w-full h-full rounded-3xl" src={org.orgPicture ?? ""} alt="" />
        <AvatarFallback className="w-full h-full bg-gray-300 rounded-3xl"></AvatarFallback>
      </Avatar>

      <span className="mt-1 text-3xl text-black-800">{org.name}</span>
      <span className="text-sm text-gray-500">Established: {format(org.createdAt, "MMM do, yyyy")}</span>

      <div className="mt-2 flex flex-wrap gap-2 justify-center text-center">
        {(
          officersWithPics as unknown as { position: string; username: string; profilePic: string }[]
        ).map((member, index) => (
          <Link key={member.position} href={`/user/${member.username}`} className="min-w-[calc(33.33%-1rem)]">
            <div className="text-xs text-black-800">
              <span className="block text-[10px]">{member.position}</span>
              <div
                className="rounded-full px-2 py-1 mt-1 inline-flex items-center justify-center"
                style={{ backgroundColor: org.color ?? 'gray', color: '#fff' }}
              >
                <Avatar className="w-5 h-5 mr-1">
                  <AvatarImage src={member.profilePic ?? ""} alt={`${member.username}`} />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <span className="block font-semibold text-[10px]" style={{ color: isLight ? 'gray' : '#fff' }}>@{member.username}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <span className="ml-6 mr-6 mt-6 text-xs text-gray-800 text-justify">
        {org.description}
      </span>
    </div>
  );
}
