"use server";
import prisma from "../prisma";

export async function getAllOrgs() {
  console.log("fetching all orgs");
  const orgs = await prisma.org.findMany();

  return orgs;
}

export async function getOrgById(id: string) {
  console.log("fetching org by id");
  const org = await prisma.org.findUnique({
    where: {
      id,
    },
  });

  return org;
}