"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DressFiltersContext = createContext({
   filters: [],
   onFilterClick: () => {},
});

export const DressFiltersProvider = ({ children }) => {
   const [filters, setFilters] = useState([]);

   function onFilterClick(filter) {
      setFilters((filters) => {
         if (filters.includes(filter))
            return filters.filter(
               (existingFilter) => existingFilter !== filter
            );
         return [...filters, filter];
      });
   }

   return (
      <DressFiltersContext.Provider value={{ filters, onFilterClick }}>
         {children}
      </DressFiltersContext.Provider>
   );
};

export const useDressFilters = () => {
   return useContext(DressFiltersContext);
};
