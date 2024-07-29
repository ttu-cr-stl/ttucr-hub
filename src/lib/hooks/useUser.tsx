"use client";
import { getUserByUsername, internalUpdateUserByUsername } from "@/db/users";
import { Event, Org, User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { extractUsername } from "../utils";

export const useUser = () => {
  const [user, setUser] = useState<
    (User & { orgs?: Org[]; events?: Event[] }) | null
  >(null);
  const [userLoading, setLoading] = useState(false);
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    if (user) setLoading(false);

    if (privyUser?.email?.address && user === null) {
      getUserByUsername(extractUsername(privyUser.email.address)).then(
        (user) => {
          setUser(user);
          setLoading(false);
        }
      );
    }
  }, [privyUser, setUser, user]);

  const updateUser = (data: Partial<User>) => {
    setLoading(true);
    try {
      if (user) {
        internalUpdateUserByUsername(user.username, data).then((user) => {
          setUser(user);
        });
      }
    } catch {
      console.error("Failed to update user");
    }
    setLoading(false);
  };

  return { user, updateUser, userLoading };
};
