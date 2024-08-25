import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import UserCard from "@/components/pages/leaderboard/UserCard";
import { getOrgById } from "@/db/orgs";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

interface Officer {
  username: string;
  position: string;
}

const Org = async ({ params }: { params: { id: string } }) => {
  const org = await getOrgById(params.id);

  if (!org) return (
    <div className="text-red-500 font-bold text-xl p-5">Organization not found</div>
  );

  return (
    <div className="w-full overflow-x-visible">
      <div className="relative flex justify-end items-end min-h-[208px] aspect-[340/208] -mx-4 p-4 rounded-b-3xl shadow-md shadow-gray-400 overflow-clip">
        <Image
          src={org.orgPicture || "/default-cover.jpg"}
          fill
          sizes="(max-width: 375px) 100vw, (max-width: 768px) 375px, 800px"
          alt="_"
          className="-z-10 absolute top-0 left-0 object-cover bg-gray-200"
        />

        <div className="flex flex-col items-end gap-y-2">
          <div className="flex flex-col items-center justify-center text-center size-[80px] rounded-2xl bg-stone-100">
            <span className="text-xs -mb-1">Established</span>
            <span className="text-2xl">
              {formatInTimeZone(org.createdAt, "America/Costa_Rica", "MMM")}
            </span>
            <span className="text-2xl -mt-1">
              {formatInTimeZone(org.createdAt, "America/Costa_Rica", "yyyy")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col pt-4 gap-y-4">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">{org.name}</h1>
          </div>
        </div>

        <p className="text-sm text-justify">{org.description}</p>

        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Officers</h2>
          <div className="flex flex-wrap gap-4">
            {(org.officers as unknown as Officer[]).map((member, index) => (
              <Link
                key={index}
                href={`/user/${member.username}`}
                className="flex flex-col items-center"
              >
                <Badge
                  className="text-xs font-normal mb-1"
                  style={{ backgroundColor: org.color ?? "gray" }}
                >
                  {member.position}
                </Badge>
                <span className="text-sm font-semibold">
                  @{member.username}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pb-10">
          <h2 className="text-xl font-semibold mb-4">Members</h2>
          <div className="space-y-2">
            {org.members.map((user) => (
              <UserCard key={user.username} user={{...user, orgs: []}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Org;