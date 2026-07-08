import ShareDressBtn from "@/components/catalog/ShareDressBtn";
import AskAboutDressBtn from "@/components/common/AskAboutDressBtn";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { ILS, U_CARE_CDN_BASEURL, ROUTES } from "@/lib/constants";
import { getAllDresses, getDress } from "@/lib/dressLib";
import TrackView from "@/components/catalog/trackView";
import DressCarousel from "@/components/catalog/DressCarousel";
import Link from "next/link";

export async function generateStaticParams() {
   const dresses = await getAllDresses();
   const slugs = dresses.map((dress) => ({
      dressId: dress.id,
   }));
   return slugs;
}

export async function generateMetadata({ params: { dressId } }) {
   const dress = await getDress(dressId);

   return {
      title: dress.title,
      description: `פרטים נוספים ויצירת קשר אודות ${dress.title}`,
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
      <SectionWrapper className="h-full justify-center relative">
         <div className="w-full md:w-xl md:mx-auto flex justify-start">
            <Link
               href={ROUTES.catalog.path}
               className="btn btn-ghost btn-circle text-2xl"
               aria-label="חזרה לגלריה"
            >
               <i className="bi bi-arrow-right"></i>
            </Link>
         </div>
         <TrackView dressId={dressId} />
         <div className="grid grid-cols-3 place-items-center md:w-xl md:mx-auto capitalize">
            <h1>{dressData.title.toLowerCase()}</h1>
            <h2 className="w-full border-l border-r text-center">
               {dressData.price + ILS}
            </h2>
            <h2>{sizes}</h2>
         </div>
         <DressCarousel dressData={dressData} />
         <div className="flex gap-2">
            <ShareDressBtn dress={dressData} />
            <AskAboutDressBtn />
         </div>
      </SectionWrapper>
   );
};

export default DressPage;
