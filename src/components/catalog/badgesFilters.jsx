"use client";

import { TEXTS } from "@/lib/texts";
import Badge from "../common/badge";
import { useDressFilters } from "@/contexts/dressFiltersContext";

const BadgesFilters = () => {
   const { onFilterClick, onFavFilterClick } = useDressFilters();

   const className =
      "flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar whitespace-nowrap shrink-0";
   return (
      <>
         <div className={className}>
            <Badge
               title={
                  <>
                     <i className="bi bi-heart peer-checked:hidden "></i>
                     <i className="bi bi-heart-fill hidden peer-checked:block "></i>
                  </>
               }
               onChange={onFavFilterClick}
               inputClassName="peer"
            />
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
