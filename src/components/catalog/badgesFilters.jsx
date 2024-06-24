"use client";

import { TEXTS } from "@/lib/texts";
import Badge from "../common/badge";
import { useDressFilters } from "@/contexts/dressFiltersContext";

const BadgesFilters = () => {
   const { onFilterClick } = useDressFilters();

   const className =
      "flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar whitespace-nowrap shrink-0";
   return (
      <>
         <div className={className}>
            {TEXTS.tags.map((filter) => (
               <Badge
                  key={filter}
                  title={filter}
                  onChange={() => onFilterClick(filter)}
               />
            ))}
         </div>
         <div className={className}>
            {TEXTS.sizes.map((size) => (
               <Badge
                  key={size}
                  title={size}
                  onChange={() => onFilterClick(size)}
               />
            ))}
         </div>
      </>
   );
};

export default BadgesFilters;
