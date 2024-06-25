"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminBtn = () => {
   const path = usePathname();
   return (
      !path.startsWith("/admin") && (
         <Link
            href={"/admin"}
            className="btn btn-primary btn-circle fixed z-10 top-0 right-0 m-1 bg-black"
         >
            👑
         </Link>
      )
   );
};

export default AdminBtn;
