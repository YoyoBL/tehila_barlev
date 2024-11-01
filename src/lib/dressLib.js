import { cache } from "react";
import prisma from "./db";

export const getDress = cache(async (dressId) => {
   const dress = await prisma.dress.findUnique({
      where: {
         id: dressId,
      },
   });
   return dress;
});

export const getAllDresses = cache(async () => {
   return await prisma.dress.findMany();
});
