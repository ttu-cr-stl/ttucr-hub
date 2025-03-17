import AvatarCircles from "@/components/magicui/avatar-circles";
import SignUpBtn from "@/components/pages/(subpages)/event/SignUpBtn";
import { Badge } from "@/components/ui/badge";
import ExpandableDescription from "@/components/utils/ExpandableDescription";
import { getEventById, getEventByIdWithUserPics } from "@/db/events";
import { EVENT_CATEGORIES } from "@/lib/utils/consts";
import { differenceInDays, isAfter } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 0; // 30 minutes

// Helper function to format duration
const formatDuration = (startTime: Date, endTime?: Date | null) => {
  if (!endTime) return null;
  const days = differenceInDays(endTime, startTime);
  if (days === 0) return null;
  return `${days + 1} days`;
};

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const event = await getEventById(id);

  if (!event) {
    return {
      title: "Event not found",
      description: "Event not found",
    };
  }

  const duration = formatDuration(event.startTime, event.endTime);
  const imageUrl = event.coverImg
    ? `https://yyccawyordfhdjblwusu.supabase.co/storage/v1/object/public/${event.coverImg}?width=800&height=600&quality=75`
    : undefined;

  const description = [
    formatInTimeZone(event.startTime, "America/Costa_Rica", "MMM dd, K:mm aa"),
    duration ? `(${duration})` : null,
    event.location,
    event.description,
  ]
    .filter(Boolean)
    .join(" - ");

  return {
    title: event.name,
    description: description,
    openGraph: {
      title: event.name,
      description: description,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: event.name,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: event.name,
      description: description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export default async function Event({ params }: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const event = await getEventByIdWithUserPics(id);

  if (!event) {
    notFound();
  }

  const duration = formatDuration(event.startTime, event.endTime);

  //(position) (display) (align & justify) (width) (height) (margin) (padding) (tailwind-spacing)
  //(animate) (border & rounded) (shadow) (color) (text & font)

  return (
    <div className="w-full overflow-x-visible">
      <div className="relative flex justify-between items-end min-h-[208px] aspect-[340/208] -mx-4 p-4 rounded-b-3xl shadow-md shadow-gray-400 overflow-clip">
        <Image
          src={event.coverImg || ""}
          fill
          sizes="(max-width: 375px) 100vw, (max-width: 768px) 375px, 800px"
          alt="_"
          className="-z-10 absolute top-0 left-0 object-cover bg-gray-200"
        />

        <div className="flex flex-col items-start gap-y-2">
          {event.userLimit && (
            <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z" />
              </svg>
              {event.EventAttendance.length}/{event.userLimit}
            </div>
          )}
          <Link href={`/event/${event.id}/users`}>
            {event.EventAttendance.length !== 0 && (
              <AvatarCircles
                className="-space-x-6 *:bg-white *:text-black *:shadow-lg"
                numPeople={event.EventAttendance.length}
                avatarUrls={event.EventAttendance.slice(0, 3)
                  .map((ea) => 
                    ea.User.profilePic 
                      ? `https://yyccawyordfhdjblwusu.supabase.co/storage/v1/object/public/${ea.User.profilePic}`
                      : null
                  )
                  .filter((url): url is string => url !== null)
                }
              />
            )}
          </Link>
        </div>

        <div className="flex flex-col items-end gap-y-2">
          <div className="flex flex-col items-center justify-center text-center size-[80px] rounded-2xl bg-stone-100">
            <span className="text-xs -mb-1">
              {formatInTimeZone(event.startTime, "America/Costa_Rica", "EEEE")}
            </span>
            <span className="text-2xl">
              {formatInTimeZone(event.startTime, "America/Costa_Rica", "MMM")}
            </span>
            <span className="text-2xl -mt-1">
              {formatInTimeZone(event.startTime, "America/Costa_Rica", "dd")}
            </span>
          </div>
          <SignUpBtn
            eventId={event.id}
            signedUpIds={event.EventAttendance.map((ea) => ea.User.username)}
            attendedIds={event.EventAttendance.filter((ea) => ea.attended).map(
              (ea) => ea.User.username
            )}
            datePassed={
              event.endTime
                ? isAfter(new Date(), event.endTime)
                : isAfter(new Date(), event.startTime)
            }
            userLimit={event.userLimit}
            closed={event.closed}
          />
        </div>
      </div>

      <div className="flex flex-col pt-4 gap-y-4">
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col gap-y-2">
            <div className="flex items-start">
              <span className="text-2xl font-bold">{event.name}</span>
            </div>
            <div className="flex items-start w-[110%] gap-1">
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
            <div className="mt-1">
              <div className="flex items-center justify-center w-fit px-3 py-1 text-xs font-medium bg-gray-200 text-gray-800 rounded-full">
                <span className="whitespace-nowrap">
                  {formatInTimeZone(
                    event.startTime,
                    "America/Costa_Rica",
                    "h:mm a"
                  )}
                </span>
                {event.endTime && (
                  <>
                    <span className="mx-1">-</span>
                    <span className="whitespace-nowrap">
                      {formatInTimeZone(
                        event.endTime,
                        "America/Costa_Rica",
                        "h:mm a"
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end mt-1 gap-3">
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
            {event.reward > 0 && (
              <Badge className="text-xs font-normal bg-purple-500 hover:bg-purple-500">
                {event.reward}
              </Badge>
            )}
            {duration && (
              <Badge variant="outline" className="text-base">
                {duration}
              </Badge>
            )}
          </div>
        </div>
        <ExpandableDescription description={event.description} />
        <div className="flex flex-col gap-y-2 mt-2">
          {event.messages.length !== 0 ? (
            event.messages
              .slice()
              .reverse()
              .map((message, i) => (
                <div
                  key={i}
                  className="relative flex flex-col w-full rounded-xl shadow-sm shadow-gray-3000 bg-white px-6 py-4"
                >
                  <div dangerouslySetInnerHTML={{ __html: message }} />
                </div>
              ))
          ) : (
            <div className="text-black/25 text-center text-xs">
              No messages yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
