"use server";
import "server-only";

import prisma from "@/lib/db";
import { TEXTS } from "@/lib/texts";
import { redirect } from "next/navigation";
import { deleteMultipleImages } from "@/lib/uCareSignature";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/constants";

export async function addNewDress(formData) {
   try {
      const res = await prisma.dress.create({ data: formData });
      return { data: res, error: null };
   } catch (error) {
      return { error: error.message, data: null };
   }
}

export async function contactAboutDress(dressPath) {
   const fullDressPath = process.env.BASE_URL + dressPath;
   const text = TEXTS.askAboutDress + fullDressPath;
   const encodedText = encodeURIComponent(text);
   console.log(encodedText);
   const WSLink = `${process.env.WS_LINK}?text=${encodedText}`;
   redirect(WSLink);
}

export async function deleteDress(dressId) {
   try {
      const deleteDress = await prisma.dress.delete({
         where: {
            id: dressId,
         },
      });
      const imagesUuids = deleteDress.images;

      await deleteMultipleImages(imagesUuids);

      revalidatePath(ROUTES.catalog.path);

      return { error: null, data: deleteDress };
   } catch (error) {
      console.log("deleteDress error: ", error.message);
      return { error: error.message, data: null };
   }
}
