"use client";

import Image from "next/image";
import { U_CARE_CDN_BASEURL } from "@/lib/constants";
import AdminCrudBtns from "@/components/adminCrudBtns";

const DressCarousel = ({ dressData }) => {
   const total = dressData.images.length;

   const scrollToIndex = (index) => {
      const element = document.getElementById(`desktop-slide-${index}`);
      if (element) {
         element.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
         });
      }
   };

   return (
      <div className="flex-1 flex justify-center relative">
         {/* Mobile Carousel (Swipeable, no active buttons but visual chevrons) */}
         <div className="flex-1 carousel rounded-box md:hidden">
            {dressData.images.map((imageUuid, index) => (
               <div
                  key={imageUuid}
                  className="carousel-item w-full relative"
               >
                  <Image
                     src={U_CARE_CDN_BASEURL + `/${imageUuid}/-/preview/`}
                     fill
                     alt={dressData.title + " " + (index + 1)}
                     className="object-cover"
                     priority
                  />
               </div>
            ))}
            {total > 1 && (
               <>
                  <div className="absolute top-1/2 -end-5 text-2xl text-primary">
                     <i className="bi bi-chevron-left"></i>
                  </div>
                  <div className="absolute top-1/2 -start-5 text-2xl text-primary">
                     <i className="bi bi-chevron-right"></i>
                  </div>
               </>
            )}
            <AdminCrudBtns dressData={dressData} />
         </div>

         {/* Desktop Carousel (With programmatic scroll-into-view buttons) */}
         <div className="carousel w-full max-w-xl hidden md:flex rounded-xl">
            {dressData.images.map((imageUuid, index) => (
               <div
                  key={imageUuid}
                  id={`desktop-slide-${index}`}
                  className="carousel-item relative w-full"
               >
                  <Image
                     src={U_CARE_CDN_BASEURL + `/${imageUuid}/-/preview/`}
                     fill
                     alt={dressData.title + " " + (index + 1)}
                     className="object-cover"
                     priority
                  />
                  {total > 1 && (
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
                        <button
                           type="button"
                           onClick={() => {
                              const prevIndex = index === 0 ? total - 1 : index - 1;
                              scrollToIndex(prevIndex);
                           }}
                           className="btn btn-circle"
                        >
                           ❮
                        </button>
                        <button
                           type="button"
                           onClick={() => {
                              const nextIndex = index === total - 1 ? 0 : index + 1;
                              scrollToIndex(nextIndex);
                           }}
                           className="btn btn-circle"
                        >
                           ❯
                        </button>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};

export default DressCarousel;
