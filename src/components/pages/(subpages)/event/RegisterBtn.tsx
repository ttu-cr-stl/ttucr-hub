"use client";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { toggleUserToEvent } from "@/db/events";
import { useAuthUser } from "@/lib/hooks/useAuthUser";
import { cn } from "@/lib/utils/cn";
import { CircleCheck, CircleX, Loader2 } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface RegisterBtnProps {
  eventId: string;
  registeredIds: string[];
}

const RegisterBtn: FC<RegisterBtnProps> = ({ eventId, registeredIds }) => {
  const user = useAuthUser();

  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setIsRegistered(registeredIds.includes(user.id));
  }, [user, registeredIds]);

  if (!user) return <Skeleton className="w-20 h-8 rounded-lg bg-white" />;

  if (loading)
    return (
      <div className="flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-lg text-white bg-gray-500">
        <Loader2 size={12} className="animate-spin" />
      </div>
    );

  const handleToggle = async () => {
    setLoading(true);

    await toggleUserToEvent(eventId, user.id, isRegistered)
      .then((registered) => {
        setIsRegistered(registered);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Failed to toggle user to event");
      });
  };

  return (
    <div
      onClick={() => handleToggle()}
      className={cn(
        "flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-lg text-white",
        isRegistered ? "bg-red-500" : "bg-green-500"
      )}
    >
      {isRegistered ? <CircleX size={16} /> : <CircleCheck size={16} />}
      <span className="text-sm">
        {isRegistered ? "Unregister" : "Register"}
      </span>
    </div>
  );
};

export default RegisterBtn;
