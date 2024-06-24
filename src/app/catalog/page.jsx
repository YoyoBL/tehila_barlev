import BadgesFilters from "@/components/catalog/badgesFilters";
import DressCard from "@/components/catalog/dressCard";
import DressesList from "@/components/catalog/dressesList";
import PageTitle from "@/components/common/pageTitle";
import { DressFiltersProvider } from "@/contexts/dressFiltersContext";
import { FavoritesProvider } from "@/contexts/favoritesContext";
import { ROUTES } from "@/lib/constants";
import prisma from "@/lib/db";

const CatalogPage = async () => {
   const dresses = await prisma.dress.findMany();
   return (
      <section className="h-full py-3 px-5 flex flex-col gap-2">
         <DressFiltersProvider>
            <PageTitle title={ROUTES.catalog.title} />
            <BadgesFilters />
            <DressesList dresses={dresses} />
         </DressFiltersProvider>
      </section>
   );
};

export default CatalogPage;
