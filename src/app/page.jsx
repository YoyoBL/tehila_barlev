import { pinyon, playFairDisplay } from "@/lib/fonts";
import cover from "@/images/Cover.jpg";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../lib/constants";
import { METADATA } from "@/lib/texts";

export const metadata = METADATA.homePage;

function App() {
   return (
      <section
         className="h-full"
         style={{
            backgroundImage: `url(${cover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         <div className="glass fixed bottom-0 h-[200px] w-full flex flex-col gap-3 items-center justify-center bg-base-100 rounded-t-box">
            <h2 className={`${playFairDisplay.className} text-4xl`}>
               New Collection
            </h2>
            <h2 className={`${pinyon.className}`}>2025</h2>
            <Link
               href={ROUTES.catalog.path}
               className="btn btn-primary w-[250px] h-16  font-light text-3xl"
            >
               לשמלות
            </Link>
         </div>
      </section>
   );
}

export default App;
