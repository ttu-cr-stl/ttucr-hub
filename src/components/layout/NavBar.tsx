"use client";
import { useAuthUser } from "@/lib/providers/authProvider";
import { NavPath } from "@/lib/types";
import { detectOS, isPWA } from "@/lib/utils";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { BarChart, Home, Settings, Award, TrendingUp, Users } from "react-feather";

interface NavBarProps {}
const NavBar: FC<NavBarProps> = () => {
  const activePath = usePathname();
  const { user } = useAuthUser();

  if (!user) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 w-full md:w-[375px] border-t flex items-center justify-evenly z-10 bg-white",
        isPWA() && detectOS() === "iOS" ? "pb-4 h-20" : "h-16",
        "md:absolute md:w-[375px] md:h-16" // Added for desktop layout
      )}
    >
      <NavIcon pathname={NavPath.HOME} activePath={activePath}>
        <Home />
      </NavIcon>

      <NavIcon pathname={NavPath.LEADERBOARD} activePath={activePath}>
        <Users />
      </NavIcon>

      {/* <NavIcon pathname={NavPath.EXPLORE} activePath={activePath}>
        <Grid />
        <Search />
      </NavIcon> */}

      {/* <NavIcon pathname={NavPath.WALLET} activePath={activePath}>
        <CreditCard />
      </NavIcon> */}

      <NavIcon pathname={NavPath.SETTINGS} activePath={activePath}>
        <Settings />
      </NavIcon>
    </div>
  );
};

const NavIcon: FC<{
  children: ReactNode;
  pathname: NavPath;
  activePath: string;
}> = ({ children, pathname, activePath }) => {
  return (
    <Link href={pathname} prefetch={true}>
      <div className="p-2">
        <div
          className={cn(
            //TODO Find regex that matches for root
            activePath == pathname && "bg-stone-400/20",
            "p-3 rounded-xl"
          )}
        >
          {children}
        </div>
      </div>
    </Link>
  );
};

export default NavBar;