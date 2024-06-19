import BadgesFilters from "@/components/catalog/badgesFilters";
import DressCard from "@/components/catalog/dressCard";
import PageTitle from "@/components/common/pageTitle";
import { ROUTES } from "@/lib/constants";
import prisma from "@/lib/db";
import Link from "next/link";

const CatalogPage = async () => {
   const dresses = await prisma.dress.findMany();
   return (
      <section className="h-full py-3 px-5 flex flex-col gap-2">
         <PageTitle title={"קטלוג שמלות"} />
         <BadgesFilters />
         <div className="grid grid-cols-2 gap-4 mt-5">
            {dresses.map((dressData) => (
               <Link
                  key={dressData.id}
                  href={ROUTES.catalog.path + `/${dressData.id}`}
               >
                  <div className="relative">
                     <DressCard key={dressData.id} dressData={dressData} />
                  </div>
               </Link>
            ))}
         </div>
      </section>
   );
};

export default CatalogPage;
