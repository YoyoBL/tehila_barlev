"use client";

import { TEXTS } from "@/lib/texts";
import ModalConfirm from "../common/ModalClient";
import { deleteDress } from "@/actions/dress.actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import { useState } from "react";

const DeleteDressBtn = ({ dressData }) => {
   const modalId = "confirm-delete";
   const { replace } = useRouter();

   async function handleDeleteDress() {
      try {
         const res = await deleteDress(dressData.id);
         if (res.error) throw new Error(res.error);
         replace(ROUTES.catalog.path);
      } catch (error) {
         console.log(error.message);
      }
   }

   function openModal() {
      const modal = document.getElementById(modalId);
      modal.showModal();
   }

   return (
      <>
         <button
            onClick={openModal}
            className="btn btn-circle btn-error absolute top-0 right-0 m-3"
         >
            <i className="bi bi-trash text-xl"></i>
         </button>

         <ModalConfirm
            modalId={modalId}
            message={TEXTS.messages.delete + dressData.title + "?"}
            onConfirm={handleDeleteDress}
         />
      </>
   );
};

export default DeleteDressBtn;
