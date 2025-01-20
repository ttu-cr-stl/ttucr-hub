import { createUser, getUserByUsername } from "@/db/users";
import { NavPath } from "@/lib/types";
import { extractUsername, isTTUEmail } from "@/lib/utils";
import {
  LinkedAccountWithMetadata,
  User,
} from "@privy-io/react-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PrivyLoginUser {
  user: User;
  isNewUser: boolean;
  wasAlreadyAuthenticated: boolean;
  loginAccount: LinkedAccountWithMetadata | null;
}

export const handleLoginComplete = async (
  loginData: PrivyLoginUser,
  router: AppRouterInstance,
  onError?: (error: any) => void
) => {
  console.log("Login completed, checking email...");

  try {
    if (isTTUEmail(loginData.user.email?.address!)) {
      const username = extractUsername(loginData.user.email?.address!);
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
  } catch (error) {
    console.error("Login error:", error);
    onError?.(error);
  }
};
