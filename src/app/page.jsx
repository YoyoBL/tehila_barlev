import { pinyon, playFairDisplay } from "@/lib/fonts";
import cover from "@/images/Cover.jpg";
import Link from "next/link";
import { ROUTES } from "../lib/constants";
import { METADATA } from "@/lib/texts";

export const metadata = METADATA.homePage;

function App() {
   return (
      <section
         className="h-full flex flex-col relative w-full overflow-hidden"
         style={{
            backgroundImage: `url(${cover.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         <h1 className="sr-only">תהילה בר-לב - סטודיו לשמלות כלה וערב להשכרה</h1>
         {/* Mobile View: Cozy bottom glass drawer */}
         <div className="mt-auto w-full bg-white/45 backdrop-blur-lg border-t border-white/25 shadow-2xl rounded-t-[2.5rem] py-6 px-6 flex flex-col gap-2 items-center text-center transition-all duration-300 hover:bg-white/55 md:hidden">
            <h2 className={`${playFairDisplay.className} text-4xl font-semibold tracking-wide text-neutral-800 uppercase`}>
               New Collection
            </h2>
            <span className={`${pinyon.className} text-5xl text-primary font-medium -mt-1`}>
               {new Date().getFullYear()}
            </span>
            <p className="text-sm font-light text-neutral-500 tracking-wider -mt-1">
               שמלות ערב צנועות להשכרה מאת המעצבת תהילה בר-לב
            </p>
            <Link
               href={ROUTES.catalog.path}
               className="btn btn-primary mt-2 px-12 py-3 h-auto min-h-0 text-xl font-medium rounded-full tracking-wide shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-95 w-full max-w-[280px]"
            >
               לשמלות
            </Link>
         </div>

         {/* Desktop/Tablet View: Split Asymmetric Magazine Layout */}
         <div className="hidden md:flex absolute bottom-16 start-0 end-0 justify-between items-end w-full px-16 lg:px-24 select-none animate-fade-in gap-8">
            {/* Left Side: Sub-text and Button (aligned to start/left, renders on the right side of the screen in RTL) */}
            <div className="flex flex-col items-start text-start max-w-md relative pb-2 pl-4">
               <h3 className="font-bold text-2xl lg:text-3xl text-neutral-900 leading-tight">
                  שמלות ערב צנועות להשכרה
               </h3>
               <p className="text-base lg:text-lg font-light text-neutral-600 mt-2 mb-8">
                  מאת המעצבת תהילה בר-לב
               </p>
               
               <Link
                  href={ROUTES.catalog.path}
                  className="bg-neutral-900 text-white border border-neutral-900 hover:bg-transparent hover:text-neutral-900 px-12 py-4 text-lg font-medium tracking-widest transition-all duration-300 hover:shadow-lg active:scale-95"
               >
                  לשמלות
               </Link>
            </div>

            {/* Right Side: Title and Year (aligned to end/right) */}
            <div className="flex flex-col items-end text-end relative pr-4">
               <h2 className={`${playFairDisplay.className} text-4xl lg:text-6xl font-extralight tracking-widest text-neutral-900 uppercase leading-none`}>
                  New <br />
                  Collection
               </h2>
            </div>
         </div>
      </section>
   );
}

export default App;
