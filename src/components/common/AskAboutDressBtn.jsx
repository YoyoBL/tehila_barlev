"use client";

import { contactAboutDress } from "@/actions/dress.actions";
import { TEXTS } from "@/lib/texts";
import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

const AskAboutDressBtn = () => {
   const dressPath = usePathname();
   function handleClick() {
      sendGTMEvent({ event: "dress_contact" });
      contactAboutDress(dressPath);
   }
   return (
      <button
         id="contact-about-dress"
         onClick={handleClick}
         className="btn btn-lg btn-primary flex-1 text-xl "
      >
         <i className="bi bi-whatsapp text-3xl"></i>
         {TEXTS.common.askAboutDress}
      </button>
   );
};

export default AskAboutDressBtn;
