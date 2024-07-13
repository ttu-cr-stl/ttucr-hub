import { Org } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";
import { Button } from "./shadcn/button";

function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <Card className="mb-5 border-2 max-w-screen">
        <div className="flex">
          <div className="flex-1">
            <Image
              className="rounded-lg"
              src={"/gray.ico"}
              alt={org.name}
              width={200}
              height={200}
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <span>{org.category}</span>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <div className="flex">
              <CardContent>
                <CardDescription>{org.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="w-15 h-5 text-xs rounded-full"
                  style={{ backgroundColor: `${org.color}` }}
                >
                  join
                </Button>
              </CardFooter>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default OrgCard;
