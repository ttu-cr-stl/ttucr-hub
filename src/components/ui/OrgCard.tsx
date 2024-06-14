import React from "react";
import { Org } from "@prisma/client";
import * as card from "./card";
import Link from "next/link";
import Image from "next/image";

function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <card.Card className="mt-2">
        <card.CardHeader>
          <div className="flex items-center justify-between">
            <card.CardTitle>{org.name}</card.CardTitle>
            <Image src={"/TTULogo.png"} alt={org.name} width={75} height={75} />
            {/* TODO: Use the actual org picture when they are available */}
          </div>
        </card.CardHeader>
        <card.CardContent>
          <card.CardDescription>{org.description}</card.CardDescription>
        </card.CardContent>
        <card.CardFooter
          className="rounded-br-lg rounded-bl-lg border border-stone-200 P-0"
          style={{ backgroundColor: `${org.color}` }}
        />
      </card.Card>
    </Link>
  );
}

export default OrgCard;
