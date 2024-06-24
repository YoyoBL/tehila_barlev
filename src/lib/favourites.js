"use client";

import { LS_FAVORITES_KEY } from "./constants";

export function addDressToFavLS(dressId) {
   const currentFav = JSON.parse(localStorage.getItem(LS_FAVORITES_KEY));
   const withNewFav = { ...currentFav, [dressId]: true };

   localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(withNewFav));
   return withNewFav;
}

export function removeDressFromFavLS(dressId) {
   const favDresses = JSON.parse(localStorage.getItem(LS_FAVORITES_KEY));
   delete favDresses[dressId];
   localStorage.setItem(LS_FAVORITES_KEY, JSON.stringify(favDresses));
   return favDresses;
}

export function getFavDressesLS() {
   return JSON.parse(localStorage.getItem(LS_FAVORITES_KEY)) || {};
}
