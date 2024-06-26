import { Activity } from "@prisma/client";
import { format, formatDistance } from "date-fns";
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
import Link from "next/link";

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>{activity.name}</CardTitle>
        <CardDescription className="flex items-center space-x-2">
          <span>{format(activity.startTime, "dd/mm/yyyy")}</span>
          <Badge>{formatDistance(activity.startTime, activity.endTime)}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-20">
        <p className="font-thin">{activity.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="">registered</div>
        <Link href={`/activity/${activity.id}`}>
          <Button>Register</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
