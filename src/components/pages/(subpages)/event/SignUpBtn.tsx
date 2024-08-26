"use client";
import { toggleUserToEvent } from "@/db/events";
import { createUser } from "@/db/users";
import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import confetti from "canvas-confetti";
import { useRouter } from "next-nprogress-bar";
import { FC, useEffect, useState } from "react";

interface SignUpBtnProps {
  eventId: string;
  signedUpIds: string[];
  attendedIds: string[];
  datePassed: boolean;
  userLimit: number | null;
  closed: boolean;
}

const SignUpBtn: FC<SignUpBtnProps> = ({
  eventId,
  signedUpIds,
  attendedIds,
  datePassed,
  userLimit,
  closed,
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
      setIsSignedUp(signedUpIds.includes(user.username));
  }, [user, signedUpIds, isSignedUp]);

  useEffect(() => {
    if (datePassed && attendedIds.includes(user?.username || '')) {
      const button = document.getElementById("attendanceButton");
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = rect.left / window.innerWidth + rect.width / (2 * window.innerWidth);
        const y = rect.top / window.innerHeight + rect.height / (2 * window.innerHeight);

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x, y },
          angle: 110,
        });
      }
    }
  }, [datePassed, attendedIds, user]);

  if (!authenticated)
    return (
      <button
        disabled={!ready}
        onClick={() => login()}
        className="flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-pointer bg-black disabled:bg-stone-300"
      >
        <span className="text-sm">Login</span>
      </button>
    );

  if (datePassed) {
    const attended = attendedIds.includes(user?.username || '');

    return (
      <button
        id="attendanceButton"
        disabled={true}
        className={cn(
          "flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-not-allowed",
          attended ? "bg-green-500" : "bg-red-500"
        )}
      >
        <span className="text-sm">
          {attended ? "Attended!" : "Missed it!"}
        </span>
      </button>
    );
  }

  // New check for user limit and closed status
  if (!datePassed && (closed || (userLimit !== null && signedUpIds.length >= userLimit))) {
    return (
      <button
        disabled={true}
        className="flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-not-allowed bg-gray-500"
      >
        <span className="text-sm">
          {closed ? "Closed" : "Full"}
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
      const result = await toggleUserToEvent(
        eventId,
        user.username,
        isSignedUp
      );
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