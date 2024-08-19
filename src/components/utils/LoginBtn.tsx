"use client";
import { createUser } from "@/db/users";
import { NavPath } from "@/lib/types";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next-nprogress-bar";
import { FC, useState } from "react";
import { Button } from "../ui/shadcn/button";
import { Spinner } from "./Spinner";

interface LoginBtnProps {}

const LoginBtn: FC<LoginBtnProps> = ({}) => {
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      setLoading(true);

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
      } else {
        router.push(NavPath.HOME);
      }
    },

    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Button
      className="w-60 bg-gray-900"
      disabled={!ready || authenticated}
      onClick={login}
    >
      {ready && !loading ? "Login" : <Spinner />}
    </Button>
  );
};

export default LoginBtn;
