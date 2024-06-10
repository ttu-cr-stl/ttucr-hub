import { Button } from "@/components/ui/shadcn/button";
import Link from "next/link";
import { ArrowLeft } from "react-feather";

export default function SupPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //check previous route
  const previousRoute = "/";

  return (
    <div className={"w-full h-full flex flex-col py-4"}>
      <Link href={previousRoute} className="mb-6">
        <Button>
          <ArrowLeft className="text-lg" />
        </Button>
      </Link>
      {children}
    </div>
  );
}
