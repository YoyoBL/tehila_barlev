"use client";

import { ILS, ROUTES, U_CARE_CDN_BASEURL } from "@/lib/constants";
import { memo } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useFavorites } from "@/contexts/favoritesContext";

const DressCard = memo(({ dressData }) => {
   let {
      images = [],
      title = "כותרת שמלה",
      price = 0,
      sizes = [0, 3, 2],
      coverIndex = 0,
   } = dressData;

   const router = useRouter();
   const path = usePathname();
   const { favDresses, handleFavClick } = useFavorites();

   const coverUuid = images[coverIndex];
   const coverSrc = coverUuid
      ? `${U_CARE_CDN_BASEURL}/${coverUuid}/-/preview/400x720/`
      : null;

   sizes = sizes.map(Number);

   const size = (() => {
      if (!sizes.length) return "0 - 0";
      if (sizes.length === 1) return sizes[0];
      if (sizes.length > 1)
         return `${Math.max(...sizes)} - ${Math.min(...sizes)}`;
   })();

   function onRedirect() {
      if (!path.startsWith(ROUTES.catalog.path)) return null;
      router.push(ROUTES.catalog.path + `/${dressData.id}`);
   }

   return (
      <div className="relative w-full max-w-[200px] shrink-0 cursor-pointer">
         <div
            onClick={onRedirect}
            className="shadow-lg overflow-hidden rounded-2xl"
         >
            {coverUuid ? (
               <Image
                  src={coverSrc}
                  width={400}
                  height={720}
                  alt={"Black Dress"}
                  className="h-[280px] object-cover object-center"
                  priority
               />
            ) : (
               <div className="bg-neutral-500 h-[280px] w-[200px]"></div>
            )}

            <div className="relative">
               <div className="absolute top-0 -translate-y-4 w-full h-5 bg-base-100 rounded-t-box"></div>
               <div className="text-center bg-base-100 p-2 pt-0 w-full rounded-t-2xl ">
                  <h2 className="tracking-tight">{title}</h2>
                  <h3 className="text-base">
                     {price}
                     {ILS}
                  </h3>
                  <p className="text-sm text-neutral-400">{size}</p>
               </div>
            </div>
         </div>
         <div
            onClick={() => handleFavClick(dressData.id)}
            className="bg-primary active:scale-110  size-12 rounded-full grid place-items-center absolute top-0 start-0 -translate-x-1/3 -translate-y-1/3 transition-transform duration-150 "
         >
            {favDresses[dressData.id] ? (
               <i className="bi bi-heart-fill text-2xl"></i>
            ) : (
               <i className="bi bi-heart text-2xl text-primary-content"></i>
            )}
         </div>
      </div>
   );
});
DressCard.displayName = "DressCard";
export default DressCard;
