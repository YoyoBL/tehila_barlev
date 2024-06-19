import { pinyon, playFairDisplay } from "@/lib/fonts";
import cover from "@/images/Cover.jpg";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "../lib/constants";

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
         {/* <Image
            src={cover}
            width={598}
            height={611}
            alt={"Cover"}
            priority={true}
            className="h-full w-auto object-cover relative -z-10"
         /> */}
         <div className="glass fixed bottom-0 h-[200px] w-full flex flex-col gap-3 items-center justify-center bg-base-100 rounded-t-box">
            <h2 className={`${playFairDisplay.className} text-4xl`}>
               New Collection
            </h2>
            <h2 className={`${pinyon.className}`}>2024</h2>
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
