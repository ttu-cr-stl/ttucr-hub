import AvatarCircles from "@/components/magicui/avatar-circles";
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";
import { EVENT_CATEGORIES } from "@/lib/utils/consts";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

export function EventCard({
  event,
  small,
}: {
  event: {
    users?: {
      profilePic: string | null;
    }[];
  } & {
    id: string;
    name: string;
    description: string;
    startTime: Date;
    location: string;
    organizer: string;
    coverImg: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    category: string | null;
  };
  small: boolean;
}) {
  if (small) {
    return (
      <Link prefetch={true} href={`/event/${event.id}`}>
        <div className="relative flex flex-row w-full h-24 rounded-2xl shadow-sm shadow-gray-300 bg-white">
          <Image
            src={event.coverImg || ""}
            width={96}
            height={96}
            className="rounded-2xl shadow-md object-cover"
            alt=""
          />
          <div className="flex flex-col items-left space-y-1 w-40 m-2">
            <div className="flex flex-row">
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

              <h2 className="pl-0.5 text-[11px] font-bold text-gray-500">
                {event.location}
              </h2>
            </div>

            <h1 className="text-2xl font-bold">{event.name}</h1>

            <div className="flex flex-row justify-between items-center">
              <h1 className="text-md font-medium">
                {formatInTimeZone(
                  event.startTime,
                  "America/Costa_Rica",
                  "MMMM d yyyy"
                )}
              </h1>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link prefetch={true} href={`/event/${event.id}`}>
      <div className="flex flex-col gap-y-2 w-full h-72 rounded-2xl shadow-sm shadow-gray-300 bg-white ">
        <div
          className="relative flex items-end justify-between w-full h-44 p-3 rounded-2xl shadow-md shadow-gray-400 overflow-clip"
        >
          <Image
            src={event.coverImg || ""}
            fill
            alt=""
            className="absolute top-0 left-0 aspect-auto object-cover"
          />
          <Badge
          className="z-10"
            style={{
              backgroundColor: EVENT_CATEGORIES.find(
                (cat) => cat.name === event.category
              )?.color,
            }}
          >
            {event.category}
          </Badge>
          {event.users && event.users.length !== 0 && (
            <AvatarCircles
              className="-space-x-6 *:bg-white *:text-black *:shadow-lg "
              numPeople={event.users.length}
              avatarUrls={event.users
                .slice(0, 3)
                .map((user) => user.profilePic || "")}
            />
          )}
        </div>

        <div className="flex flex-1 flex-row items-center w-full">
          <div className="flex flex-col items-center justify-center w-1/3 h-full gap-y-2">
            <h1 className="text-2xl text-center font-normal">
              {formatInTimeZone(
                event.startTime,
                "America/Costa_Rica",
                "MMM dd"
              )}
            </h1>

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

          <div className="flex flex-col items-left justify-center w-2/3 h-24 px-3 py-1 gap-y-2">
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

              <h2 className="pl-0.5 text-xs font-bold text-gray-500 -mb-0.5">
                {event.location}
              </h2>
            </div>

            <h1 className="text-xl font-bold leading-tight line-clamp-2">
              {event.name}
            </h1>

            <p className="text-xs font-medium text-slate-800 leading-tight line-clamp-2 pb-0.5">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
