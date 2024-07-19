import { Org } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./shadcn/button";
import { Card, CardTitle, CardHeader, CardDescription } from "./shadcn/card";

export default function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <Card className="rounded-3xl mb-4">
        <div className="flex">
          {org.orgPicture ? (
            <div id="Image" className="w-32 h-32 rounded-xl shadow-md">
              <Image
                className="rounded-3xl object-cover"
                src={org.orgPicture}
                alt={org.name}
                width={150}
                height={150}
              />
            </div>
          ) : (
            <div id="Placeholder" className="w-32 h-32 bg-neutral-300 rounded-xl shadow-md" />
          )}
          <div id="Content" className="flex flex-col p-3 w-[calc(100%-9rem)] h-32">
            <CardHeader className="m-0 p-0">
              <span id="Category" className="text-sm text-stone-500 overflow-hidden line-clamp-1">
                {org.category ? org.category : "Other"}
              </span>
              <CardTitle className="overflow-hidden line-clamp-2">
                {org.name}
              </CardTitle>
            </CardHeader>
            <div id="Body" className="flex my-auto justify-between items-center">
              <CardDescription className="text-xs text-gray-700 overflow-hidden line-clamp-1">
                {org.description}
              </CardDescription>
              <Button
                style={{ backgroundColor: org.color || 'var(--org-color)' }}
                className="ml-1 items-center rounded-full w-15 h-6 text-xs"
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
