"use client";

import { TEXTS } from "@/lib/texts";
import { useRef, useState } from "react";

const ModalConfirm = ({
   message = "Please Confirm",
   confirmBtn = TEXTS.modalConfirm.yes,
   onConfirm = async () => {},
   modalId = "",
}) => {
   const modalRef = useRef();
   const [isSubmitting, setIsSubmitting] = useState(false);

   async function handleConfirm() {
      setIsSubmitting(true);
      await onConfirm();
      setIsSubmitting(false);
   }

   function closeModal() {
      modalRef.current.close();
   }

   return (
      <dialog ref={modalRef} id={modalId} className="modal px-5">
         <div className="modal-box text-center space-y-3">
            <div> {message}</div>
            <div className="grid grid-cols-2 gap-3 justify-center">
               <button
                  onClick={handleConfirm}
                  disabled={isSubmitting}
                  className="btn btn-primary"
               >
                  {isSubmitting ? (
                     <div className="loading loading-dots loading-md"></div>
                  ) : (
                     confirmBtn
                  )}
               </button>
               <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="btn btn-outline"
               >
                  {TEXTS.modalConfirm.cancel}
               </button>
            </div>
         </div>
         {/* close modal on outside click */}
         <span onClick={closeModal} className="modal-backdrop"></span>
      </dialog>
   );
};

export default ModalConfirm;
