"use client";

import { contactAboutDress } from "@/actions/dress.actions";
import { TEXTS } from "@/lib/texts";
import { usePathname } from "next/navigation";

const AskAboutDressBtn = () => {
   const dressPath = usePathname();
   return (
      <button
         onClick={() => contactAboutDress(dressPath)}
         className="btn btn-lg btn-primary flex-1 text-xl"
      >
         <i className="bi bi-whatsapp text-3xl"></i>
         {TEXTS.common.askAboutDress}
      </button>
   );
};

export default AskAboutDressBtn;
