"use server";

import { prisma } from "@/lib/prisma";

export const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id: id, active: true },
  });
  if (!user) return null;
  return user;
};
