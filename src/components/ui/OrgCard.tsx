import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Org } from "@prisma/client";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./card";

function OrgCard({ org }: { org: Org }) {
  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{org.name}</CardTitle>
          <Image src={"/TTULogo.png"} alt={org.name} width={75} height={75} />
          {/* TODO: Use the actual org picture when they are available */}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{org.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={`/org/${org.id}`}>
          <Button>View Org</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default OrgCard;
