"use client";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
   return (
      <button className="btn btn-primary" onClick={() => signOut()}>
         Signout
      </button>
   );
};

export default SignOutBtn;
