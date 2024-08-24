"use client";
import { toggleUserToEvent } from "@/db/events";
import { createUser } from "@/db/users";
import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next-nprogress-bar";
import { FC, useEffect, useState } from "react";

interface SignUpBtnProps {
  eventId: string;
  signedUpIds: string[];
  attendedIds: string[];
  datePassed: boolean;
}

const SignUpBtn: FC<SignUpBtnProps> = ({
  eventId,
  signedUpIds,
  attendedIds,
  datePassed,
}) => {
  const { user } = useAuthUser();
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  const [isSignedUp, setIsSignedUp] = useState<boolean | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser && isTTUEmail(user.email?.address!)) {
        try {
          // Create user in DB
          await createUser(extractUsername(user.email?.address!));
          router.push(NavPath.ONBOARDING);
        } catch (error) {
          console.log(error);
          throw new Error("Failed to create user");
        }
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (user && isSignedUp === null)
      setIsSignedUp(signedUpIds.includes(user.id));
  }, [user, signedUpIds, isSignedUp]);

  if (!authenticated || !user)
    return (
      <button
        disabled={!ready || !user}
        onClick={() => login()}
        className="flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-pointer bg-black disabled:bg-stone-300"
      >
        <span className="text-sm">Login</span>
      </button>
    );
  if (datePassed) {
    const attended = attendedIds.includes(user.id);
    return (
      <button
        disabled={true}
        className={cn(
          "flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-not-allowed",
          attended ? "bg-green-500" : "bg-stone-300"
        )}
      >
        <span className={cn("text-sm", !attended && "text-stone-500")}>
          {attended ? "Attended" : "Missed it!"}
        </span>
      </button>
    );
  }

  const handleToggle = async () => {
    if (!user || isSignedUp === null) return;

    setIsUpdating(true);
    // Optimistically update the UI
    setIsSignedUp(!isSignedUp);

    try {
      const result = await toggleUserToEvent(eventId, user.id, isSignedUp);
      // If the server response doesn't match our optimistic update, we revert
      if (result !== !isSignedUp) {
        setIsSignedUp(result);
      }
    } catch (error) {
      // If there's an error, revert the optimistic update
      setIsSignedUp(isSignedUp);
      console.log("Failed to toggle user to event");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isUpdating}
      className={cn(
        "flex items-center justify-center w-[100px] h-8 rounded-full text-white cursor-pointer transition-all duration-200",
        isSignedUp
          ? isUpdating
            ? "bg-red-300"
            : "bg-red-500"
          : isUpdating
          ? "bg-green-300"
          : "bg-green-500",
        isUpdating && "cursor-not-allowed"
      )}
    >
      <span className="text-sm">{isSignedUp ? "Back Out" : "Sign Up"}</span>
    </button>
  );
};

export default SignUpBtn;
