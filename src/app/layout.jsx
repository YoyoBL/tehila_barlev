import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/components/navigations/navbar";
import { assistant } from "@/lib/fonts";

import { METADATA } from "@/lib/texts";
import { SessionProvider } from "next-auth/react";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
   title: {
      template: `%s | ${METADATA.siteTitle}`,
      default: METADATA.siteTitle,
   },
   description: METADATA.homePage.description,
};

export default async function RootLayout({ children }) {
   return (
      <html lang="he" dir="rtl">
         <GoogleTagManager gtmId="GTM-5BZ9KN4L" />
         <body
            className={`${assistant.className} h-dvh flex flex-col text-xl overflow-auto`}
         >
            <SessionProvider>
               <header>
                  <Navbar />
               </header>
               <main className="container h-full mx-auto">{children}</main>
            </SessionProvider>
         </body>
      </html>
   );
}
