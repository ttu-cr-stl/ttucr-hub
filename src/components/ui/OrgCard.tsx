import { Org } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./shadcn/button";

export default function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <div id="Card" className="mb-5 border-2 rounded-3xl bg-white h-36">
        <div className="flex">
          <div id="Image" className="w-36 h-36">
            <Image
              className="rounded-3xl object-cover"
              src={org.orgPicture ? org.orgPicture : "/TTULogo.png"}
              alt={org.name}
              width={150}
              height={150}
            />
          </div>
          <div id="Content" className="flex flex-col p-3 w-[calc(100%-9rem)] h-36">
            <div id="Header">
              <span id="Category" className="text-sm text-stone-500 overflow-hidden line-clamp-1">
                {org.category ? org.category : "Other"}
              </span>
              <h2 id="Title" className="text-2xl font-bold overflow-hidden line-clamp-2">
                {org.name}
              </h2>
            </div>
            <div id="Body" className="flex my-auto justify-between items-center">
              <p id="Description" className="text-sm text-gray-700 overflow-hidden line-clamp-2">
                {org.description}
              </p>
              <Button
                className="ml-2 items-center rounded-full bg-[var(--org-color)] w-15 h-6 text-xs"
                style={{ backgroundColor: `${org.color}` }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}