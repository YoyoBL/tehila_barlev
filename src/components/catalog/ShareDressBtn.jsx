"use client";

import { useState } from "react";
import { TEXTS } from "@/lib/texts";
import { sendGTMEvent } from "@next/third-parties/google";
import { trackEvent } from "@/actions/analytics.actions";

const ShareDressBtn = ({ dress }) => {
   const [copied, setCopied] = useState(false);

   const handleShare = async () => {
      try {
         await trackEvent(dress.id, "SHARE");
      } catch (err) {
         console.error("Failed to track share event:", err);
      }

      const shareUrl = window.location.origin + `/catalog/${dress.id}`;

      if (navigator.share) {
         try {
            await navigator.share({
               title: TEXTS.common.shareTitle,
               text: TEXTS.common.shareTitle,
               url: shareUrl,
            });
         } catch (error) {
            console.error("Error sharing content:", error);
         }
      } else {
         try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
         } catch (err) {
            console.error("Failed to copy link to clipboard:", err);
         }
      }
      sendGTMEvent({ event: "share_dress" });
   };

   return (
      <button
         id="share-dress"
         onClick={handleShare}
         className="btn h-full grid gap-0 font-light btn-sm min-w-[90px]"
      >
         <i className={`bi ${copied ? "bi-check-lg text-success" : "bi-send"} shrink text-xl scale-110`}></i>
         {copied ? "הועתק!" : TEXTS.common.shareBtn}
      </button>
   );
};

export default ShareDressBtn;
