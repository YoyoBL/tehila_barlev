import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "@/components/navigations/navbar";
import { assistant } from "@/lib/fonts";

import { METADATA } from "@/lib/texts";
import { SessionProvider } from "next-auth/react";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata = {
   metadataBase: new URL("https://tehilabarlev.com"),
   title: {
      template: `%s | ${METADATA.siteTitle}`,
      default: METADATA.siteTitle,
   },
   description: METADATA.homePage.description,
   keywords: [
      "שמלות צנועות",
      "שמלות צנועות להשכרה",
      "שמלות ערב להשכרה",
      "שמלות ערב צנועות",
      "תהילה בר-לב",
      "שמלות לאירועים צנועות",
      "השכרת שמלות ערב באשקלון"
   ],
   alternates: {
      canonical: "./",
   },
   openGraph: {
      type: "website",
      locale: "he_IL",
      url: "https://tehilabarlev.com",
      siteName: METADATA.siteTitle,
      title: METADATA.siteTitle,
      description: METADATA.homePage.description,
      images: [
         {
            url: "/icon.jpg",
            width: 800,
            height: 800,
            alt: METADATA.siteTitle,
         },
      ],
   },
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
               <main className="w-full h-full flex-grow flex flex-col">{children}</main>
            </SessionProvider>
         </body>
      </html>
   );
}
