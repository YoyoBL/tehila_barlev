import CatalogProviders from "@/components/catalog/CatlogProviders";
import BadgesFilters from "@/components/catalog/badgesFilters";
import DressesList from "@/components/catalog/dressesList";
import PageTitle from "@/components/common/pageTitle";
import { ROUTES } from "@/lib/constants";
import { getAllDresses } from "@/lib/dressLib";
import { METADATA } from "@/lib/texts";

export const metadata = METADATA.catalog;

const CatalogPage = async () => {
   const dresses = await getAllDresses();
   return (
      <section className="h-full py-3 px-5 flex flex-col gap-2">
         <CatalogProviders>
            <PageTitle title={ROUTES.catalog.title} />
            <BadgesFilters />
            <DressesList dresses={dresses} />
         </CatalogProviders>
      </section>
   );
};

export default CatalogPage;
