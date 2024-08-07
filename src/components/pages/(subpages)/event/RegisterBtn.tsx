"use client";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { toggleUserToEvent } from "@/db/events";
import { useAuthUser } from "@/lib/providers/authProvider";
import { cn } from "@/lib/utils/cn";
import { FC, useEffect, useState } from "react";
import { Loader } from "react-feather";

interface RegisterBtnProps {
  eventId: string;
  registeredIds: string[];
}

const RegisterBtn: FC<RegisterBtnProps> = ({ eventId, registeredIds }) => {
  const user = useAuthUser();

  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setIsRegistered(registeredIds.includes(user.id));
  }, [user, registeredIds]);

  if (!user || isRegistered === null)
    return <Skeleton className="w-[100px] h-8 rounded-full bg-white" />;

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
        "flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white",
        isRegistered ? "bg-red-500" : "bg-green-500",
        loading && "bg-stone-300"
      )}
    >
      {loading ? (
        <Loader className="animate-spin" size={16} />
      ) : (
        <span className="text-sm">
          {isRegistered ? "Unregister" : "Register"}
        </span>
      )}
    </div>
  );
};

export default RegisterBtn;
