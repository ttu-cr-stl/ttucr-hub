import React from "react";
import { Org } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "./card";
import { Button } from "./button";
import Link from "next/link";

function OrgCard({ org }: { org: Org }) {
  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex items-center">
          <CardTitle>{org.name}</CardTitle>
          {/* TODO: Add Orgs picture */}
        </div>
      </CardHeader>

      <CardContent>
        <CardDescription>{org.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <Link href={`/org/${org.id}`}>
          <Button style={{ backgroundColor: org.color || undefined }}>Org Page</Button>
          {/* TODO: Make text visible depending on bg color */}
        </Link>
      </CardFooter>
    </Card>
  );
}

export default OrgCard;
