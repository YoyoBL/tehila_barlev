"use client";

import { TEXTS } from "@/lib/texts";
import { sendGTMEvent } from "@next/third-parties/google";

const ShareDressBtn = ({ dress }) => {
   const handleShare = async () => {
      if (navigator.share) {
         try {
            await navigator.share({
               title: TEXTS.common.shareTitle,
               text: TEXTS.common.shareTitle,
               url: `/catalog/${dress.id}`,
            });
         } catch (error) {
            console.error("Error sharing content:", error);
         }
      } else {
         console.log("Web Share API is not supported in your browser.");
      }
      sendGTMEvent({ event: "share_dress" });
   };

   return (
      <button
         id="share-dress"
         onClick={handleShare}
         className="btn h-full grid gap-0 font-light btn-sm"
      >
         <i className="bi bi-send shrink text-xl scale-110"></i>
         {TEXTS.common.shareBtn}
      </button>
   );
};

export default ShareDressBtn;
