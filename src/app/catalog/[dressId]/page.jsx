import DeleteDressBtn from "@/components/catalog/DeleteDressBtn";
import ShareDressBtn from "@/components/catalog/ShareDressBtn";
import AskAboutDressBtn from "@/components/common/AskAboutDressBtn";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { auth } from "@/lib/auth";
import { ILS, ROUTES, U_CARE_CDN_BASEURL } from "@/lib/constants";
import { getDress } from "@/lib/dressLib";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params: { dressId } }) {
   const dress = await getDress(dressId);

   return {
      title: dress.title,
      description: `פרטים נוספים וישצירת קשר אודות ${dress.title}`,
      openGraph: {
         images: [
            {
               url: `${U_CARE_CDN_BASEURL}/${
                  dress.images[dress.coverIndex]
               }/=/resize/320x/`, // Must be an absolute URL
               width: 320,
            },
         ],
      },
   };
}

const DressPage = async ({ params: { dressId } }) => {
   const session = await auth();
   const dressData = await getDress(dressId);

   const sizes = `${Math.max(...dressData.sizes)} - ${Math.min(
      ...dressData.sizes
   )}`;
   return (
      <SectionWrapper className="h-full relative">
         <div className="grid grid-cols-3 place-items-center">
            <h1>{dressData.title}</h1>
            <h2 className="w-full border-l-2 border-r-2 text-center">
               {dressData.price + ILS}
            </h2>
            <h2>{sizes}</h2>
         </div>
         <div className="flex-1 flex relative">
            <div className="flex-1 carousel rounded-box">
               {dressData.images.map((imageUuid, index) => (
                  <div
                     key={imageUuid}
                     className="carousel-item w-full relative"
                  >
                     <Image
                        src={U_CARE_CDN_BASEURL + `/${imageUuid}/-/preview/`}
                        fill
                        alt={dressData.title + " " + (index + 1)}
                        className="object-cover"
                        priority
                     />
                  </div>
               ))}
               <div className=" absolute top-1/2 -end-5 text-2xl text-primary">
                  <i className="bi bi-chevron-left"></i>
               </div>
               <div className="absolute top-1/2 -start-5 text-2xl text-primary">
                  <i className="bi bi-chevron-right"></i>
               </div>
               {session && (
                  <>
                     <DeleteDressBtn dressData={dressData} />
                     <div className="absolute top-0 left-0 btn btn-circle btn-accent m-3">
                        <Link
                           href={ROUTES.newDress.path + `?edit=${dressData.id}`}
                        >
                           <i className="bi bi-pencil text-xl"></i>
                        </Link>
                     </div>
                  </>
               )}
            </div>
         </div>
         <div className="flex gap-2">
            <ShareDressBtn dress={dressData} />
            <AskAboutDressBtn />
         </div>
      </SectionWrapper>
   );
};

export default DressPage;
