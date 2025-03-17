import AvatarCircles from "@/components/magicui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EVENT_CATEGORIES } from "@/lib/utils/consts";
import { Event, User } from "@prisma/client";
import { differenceInDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: Event & {
    users?: Pick<User, "profilePic">[];
    reward: number;
  };
  small: boolean;
};

// Helper function to format duration
const formatDuration = (startTime: Date, endTime?: Date | null) => {
  if (!endTime) return null;
  const days = differenceInDays(endTime, startTime);
  if (days === 0) return null;
  return `${days + 1} days`;
};

export const EventCard: React.FC<EventCardProps> = ({ event, small }) => {
  const duration = formatDuration(event.startTime, event.endTime);

  if (small) {
    return (
      <Link href={`/event/${event.id}`}>
        <div className="relative flex flex-row w-full h-24 rounded-2xl shadow-sm shadow-gray-300 bg-white">
          {event.coverImg ? (
            <Image
              src={event.coverImg}
              width={96}
              height={96}
              className="rounded-2xl shadow-md object-cover bg-gray-200"
              alt=" "
            />
          ) : (
            <div className="rounded-2xl shadow-md bg-gray-200 w-24 h-24"></div>
          )}
          <div className="relative flex flex-col w-[calc(100%-96px)] justify-evenly px-2 py-2">
            <div className="absolute top-0 right-2 flex items-center gap-x-1 pr-1 pt-1">
              <span className="text-[10px] font-bold text-gray-500">
                {formatInTimeZone(
                  event.startTime,
                  "America/Costa_Rica",
                  "dd MMM yy"
                )}
              </span>
              {duration && (
                <Badge variant="outline" className="text-[8px] py-0 h-4">
                  {duration}
                </Badge>
              )}
            </div>

            <span className="text-xl font-bold leading-tight line-clamp-1 mt-2">
              {event.name}
            </span>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="grey"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <span className="pl-0.5 text-[10px] font-bold text-gray-500 line-clamp-1">
                {event.location}
              </span>
            </div>

            <span className="my-0.5 text-xs font-medium leading-snug line-clamp-1">
              {event.description}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/event/${event.id}`}>
      <div className="flex flex-col gap-y-1 w-full min-h-[315px] aspect-[340/315] rounded-2xl shadow-sm shadow-gray-300 bg-white hover:shadow-md transition-shadow">
        <div className="relative flex items-end justify-between w-full min-h-[208px] aspect-[340/208] p-3 rounded-2xl shadow-md bg-gray-200 shadow-gray-400 overflow-clip">
          {event.coverImg ? (
            <Image
              src={event.coverImg}
              fill
              sizes="(max-width: 375px) 100vw, (max-width: 768px) 375px, 800px"
              alt="_"
              className="absolute top-0 left-0 aspect-auto object-cover"
            />
          ) : (
            <div className="absolute top-0 left-0 bg-gray-200 w-full h-full"></div>
          )}

          {event.users && event.users.length !== 0 ? (
            <AvatarCircles
              className="-space-x-6 *:bg-white *:text-black *:shadow-lg "
              numPeople={event.users.length}
              avatarUrls={event.users
                .slice(0, 3)
                .map((user) => user.profilePic || null)}
            />
          ) : (
            <div />
          )}

          <div className="flex flex-col items-end z-10 gap-y-1">
            {event.reward > 0 && (
              <Badge className="text-xs font-normal bg-purple-500 hover:bg-purple-500">
                {event.reward} pts
              </Badge>
            )}
            {event.category && (
              <Badge
                className="text-center whitespace-nowrap max-w-[120px]"
                style={{
                  backgroundColor: EVENT_CATEGORIES.find(
                    (cat) => cat.name === event.category
                  )?.color,
                }}
              >
                <span className="whitespace-nowrap">{event.category}</span>
              </Badge>
            )}
            {duration && (
              <Badge variant="outline" className="text-[10px]">
                {duration}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-row items-center w-full">
          <div className="flex flex-col items-center justify-center w-1/3 h-full gap-y-2">
            <span className="text-xs text-center font-normal -mb-2">
              {formatInTimeZone(event.startTime, "America/Costa_Rica", "EEEE")}
            </span>
            <span className="text-2xl text-center font-normal">
              {formatInTimeZone(
                event.startTime,
                "America/Costa_Rica",
                "MMM dd"
              )}
            </span>

            <div className="flex justify-center items-center px-2 py-1 rounded-2xl bg-gray-300">
              <span className="text-xs leading-none text-center font-normal">
                {formatInTimeZone(
                  event.startTime,
                  "America/Costa_Rica",
                  "K:mm aa"
                )}
              </span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-20" />

          <div className="flex flex-col items-left justify-evenly w-2/3 h-full px-3 py-1">
            <div className="flex flex-row test-xs font-bold text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="grey"
                className="size-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <span className="pl-0.5 text-xs font-bold text-gray-500 line-clamp-1">
                {event.location}
              </span>
            </div>

            <span className="text-lg font-bold leading-tight line-clamp-2">
              {event.name}
            </span>

            <p className="text-xs font-medium text-slate-800 line-clamp-2 mb-1">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
