import UserCard from "@/components/pages/leaderboard/UserCard";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { getOrgById } from "@/db/orgs";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";

interface Officer {
  username: string;
  position: string;
}

function isLightColor(color: string) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

export default async function Org({ params }: { params: { id: string } }) {
  const org = await getOrgById(params.id);

  if (!org) return <div>Organization not found</div>;

  const isLight = org.color ? isLightColor(org.color) : false;

  return (
    <div className="flex flex-col items-center mt-8">
      <Avatar className="w-24 h-24 rounded-none">
        <AvatarImage
          className="w-full h-full rounded-3xl"
          src={org.orgPicture ?? ""}
          alt=""
        />
        <AvatarFallback className="w-full h-full bg-gray-300 rounded-3xl"></AvatarFallback>
      </Avatar>

      <span className="mt-2 text-2xl">{org.name}</span>
      <span className="text-sm text-gray-500">
        Established: {formatInTimeZone(org.createdAt, "America/Costa_Rica", "MMM do, yyyy")}
      </span>

      <div className="mt-4 flex flex-wrap gap-x-2 gap-y-4 justify-center text-center">
        {(org.officers as unknown as Officer[]).map((member, index) => (
          <Link
            key={index}
            href={`/user/${member.username}`}
            className="min-w-[calc(33.33%-1rem)]"
          >
            <div className="text-xs text-black-800">
              <span className="block text-[10px]">{member.position}</span>
              <div
                className="rounded-full px-2 py-1 mt-1 inline-flex items-center justify-center"
                style={{ backgroundColor: org.color ?? "gray", color: "#fff" }}
              >
                <span
                  className="block font-semibold text-[10px]"
                  style={{ color: isLight ? "gray" : "#fff" }}
                >
                  @{member.username}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-justify">{org.description}</p>

      <div className="flex flex-col gap-y-2 w-full mt-4 pb-10">
        <span>Members</span>
        {org.members.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
