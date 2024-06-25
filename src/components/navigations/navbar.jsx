"use client";
import { ROUTES } from "@/lib/constants";
import { playFairDisplay } from "@/lib/fonts";
import logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AdminBtn from "../adminBtn";
const Navbar = () => {
   const session = useSession();
   const isAdmin = session?.status === "authenticated";
   return (
      <nav className="w-full bg-base-200 border-b-4 border-black shadow">
         <div
            id="logo"
            className="bg-base-100 rounded-b-btn shadow-md text-center py-1 px-6"
         >
            <Link
               href={ROUTES.home.path}
               className={`${playFairDisplay.className} text-2xl`}
            >
               <span className="divider divider-primary ">Tehila Barlev</span>
            </Link>
         </div>

         <div id="menu-links">
            <ul className="flex gap-3 justify-evenly items-center p-3">
               <li>
                  <Link href={ROUTES.whatsapp.path}>
                     <i className="bi bi-whatsapp text-3xl"></i>
                  </Link>
               </li>

               <li>
                  <Link href={ROUTES.catalog.path}>{ROUTES.catalog.title}</Link>
               </li>
               <li>
                  <Link href={ROUTES.about.path}> {ROUTES.about.title} </Link>
               </li>

               {isAdmin && <AdminBtn />}

               <li>
                  <Link href={ROUTES.instagram.path}>
                     <i className="bi bi-instagram text-3xl"></i>
                  </Link>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;
