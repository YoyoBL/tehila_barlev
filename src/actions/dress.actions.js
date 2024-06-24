"use server";
import "server-only";

import prisma from "@/lib/db";
import { TEXTS } from "@/lib/texts";
import { redirect } from "next/navigation";
import { deleteMultipleImages, storeImages } from "@/lib/uCareSignature";
import { revalidatePath } from "next/cache";
import { ROUTES } from "@/lib/constants";
import { authorize } from "@/lib/authorize";

export async function addNewDress(formData) {
   try {
      const newDress = await prisma.dress.create({ data: formData });
      const { id, createdAt, images, ...data } = newDress;
      await storeImages(images);
      revalidateCatalogPage();
      return { data, error: null };
   } catch (error) {
      return { error: error.message, data: null };
   }
}

export async function updateDress(dress) {
   const { id: dressId, ...rest } = dress;
   try {
      const updateDress = await prisma.dress.update({
         where: {
            id: dressId,
         },
         data: rest,
      });
      revalidateCatalogPage();
      const { id, createdAt, images, ...data } = updateDress;
      await storeImages(images);

      return { error: null, data };
   } catch (error) {
      console.log("updateDress error: ", error.message);
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

export async function getDress(dressId) {
   try {
      await authorize();
      const dress = await prisma.dress.findUnique({
         where: {
            id: dressId,
         },
      });
      return { error: null, data: dress };
   } catch (error) {
      console.log("getDress error: ", error.message);
      return { error: error.message, data: null };
   }
}

function revalidateCatalogPage() {
   revalidatePath(ROUTES.catalog.path);
}
