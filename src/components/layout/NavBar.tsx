"use client";
import { NavPath } from "@/lib/types";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { BarChart, CreditCard, Home, Search, Settings } from "react-feather";

interface NavBarProps {}
const NavBar: FC<NavBarProps> = ({}) => {
  const activePath = usePathname();

  return (
    <div
      className={
        "fixed bottom-0 left-0 w-full h-16 border-t flex items-center justify-evenly z-10 bg-white"
      }
    >
      <NavIcon pathname={NavPath.HOME} activePath={activePath}>
        <Home />
      </NavIcon>

      <NavIcon pathname={NavPath.LEADERBOARD} activePath={activePath}>
        <BarChart className=" -scale-x-100" />
      </NavIcon>

      <NavIcon pathname={NavPath.EXPLORE} activePath={activePath}>
        <Search />
      </NavIcon>

      <NavIcon pathname={NavPath.WALLET} activePath={activePath}>
        <CreditCard />
      </NavIcon>

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
    <Link href={pathname}>
      <div
        className={cn(
          //TODO Find regex that matches for root
          activePath == pathname && "bg-stone-400/20",
          "p-2 rounded-xl"
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export default NavBar;
