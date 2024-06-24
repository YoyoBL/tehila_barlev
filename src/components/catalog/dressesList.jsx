"use client";

import { FavoritesProvider } from "@/contexts/favoritesContext";
import DressCard from "./dressCard";
import { useDressFilters } from "@/contexts/dressFiltersContext";

const DressesList = ({ dresses }) => {
   const { filters: dressFilters } = useDressFilters();
   return (
      <div className="grid grid-cols-2 gap-4 mt-5">
         <FavoritesProvider>
            {dresses
               .filter((dressData) => {
                  if (!dressFilters.length) return true;
                  return dressFilters.every((filter) =>
                     [...dressData.tags, ...dressData.sizes].includes(filter)
                  );
               })
               .map((dressData) => (
                  <div key={dressData.id} className="relative">
                     <DressCard dressData={dressData} />
                  </div>
               ))}
         </FavoritesProvider>
      </div>
   );
};

export default DressesList;
