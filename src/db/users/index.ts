"use server";
import prisma from "@/db/prisma";

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}
