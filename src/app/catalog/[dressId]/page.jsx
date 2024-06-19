import DeleteDressBtn from "@/components/catalog/DeleteDressBtn";
import AskAboutDressBtn from "@/components/common/AskAboutDressBtn";
import Badge from "@/components/common/badge";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { auth } from "@/lib/auth";
import { ILS, ROUTES, U_CARE_CDN_BASEURL } from "@/lib/constants";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const DressPage = async ({ params: { dressId } }) => {
   const session = await auth();
   const dressData = await prisma.dress.findUnique({
      where: {
         id: dressId,
      },
   });

   const sizes = `${Math.max(...dressData.sizes)} - ${Math.min(
      ...dressData.sizes
   )}`;
   return (
      <SectionWrapper className="h-full">
         <div className="grid grid-cols-3 place-items-center">
            <h1>{dressData.title}</h1>
            <h2 className="w-full border-l-2 border-r-2 text-center">
               {dressData.price + ILS}
            </h2>
            <h2>{sizes}</h2>
         </div>
         <div className="w-vw h-full carousel rounded-box relative">
            {dressData.images.map((imageUuid, index) => (
               <div key={imageUuid} className="carousel-item w-[90%]">
                  <Image
                     src={U_CARE_CDN_BASEURL + `/${imageUuid}/-/preview/`}
                     width={3024}
                     height={4032}
                     alt={dressData.title + " " + (index + 1)}
                     className="object-cover"
                  />
               </div>
            ))}
            {session && (
               <>
                  <DeleteDressBtn dressData={dressData} />
                  <div className="absolute top-0 left-0 btn btn-circle btn-accent m-3">
                     <Link href={ROUTES.newDress + `?edit=${dressData.id}`}>
                        <i className="bi bi-pencil text-xl"></i>
                     </Link>
                  </div>
               </>
            )}
         </div>

         <AskAboutDressBtn />
         {/* <div className="mx-auto" id="tags">
            {dressData.tags.map((tag) => (
               <Badge
                  key={tag}
                  title={tag}
                  className="bg-primary text-primary-content "
               />
            ))}
         </div> */}
      </SectionWrapper>
   );
};

export default DressPage;
