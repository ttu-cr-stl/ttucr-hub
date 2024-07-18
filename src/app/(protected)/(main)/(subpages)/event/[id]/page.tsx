import { Button } from "@/components/ui/shadcn/button";
import { getEventById } from "@/db/events";
import { format, formatDistance } from "date-fns";

export default async function Event({ params }: { params: { id: string } }) {
  const event = await getEventById(params.id);

  if (!event)
    return (
      <div className="text-red-500 font-bold text-xl p-5">Event not found</div>
    );

  //(position) (display) (align & justify) (width) (height) (margin) (padding) (tailwind-spacing) 
  //(animate) (border & rounded) (shadow) (color) (text & font)
  
  return (
    <div className="bg-gray-175" >
      <div className="flex p-4 justify-end h-full w-full rounded-3xl bg-sky-400">
        <div className="size-20 rounded-lg bg-white">
          <h3 className="justify-center pl-3 text-gray-700 text-4xl">
            {format(event.startTime, "MMM dd")}
          </h3>
        </div>
      </div>
      <div >
        <div className="p-4">
          <h1 className="text-4xl font-bold pb-3">
            {event.name}
          </h1>
          <div className = "flex justify-between">
          <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="grey" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        <h2 className="pl-2 text-gray-500 font-bold">
          {event.location}
        </h2>
      </div>
          <div className="flex justify-center content-center h-5 w-20 rounded-2xl bg-gray-300">
            <h2 className="text-sm ">
              {format(event.startTime, "K:mm aa")}
            </h2>
          </div>
          </div>
          <div className="pt-4 pb-4">
            <h4 >
              {event.description}
            </h4>
          </div>
          <div className="p-3 w-full h-20 rounded-xl pt-5 bg-white">
            <h4 className="text-gray-500">
              Smaple message
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
