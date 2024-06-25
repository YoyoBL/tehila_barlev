"use client";

import { TEXTS } from "@/lib/texts";

const ShareDressBtn = ({ dress }) => {
   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: TEXTS.common.shareTitle,
               text: TEXTS.common.shareTitle,
               url: `/catalog/${dress.id}`,
            });
            console.log("Content shared successfully");
         } catch (error) {
            console.error("Error sharing content:", error);
         }
      } else {
         console.log("Web Share API is not supported in your browser.");
      }
   };

   return (
      <button
         onClick={handleShare}
         className="btn h-full grid gap-0 font-light btn-sm"
      >
         <i className="bi bi-send shrink text-xl scale-110"></i>
         {TEXTS.common.shareBtn}
      </button>
   );
};

export default ShareDressBtn;
