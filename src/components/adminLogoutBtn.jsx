"use client";

import { signOut } from "next-auth/react";

const AdminLogoutBtn = () => {
   return (
      <button
         onClick={() => signOut({ callbackUrl: "/" })}
         className="btn btn-primary btn-lg btn-block"
      >
         Sign out
      </button>
   );
};

export default AdminLogoutBtn;
