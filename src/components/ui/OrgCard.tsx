import { Org } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/card";

function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <Card className="mb-5 border-2 max-w-screen max-h-40">
        <div className="flex">
          <div className="flex-1">
            <Image
              className="rounded-3xl shadow-sm"
              src={"/gray.ico"}
              alt={org.name}
              width={156}
              height={156}
            />
          </div>
          <div className="flex-1">
            <CardHeader>
              <span className="text-sm text-stone-500">Org Category</span>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <div className="flex">
              <CardContent>
                <CardDescription>
                  <span className="text-sm text-gray-700">Description</span>
                </CardDescription>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  className="w-15 h-5 text-xs rounded-full border-2 border-black"
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
