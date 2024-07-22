import { Button } from "@/components/ui/shadcn/button";
import { Event } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import Link from "next/link";


export function EventCard({ event, small }: { event: Event, small: boolean }) {
  if (small) {
    return (
      <div className="relative flex flex-row w-full h-24 rounded-2xl shadow-sm shadow-gray-300 bg-white">
        <div className="basis-24 h-full rounded-2xl shadow-md bg-sky-400"></div>
        <div className="flex flex-col items-left space-y-1 w-40 m-2">
          <div className="flex flex-row">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="grey" className="size-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            <h2 className="pl-0.5 text-[11px] font-semibold text-gray-500">
              {event.location}
            </h2>
          </div>

          <h1 className="text-2xl font-bold">
            {event.name}
          </h1>
          
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-md font-medium"> 
              {format(event.startTime, "MMMM dd")}
            </h1>
            
            {/* <h1 className="w-10 h-4 rounded-2xl border border-red-500 ">
              <h2 className=" m-0.5 tracking-tighter text-[8px] text-center text-red-500 font-medium">
                +500 
              </h2>
            </h1> */}
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-60 rounded-2xl shadow-sm shadow-gray-300 bg-white ">

      <div className="relative inset-x-0 top-0 w-full h-36 rounded-2xl shadow-md shadow-gray-400 bg-sky-400">
          <div className="absolute inset-x-0 bottom-0 flex justify-between items-end h-16">
            <h1 className="absolute left-10 bottom-6 w-6 h-6 rounded-2xl shadow-[0_0px_10px_-1px_rgba(0,0,0,0.5)] bg-white "></h1>
            <h1 className="absolute left-8 bottom-6 w-6 h-6 rounded-2xl shadow-[0_0px_10px_-1px_rgba(0,0,0,0.5)] bg-white "></h1>
            <h1 className="absolute left-6 bottom-6 w-6 h-6 rounded-2xl shadow-[0_0px_10px_-1px_rgba(0,0,0,0.5)] bg-white "></h1>
            <h1 className="absolute left-4 bottom-6 w-6 h-6 rounded-2xl shadow-[0_0px_10px_-2px_rgba(0,0,0,0.5)] bg-white "></h1>
            <h1 className="absolute left-3 bottom-2 text-[7px] font-light text-white">and 12 others</h1>

            <Link href={`/event/${event.id}`}>
              <Button className="absolute right-0.5 bottom-0.5 w-12 h-8 m-2.5 rounded-lg bg-white">
                <h1 className="items-center">
                  <svg width="194px" height="194px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="grey" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" transform="rotate(45)" className="size-7">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </g>
                  </svg>
                </h1>
              </Button>
            </Link>

          </div>
          
      </div>

      <div className="relative inset-x-0 bottom-0 h-24 flex flex-row items-center">
        
        <div className="flex flex-col items-center basis-1/3 h-20 pt-4 border-r-2 border-r-black">
          <h1 className="text-2xl text-center font-normal"> 
            {format(event.startTime, "MMM dd")}
          </h1>

          <h2 className="w-14 h-4 rounded-2xl bg-gray-300 text-xs text-center font-normal">
            {format(event.startTime, "K:mm aa")}
          </h2>
        </div>
        
        <div className="flex flex-col items-left basis-2/3 h-20 pl-2">
          <div className="flex flex-row test-xs font-bold text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="grey" className="size-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>

            <h2 className="pl-0.5 text-xs font-semibold text-gray-500">
              {event.location}
            </h2>
          </div>

          <h1 className="text-2xl font-bold">
            {event.name}
          </h1>

          <h2 className="text-xs font-medium text-slate-800">
            {event.description}
          </h2>
        </div>
      </div>
    </div>
  );
}
