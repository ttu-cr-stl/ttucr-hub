'use client'
import { cn } from "@/lib/utils/cn";
import { NavPath } from "@/lib/utils/consts";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FC, ReactNode } from 'react';
import { BarChart, CreditCard, Home, Search, Settings } from 'react-feather';


interface NavBarProps {
  
}
const NavBar: FC<NavBarProps> = ({  }) => {

    const activePath = usePathname();

    return (
        <div className={'absolute bottom-0 left-0 w-screen h-16 border-t flex items-center justify-evenly z-10'}>
            <NavIcon pathname={NavPath.HOME} activePath={activePath}>
                <Home />
            </NavIcon>

            <NavIcon pathname={NavPath.LEADERBOARD} activePath={activePath}>
                <BarChart className=' -scale-x-100' />
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
    )
}

const NavIcon: FC<{ children: ReactNode, pathname: NavPath, activePath: string }> = ({ children, pathname, activePath }) => {

    return (
      <Link href={pathname}>
        <div
          className={cn(
          activePath.match(/\/[^\/]*/)![0] == pathname && "bg-primary/20",
            "p-2 rounded-xl"
          )}
        >
          {children}
        </div>
      </Link>
    );
}

export default NavBar;