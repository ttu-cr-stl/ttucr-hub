import { Event } from "@prisma/client";
import { format, formatDistance } from "date-fns";
import Link from "next/link";
import { Badge } from "./shadcn/badge";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

export function EventCard({ event }: { event: Event }) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span>{format(event.startTime, "dd/mm/yyyy")}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-20">
        <p className="font-thin">{event.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="">registered</div>
        <Link href={`/event/${event.id}`}>
          <Button>Register</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
