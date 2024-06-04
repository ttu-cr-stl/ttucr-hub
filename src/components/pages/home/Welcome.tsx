"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/hooks/useUser";
import { FC } from "react";

interface WelcomeProps {}

export const Welcome: FC<WelcomeProps> = ({}) => {
  const { user, updateUser, userLoading } = useUser();

  return (
    <>
      <span>Welcome, {user?.address}!</span>

      <Button
        onClick={() => {
          updateUser({ address: "8833" });
        }}
      >
        {userLoading ? "Loading..." : "Change address"}
      </Button>
    </>
  );
};
