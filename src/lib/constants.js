import { TEXTS } from "./texts";

export const ROUTES = {
   home: { path: "/", title: TEXTS.routesTitles.home },
   about: { path: "/about", title: TEXTS.routesTitles.about },
   catalog: { path: "/catalog", title: TEXTS.routesTitles.catalog },
   guide: { path: "/guide", title: TEXTS.routesTitles.guide },
   whatsapp: { path: "/whatsapp" },
   instagram: { path: "/instagram" },
   newDress: { path: "/admin/new-dress", title: TEXTS.routesTitles.newDress },
};

const TAGS = [...TEXTS.tags];

export const ILS = "₪";

export const U_CARE_API_BASEURL = "https://api.uploadcare.com";
export const U_CARE_CDN_BASEURL = "https://ucarecdn.com";
export const U_CARE_PUBLIC_KEY = "833cac450f04ae30bf74";
