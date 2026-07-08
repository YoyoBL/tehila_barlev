import { pinyon, playFairDisplay } from "@/lib/fonts";
import cover from "@/images/Cover.jpg";
import Link from "next/link";
import { ROUTES } from "../lib/constants";
import { METADATA } from "@/lib/texts";

export const metadata = METADATA.homePage;

function App() {
   return (
      <section
         className="h-full flex flex-col"
         style={{
            backgroundImage: `url(${cover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         <h1 className="sr-only">תהילה בר-לב - סטודיו לשמלות כלה וערב להשכרה</h1>
         <div className="mt-auto w-full bg-white/45 backdrop-blur-lg border-t border-white/25 shadow-2xl rounded-t-[2.5rem] py-6 px-6 flex flex-col gap-2 items-center text-center transition-all duration-300 hover:bg-white/55">
            <h2 className={`${playFairDisplay.className} text-4xl md:text-5xl font-semibold tracking-wide text-neutral-800 uppercase`}>
               New Collection
            </h2>
            <span className={`${pinyon.className} text-5xl text-primary font-medium -mt-1`}>
               {new Date().getFullYear()}
            </span>
            <p className="text-sm font-light text-neutral-500 tracking-wider -mt-1">
               שמלות כלה וערב בעיצוב אישי
            </p>
            <Link
               href={ROUTES.catalog.path}
               className="btn btn-primary mt-2 px-12 py-3 h-auto min-h-0 text-xl font-medium rounded-full tracking-wide shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-95 w-full max-w-[280px]"
            >
               לשמלות
            </Link>
         </div>
      </section>
   );
}

export default App;
