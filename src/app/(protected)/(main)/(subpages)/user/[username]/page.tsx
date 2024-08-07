import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import { getUserByUsername } from "@/db/users";
import { Degree } from "@/lib/utils/consts";
import { EventCard } from "@/components/pages/home/EventCard";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) return <div>User not found</div>;
  
  const userMajor = Degree.find((degree) => degree.value === user?.major);
  const userMinor = Degree.find((degree) => degree.value === user?.minor);

  return (
    <div className="flex flex-col gap-y-6 mt-8">
      <div className="flex flex-col items-center justify-center w-full gap-y-2">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.profilePic || ""} />
          <AvatarFallback className="bg-[#D9D9D9]"></AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center">
          <span className="text-2xl leading-snug">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-gray-500 text-sm">@{user.username}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full mt-2 gap-x-4 gap-y-2 text-xs font-light">
          <Badge
            style={{
              backgroundColor: userMajor?.color,
            }}
          >
            {userMajor?.name}
          </Badge>

          {userMinor?.name && user?.minor !== "NONE" ? (
            <Badge
              style={{
                backgroundColor: userMinor?.color,
              }}
            >
              {userMinor?.name}
            </Badge>
          ) : null}

          {user.orgs?.map((org) => (
            <Badge
              key={org.id}
              style={{
                backgroundColor: org.color || undefined,
              }}
            >
              {org.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-2">
        {user.events?.length === 0 ? (
          <div className="w-full text-center">No events attended yet</div>
        ) : (
          user.events
            ?.filter((e) => e.startTime < new Date())
            .map((event) => (
              <div key={event.id} className="w-full">
                <span className="ml-4 text-xs">
                  <span className="font-semibold mr-0.5">@{user.username}</span>
                  <span className="font-light">attended</span>
                </span>
                <EventCard small={true} event={event} />
              </div>
            ))
        )}
      </div>
    </div>
  );
}
