"use client";

import { useFavorites } from "@/contexts/favoritesContext";
import DressCard from "./dressCard";
import { useDressFilters } from "@/contexts/dressFiltersContext";

const DressesList = ({ dresses }) => {
   const { filters: dressFilters, filterByFav } = useDressFilters();
   const { favDresses } = useFavorites();

   if (filterByFav) dresses = dresses.filter((dress) => favDresses[dress.id]);
   if (dressFilters.length)
      dresses = dresses.filter((dressData) => {
         if (!dressFilters.length) return true;
         return dressFilters.every((filter) =>
            [...dressData.tags, ...dressData.sizes].includes(filter)
         );
      });
   return (
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 mt-5">
         {dresses
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((dressData) => (
               <div key={dressData.id} className="relative shrink-0">
                  <DressCard dressData={dressData} />
               </div>
            ))}
      </div>
   );
};

export default DressesList;
