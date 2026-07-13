import ShareDressBtn from "@/components/catalog/ShareDressBtn";
import AskAboutDressBtn from "@/components/common/AskAboutDressBtn";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { ILS, U_CARE_CDN_BASEURL, ROUTES } from "@/lib/constants";
import { getAllDresses, getDress } from "@/lib/dressLib";
import TrackView from "@/components/catalog/trackView";
import DressCarousel from "@/components/catalog/DressCarousel";
import Link from "next/link";
import { playFairDisplay } from "@/lib/fonts";

export async function generateStaticParams() {
   const dresses = await getAllDresses();
   const slugs = dresses.map((dress) => ({
      dressId: dress.id,
   }));
   return slugs;
}

export async function generateMetadata({ params: { dressId } }) {
   const dress = await getDress(dressId);
   const sizes = `${Math.min(...dress.sizes)}-${Math.max(...dress.sizes)}`;

   return {
      title: dress.title,
      description: `${dress.title} - שמלת ערב צנועה להשכרה בעיצוב אישי של תהילה בר-לב. זמינה במידות ${sizes} להשכרה בסטודיו באשקלון. תאמי מדידה כעת.`,
      openGraph: {
         images: [
            {
               url: `${U_CARE_CDN_BASEURL}/${
                  dress.images[dress.coverIndex]
               }/-/resize/320x/-/format/jpeg/`, // Must be an absolute URL
               width: 320,
            },
         ],
      },
   };
}

const DressPage = async ({ params: { dressId } }) => {
   const dressData = await getDress(dressId);

   const sizes = `${Math.min(...dressData.sizes)} - ${Math.max(
      ...dressData.sizes
   )}`;
   return (
      <SectionWrapper className="h-full relative pt-2 pb-4 px-4 md:px-8 max-w-6xl mx-auto flex flex-col justify-between overflow-hidden">
         <TrackView dressId={dressId} />

         {/* 1. Header Row (Top): Price | Title | Sizes with soft dividers */}
         {/* Mobile view Header */}
         <div className="w-full border-b border-base-200 pb-0 pt-0.5 relative flex flex-col items-center justify-center gap-1 shrink-0 px-12 md:hidden">
            {/* Back arrow positioned absolute on the far right (start-0) */}
            <div className="absolute start-0 top-1/2 -translate-y-1/2">
               <Link
                  href={ROUTES.catalog.path}
                  className="btn btn-ghost btn-circle text-2xl"
                  aria-label="חזרה לגלריה"
               >
                  <i className="bi bi-arrow-right"></i>
               </Link>
            </div>
            
            {/* Title at the top */}
            <h1 className={`${playFairDisplay.className} text-2xl font-bold tracking-wide text-neutral-800 uppercase text-center`}>
               {dressData.title.toLowerCase()}
            </h1>
            
            {/* Price and sizes under it with a divider between */}
            <div className="flex flex-row items-center gap-3 text-base">
               {/* Right: Price */}
               <span className="font-bold text-neutral-800 shrink-0">
                  {dressData.price + ILS}
               </span>
               
               {/* Divider */}
               <span className="h-4 w-[1px] bg-neutral-200"></span>
               
               {/* Left: Sizes */}
               <span className="text-neutral-500 font-light shrink-0">
                  מידות: {sizes}
               </span>
            </div>
         </div>

         {/* Desktop view Header */}
         <div className="hidden md:flex w-full border-b border-base-200 pb-0 pt-0.5 relative flex-row items-center justify-center gap-6 shrink-0">
            {/* Back arrow positioned absolute on the far right (start-0) */}
            <div className="absolute start-0 top-1/2 -translate-y-1/2">
               <Link
                  href={ROUTES.catalog.path}
                  className="btn btn-ghost btn-circle text-2xl"
                  aria-label="חזרה לגלריה"
               >
                  <i className="bi bi-arrow-right"></i>
               </Link>
            </div>
            
            {/* Right: Price */}
            <span className="text-2xl font-bold text-neutral-800 shrink-0">
               {dressData.price + ILS}
            </span>
            
            {/* Divider */}
            <span className="h-6 w-[1px] bg-neutral-200"></span>
            
            {/* Center: Title */}
            <h1 className={`${playFairDisplay.className} text-3xl font-bold tracking-wide text-neutral-800 uppercase`}>
               {dressData.title.toLowerCase()}
            </h1>
            
            {/* Divider */}
            <span className="h-6 w-[1px] bg-neutral-200"></span>
            
            {/* Left: Sizes */}
            <span className="text-lg text-neutral-500 font-light shrink-0">
               מידות: {sizes}
            </span>
         </div>

         {/* 2. Middle Row: Images showcase getting an entire row */}
         <div className="flex-1 min-h-0 w-full my-2 relative flex flex-col">
            <DressCarousel dressData={dressData} />
         </div>

         {/* 3. Bottom Row: Contact & Share buttons */}
         <div className="flex gap-3 w-full max-w-md mx-auto items-stretch justify-center shrink-0">
            <AskAboutDressBtn />
            <ShareDressBtn dress={dressData} />
         </div>
      </SectionWrapper>
   );
};

export default DressPage;
