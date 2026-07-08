"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { U_CARE_CDN_BASEURL } from "@/lib/constants";
import AdminCrudBtns from "@/components/adminCrudBtns";

const DressCarousel = ({ dressData }) => {
   const total = dressData.images.length;
   const [lightboxImage, setLightboxImage] = useState(null);

   // Close lightbox on Escape key
   useEffect(() => {
      const handleKeyDown = (e) => {
         if (e.key === "Escape") setLightboxImage(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, []);

   return (
      <div className="w-full h-full relative flex flex-col flex-1 min-h-0">
         {/* Mobile Carousel (Swipeable, no active buttons but visual chevrons) */}
         <div className="flex-1 carousel rounded-box md:hidden h-full">
            {dressData.images.map((imageUuid, index) => (
               <div
                  key={imageUuid}
                  className="carousel-item w-full relative h-full cursor-pointer"
                  onClick={() => setLightboxImage(imageUuid)}
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
                  <div className="absolute top-1/2 end-2 text-2xl text-primary pointer-events-none select-none">
                     <i className="bi bi-chevron-left"></i>
                  </div>
                  <div className="absolute top-1/2 start-2 text-2xl text-primary pointer-events-none select-none">
                     <i className="bi bi-chevron-right"></i>
                  </div>
               </>
            )}
            <AdminCrudBtns dressData={dressData} />
         </div>

         {/* Desktop view: Horizontal scrolling gallery occupying an entire row */}
         <div className="hidden md:flex flex-row w-full h-full overflow-x-auto pb-2 scrollbar-thin">
            <div className="flex flex-row gap-4 mx-auto h-full">
               {dressData.images.map((imageUuid, index) => (
                  <div
                     key={imageUuid}
                     className="relative h-full aspect-[3/4] rounded-2xl overflow-hidden shadow-md group shrink-0 cursor-pointer"
                     onClick={() => setLightboxImage(imageUuid)}
                  >
                     <Image
                        src={`${U_CARE_CDN_BASEURL}/${imageUuid}/-/preview/600x900/`}
                        fill
                        alt={`${dressData.title} - תמונה ${index + 1}`}
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="400px"
                        priority={index === 0}
                     />
                  </div>
               ))}
            </div>
         </div>

         {/* Lightbox Modal */}
         {lightboxImage && (
            <div 
               className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
               onClick={() => setLightboxImage(null)}
            >
               {/* Close button */}
               <button 
                  className="absolute top-4 right-4 btn btn-circle btn-ghost text-white text-3xl hover:bg-white/10 z-50"
                  onClick={(e) => {
                     e.stopPropagation();
                     setLightboxImage(null);
                  }}
                  aria-label="סגור תמונה"
               >
                  ✕
               </button>
               
               {/* Fullsize Image wrapper */}
               <div 
                  className="relative flex items-center justify-center cursor-default"
                  onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
               >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                     src={`${U_CARE_CDN_BASEURL}/${lightboxImage}/-/preview/`}
                     alt={dressData.title}
                     className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
                  />
               </div>
            </div>
         )}
      </div>
   );
};

export default DressCarousel;
