"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminBtn = () => {
   const path = usePathname();
   return (
      !path.startsWith("/admin") && (
         <Link
            href={"/admin"}
            className="btn btn-primary btn-lg fixed bottom-0  m-5 bg-black"
         >
            👑 יפשלי
         </Link>
      )
   );
};

export default AdminBtn;
