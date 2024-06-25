"use client";

import { DressFiltersProvider } from "@/contexts/dressFiltersContext";
import { FavoritesProvider } from "@/contexts/favoritesContext";

const CatalogProviders = ({ children }) => {
   return (
      <DressFiltersProvider>
         <FavoritesProvider>{children}</FavoritesProvider>
      </DressFiltersProvider>
   );
};

export default CatalogProviders;
