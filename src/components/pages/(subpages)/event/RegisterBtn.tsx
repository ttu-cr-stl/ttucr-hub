"use client";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import { toggleUserToEvent } from "@/db/events";
import { createUser } from "@/db/users";
import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next-nprogress-bar";
import { FC, useEffect, useState } from "react";
import { Loader } from "react-feather";

interface SignUpBtnProps {
  eventId: string;
  signedUpIds: string[];
}

const SignUpBtn: FC<SignUpBtnProps> = ({ eventId, signedUpIds }) => {
  const { user } = useAuthUser();
  const router = useRouter();
  const { ready } = usePrivy();

  const [isSignedUp, setIsSignedUp] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser && isTTUEmail(user.email?.address!)) {
        try {
          // Create user in DB
          await createUser(extractUsername(user.email?.address!));
          router.push(NavPath.ONBOARDING);
        } catch (error) {
          setLoading(false);
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

  if (!user)
    return (
      <button
        disabled={!ready}
        onClick={() => login()}
        className="flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-pointer bg-black"
      >
        <span className="text-sm">Login</span>
      </button>
    );

  if (isSignedUp === null)
    return <Skeleton className="w-[100px] h-8 rounded-full bg-white" />;

  const handleToggle = async () => {
    setLoading(true);

    await toggleUserToEvent(eventId, user.id, isSignedUp)
      .then((signedUp) => {
        setIsSignedUp(signedUp);
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
        "flex items-center justify-center w-[100px] h-8 gap-x-1 rounded-full text-white cursor-pointer",
        isSignedUp ? "bg-red-500" : "bg-green-500",
        loading && "bg-stone-300"
      )}
    >
      {loading ? (
        <Loader className="animate-spin" size={16} />
      ) : (
        <span className="text-sm">
          {isSignedUp ? "Back Out" : "Sign Up"}
        </span>
      )}
    </div>
  );
};

export default SignUpBtn;
