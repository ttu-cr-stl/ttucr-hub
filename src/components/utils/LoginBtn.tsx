"use client";
import { NavPath } from "@/lib/utils/consts";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { createUser } from "@/db/users";

interface LoginBtnProps {}

const LoginBtn: FC<LoginBtnProps> = ({}) => {
  const { ready, authenticated } = usePrivy();
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);
  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      setPrevAuth(true);

      if (isNewUser && /@ttu\.edu/.test(user.email?.address!)) {
        try {
          // Create user in DB
          await createUser(user.email?.address!);
          router.push(NavPath.ONBOARDING);
        } catch (error) {
          console.log(error);
          setPrevAuth(false);
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
    <>
      {!authenticated && (
        <Button
          disabled={!ready || (ready && authenticated)}
          onClick={login}
        >
          {ready ? "Login" : "Getting Ready..."}
        </Button>
      )}
    </>
  );
};

export default LoginBtn;
