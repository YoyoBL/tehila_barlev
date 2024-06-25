"use client";

import { useSession } from "next-auth/react";
import DeleteDressBtn from "./catalog/DeleteDressBtn";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const AdminCrudBtns = ({ dressData }) => {
   const session = useSession();
   const isAdmin = session?.status === "authenticated";
   if (!isAdmin) return null;
   return (
      <>
         <DeleteDressBtn dressData={dressData} />
         <div className="absolute top-0 left-0 btn btn-circle btn-accent m-3">
            <Link href={ROUTES.newDress.path + `?edit=${dressData.id}`}>
               <i className="bi bi-pencil text-xl"></i>
            </Link>
         </div>
      </>
   );
};

export default AdminCrudBtns;
