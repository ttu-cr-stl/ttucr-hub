import { createUser, getUserByUsername } from "@/db/users";
import { useLogin } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Spinner } from "./Spinner";
import { NavPath } from "@/lib/types"; // Ensure NavPath is imported

const LoginBtn: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { login } = useLogin({
    onComplete: async (user) => {
      setLoading(true);
      console.log("Login completed, checking email...");

      if (isTTUEmail(user.email?.address!)) {
        const username = extractUsername(user.email?.address!);
        console.log("TTU email detected, username:", username);
        
        const existingUser = await getUserByUsername(username);
        console.log("Existing user data:", existingUser);

        if (existingUser) {
          console.log("User exists, isNewUser status:", existingUser.isNewUser);
          if (existingUser.isNewUser) {
            console.log("Redirecting to onboarding...");
            router.push(NavPath.ONBOARDING);
          } else {
            console.log("Redirecting to home...");
            router.push(NavPath.HOME);
          }
        } else {
          console.log("Creating new user...");
          await createUser(username);
          console.log("Redirecting to onboarding...");
          router.push(NavPath.ONBOARDING);
        }
      } else {
        console.log("Non-TTU email, redirecting to home...");
        router.push(NavPath.HOME);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      setLoading(false);
    },
  });

  return (
    <Button className="w-60 bg-gray-900" disabled={loading} onClick={login}>
      {loading ? <Spinner /> : "Login"}
    </Button>
  );
};

export default LoginBtn;
