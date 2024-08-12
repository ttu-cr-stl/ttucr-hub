import AvatarCircles from "@/components/magicui/avatar-circles";
import RegisterBtn from "@/components/pages/(subpages)/event/RegisterBtn";
import { Badge } from "@/components/ui/shadcn/badge";
import { getEventByIdWithUserPics } from "@/db/events";
import { EVENT_CATEGORIES } from "@/lib/utils/consts";
import { formatInTimeZone } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";

export default async function Event({ params }: { params: { id: string } }) {
  const event = await getEventByIdWithUserPics(params.id);

  if (!event)
    return (
      <div className="text-red-500 font-bold text-xl p-5">Event not found</div>
    );

  //(position) (display) (align & justify) (width) (height) (margin) (padding) (tailwind-spacing)
  //(animate) (border & rounded) (shadow) (color) (text & font)

  return (
    <div className="w-full overflow-x-visible">
      <div className="relative flex justify-between items-end h-52 -mt-4 -mx-4 p-4 rounded-b-3xl shadow-md shadow-gray-400 overflow-clip">
        <Image
          src={event.coverImg || ""}
          fill
          alt=""
          className="-z-10 absolute top-0 left-0 object-cover bg-sky-400"
        />

        <Link href={`/event/${event.id}/users`}>
          {event.users.length !== 0 && (
            <AvatarCircles
              className="-space-x-6 *:bg-white *:text-black *:shadow-lg"
              numPeople={event.users.length}
              avatarUrls={event.users
                .slice(0, 3)
                .map((user) => user.profilePic || "")}
            />
          )}
        </Link>

        <div className="flex flex-col items-end gap-y-2">
          <div className="flex items-center text-center size-20 rounded-2xl bg-stone-100">
            <h3 className="text-3xl">
              {formatInTimeZone(
                event.startTime,
                "America/Costa_Rica",
                "MMM dd"
              )}
            </h3>
          </div>
          <RegisterBtn
            eventId={event.id}
            registeredIds={event.users.map((u) => u.id)}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col py-4 gap-y-4">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-4xl pb-0.5 font-bold line-clamp-2">
              {event.name}
            </h1>
            <Badge
              style={{
                backgroundColor: EVENT_CATEGORIES.find(
                  (cat) => cat.name === event.category
                )?.color,
              }}
            >
              {event.category}
            </Badge>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="grey"
                className="size-6"
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
              <h2 className="text-gray-500 font-bold">{event.location}</h2>
            </div>
            <div className="flex justify-center items-center px-2 py-1 rounded-2xl bg-gray-300">
              <span className="text-xs leading-none text-center">
                {formatInTimeZone(
                  event.startTime,
                  "America/Costa_Rica",
                  "K:mm aa"
                )}
              </span>
            </div>
          </div>
          <p className="line-clamp-4 leading-snug">{event.description}</p>
          <div className="flex justify-between w-full h-20 rounded-xl shadow-sm shadow-gray-300 bg-white text-gray-500">
            <h4 className="pl-3 pt-3 text-gray-500">Sample message</h4>
            <h4 className="content-end pb-2 pr-3">--{event.organizer}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}