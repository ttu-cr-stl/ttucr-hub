"use client";
import { NavPath } from "@/lib/utils/consts";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";

interface LoginBtnProps {}

const LoginBtn: FC<LoginBtnProps> = ({}) => {
  const { ready, authenticated } = usePrivy();
  const [_, setPrevAuth] = useLocalStorage("prev-authenticated", false);
  const router = useRouter();

  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      setPrevAuth(true);
      router.push(NavPath.HOME);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {!authenticated && (
        <Button onClick={ready ? login : () => {}}>
          {ready ? "Login" : "Loading..."}
        </Button>
      )}
    </>
  );
};

export default LoginBtn;
