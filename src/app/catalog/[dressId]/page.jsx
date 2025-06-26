import AdminCrudBtns from "@/components/adminCrudBtns";
import ShareDressBtn from "@/components/catalog/ShareDressBtn";
import AskAboutDressBtn from "@/components/common/AskAboutDressBtn";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { ILS, U_CARE_CDN_BASEURL } from "@/lib/constants";
import { getAllDresses, getDress } from "@/lib/dressLib";
import Image from "next/image";

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

   const sizes = `${Math.max(...dressData.sizes)} - ${Math.min(
      ...dressData.sizes
   )}`;
   return (
      <SectionWrapper className="h-full justify-center relative">
         <div className="grid grid-cols-3 place-items-center md:w-xl md:mx-auto">
            <h1>{dressData.title}</h1>
            <h2 className="w-full border-l border-r text-center">
               {dressData.price + ILS}
            </h2>
            <h2>{sizes}</h2>
         </div>
         <div className="flex-1 flex justify-center relative">
            <div className="flex-1 carousel rounded-box md:hidden">
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
               <AdminCrudBtns dressData={dressData} />
            </div>

            <div class="carousel w-full max-w-xl hidden md:flex rounded-xl">
               {dressData.images.map((imageUuid, index) => (
                  <div
                     key={imageUuid}
                     id={"slide" + index}
                     className="carousel-item relative w-full"
                  >
                     <Image
                        src={U_CARE_CDN_BASEURL + `/${imageUuid}/-/preview/`}
                        fill
                        alt={dressData.title + " " + (index + 1)}
                        className="object-cover"
                        priority
                     />
                     <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a
                           href={`#slide${
                              index == 0 ? "0" : Number(index) - 1
                           }`}
                           class="btn btn-circle"
                        >
                           ❮
                        </a>
                        <a
                           href={`#slide${Number(index) + 1}`}
                           class="btn btn-circle"
                        >
                           ❯
                        </a>
                     </div>
                  </div>
               ))}
               {/* <img
                     src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                     class="w-full"
                  /> */}
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
