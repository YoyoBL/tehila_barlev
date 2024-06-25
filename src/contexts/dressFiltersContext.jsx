"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DressFiltersContext = createContext({
   filters: [],
   onFilterClick: () => {},
   onFavFilterClick: () => {},
   filterByFav: false,
});

export const DressFiltersProvider = ({ children }) => {
   const [filters, setFilters] = useState([]);
   const [filterByFav, setFilterByFav] = useState(false);

   function onFilterClick(filter) {
      setFilters((filters) => {
         if (filters.includes(filter))
            return filters.filter(
               (existingFilter) => existingFilter !== filter
            );
         return [...filters, filter];
      });
   }

   function onFavFilterClick() {
      setFilterByFav((filterByFav) => !filterByFav);
   }

   return (
      <DressFiltersContext.Provider
         value={{ filters, onFilterClick, onFavFilterClick, filterByFav }}
      >
         {children}
      </DressFiltersContext.Provider>
   );
};

export const useDressFilters = () => {
   return useContext(DressFiltersContext);
};
