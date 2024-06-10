import Link from "next/link";
import React, { FC } from "react";
import { ArrowLeft } from "react-feather";
import { Button } from "../ui/shadcn/button";

interface SubPageLayoutProps {
  children: React.ReactNode;
  backHref?: string;
}

const SubPageLayout: FC<SubPageLayoutProps> = ({
  children,
  backHref = "/",
}) => {
  return (
    <div className={"w-full h-full flex flex-col py-4"}>
      <Link href={backHref} className="mb-6">
        <Button>
          <ArrowLeft className="text-lg" />
        </Button>
      </Link>
      {children}
    </div>
  );
};

export default SubPageLayout;
