"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

const AdminCrudBtns = ({ dressData }) => {
   const session = useSession();
   const isAdmin = session?.status === "authenticated";
   if (!isAdmin) return null;
   return (
      <div 
         onClick={(e) => e.stopPropagation()}
         className="absolute top-2 left-2 btn btn-circle btn-sm btn-accent shadow-md z-10"
      >
         <Link href={ROUTES.newDress.path + `?edit=${dressData.id}`}>
            <i className="bi bi-pencil text-base"></i>
         </Link>
      </div>
   );
};

export default AdminCrudBtns;
