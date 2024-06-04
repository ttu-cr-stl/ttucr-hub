import { getUserByEmail, updateUserByEmail } from "@/db/users";
import { User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setLoading] = useState(true);
  const { user: privyUser } = usePrivy();

  const updateUser = (data: Partial<User>) => {
    setLoading(true);
    try {
      if (user) {
        updateUserByEmail(user.email, data).then((user) => {
          setUser(user);
        });
      }
    } catch {
      console.error("Failed to update user");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (privyUser?.email?.address && user === null) {
      getUserByEmail(privyUser.email.address).then((user) => {
        setUser(user);
        setLoading(false);
      });
    }
  }, [privyUser, user]);

  return { user, updateUser, userLoading };
};
