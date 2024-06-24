"use client";

import {
   addDressToFavLS,
   getFavDressesLS,
   removeDressFromFavLS,
} from "@/lib/favourites";
import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext({
   handleFavClick: () => {},
   favDresses: {},
});

export const FavoritesProvider = ({ children }) => {
   const [favDresses, setFavDresses] = useState({});

   function handleFavClick(dressId) {
      if (favDresses[dressId]) return removeFromFav(dressId);
      addToFav(dressId);
   }

   function addToFav(dressId) {
      const favDressesLS = addDressToFavLS(dressId);
      setFavDresses(favDressesLS);
   }

   function removeFromFav(dressId) {
      const favDressesLS = removeDressFromFavLS(dressId);
      setFavDresses(favDressesLS);
   }

   useEffect(() => {
      setFavDresses(getFavDressesLS());
   }, []);

   return (
      <FavoritesContext.Provider value={{ favDresses, handleFavClick }}>
         {children}
      </FavoritesContext.Provider>
   );
};

export const useFavorites = () => {
   return useContext(FavoritesContext);
};
