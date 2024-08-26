"use client";

import { EventCard } from "@/components/pages/home/EventCard";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import StucoTitle from "@/components/utils/StucoTitle";
import { UserWithOrgsAndEvents } from "@/lib/types/prismaTypes";
import { Degree } from "@/lib/utils/consts";

interface UserProfileDisplayProps {
  user: UserWithOrgsAndEvents;
  showStucoTitle?: boolean;
}

const UserProfileDisplay = ({
  user,
  showStucoTitle = false,
}: UserProfileDisplayProps) => {
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
          <Badge className="mt-1 text-xs font-normal bg-purple-500 hover:bg-purple-500">
            {user.points} pts
          </Badge>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full mt-2 gap-x-4 gap-y-2 text-xs font-light">
          {showStucoTitle && <StucoTitle username={user.username} />}

          <Badge style={{ backgroundColor: userMajor?.color }}>
            {userMajor?.name}
          </Badge>

          {user?.minor !== "NONE" && user?.minor !== user?.major && (
            <Badge style={{ backgroundColor: userMinor?.color }}>
              {userMinor?.name}
            </Badge>
          )}

          {user.orgs?.map((org) => (
            <Badge
              key={org.id}
              style={{ backgroundColor: org.color || undefined }}
            >
              {org.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-2">
        {user.EventAttendance?.length === 0 ? (
          <div className="w-full text-center">No events attended yet</div>
        ) : (
          <>
            {(() => {
              const now = new Date();
              const futureEvents =
                user.EventAttendance?.filter((event) => event.Event.startTime >= now) || [];
              const pastEvents =
                user.EventAttendance?.filter((event) => 
                  event.Event.startTime < now && event.attended
                ) || [];

              return (
                <>
                  {futureEvents.length > 0 && (
                    <div className="mb-4">
                      <div className="ml-2 mb-2 text-xs">
                        <span className="font-semibold mr-0.5">
                          @{user.username}
                        </span>
                        <span className="font-light">is going to</span>
                      </div>
                      {futureEvents
                        .sort(
                          (a, b) =>
                            a.Event.startTime.getTime() - b.Event.startTime.getTime()
                        )
                        .map((event) => (
                          <div key={event.id} className="w-full mb-2">
                            <EventCard small={true} event={event.Event} />
                          </div>
                        ))}
                    </div>
                  )}
                  {pastEvents.length > 0 && (
                    <div>
                      <div className="ml-2 mb-2 text-xs">
                        <span className="font-semibold mr-0.5">
                          @{user.username}
                        </span>
                        <span className="font-light">went to</span>
                      </div>
                      {pastEvents
                        .sort(
                          (a, b) =>
                            b.Event.startTime.getTime() - a.Event.startTime.getTime()
                        )
                        .map((event) => (
                          <div key={event.id} className="w-full mb-2">
                            <EventCard small={true} event={event.Event} />
                          </div>
                        ))}
                    </div>
                  )}
                </>
              );
            })()}
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfileDisplay;