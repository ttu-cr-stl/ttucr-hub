"use client";
import { createUser } from "@/db/users";
import { NavPath } from "@/lib/utils/consts";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Spinner } from "./Spinner";
import { extractUsername, isTTUEmail } from "@/lib/utils";

interface LoginBtnProps {}

const LoginBtn: FC<LoginBtnProps> = ({}) => {
  const { ready, authenticated } = usePrivy();
  const [loading, setLoading] = useState(false);
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);
  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      setLoading(true);
      setPrevAuth(true);

      if (isNewUser && isTTUEmail(user.email?.address!)) {
        try {
          // Create user in DB
          await createUser(extractUsername(user.email?.address!));
          router.push(NavPath.ONBOARDING);
        } catch (error) {
          setLoading(false);
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
    <Button className="w-20" disabled={!ready || authenticated} onClick={login}>
      {(ready && !loading) ? "Login" : <Spinner />}
    </Button>
  );
};

export default LoginBtn;
