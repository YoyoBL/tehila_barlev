import { getAllDresses } from "@/lib/dressLib";
import { ROUTES } from "@/lib/constants";

export default async function sitemap() {
   const baseUrl = "https://tehilabarlev.com";

   // Static pages
   const staticPages = [
      {
         url: baseUrl,
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 1.0,
      },
      {
         url: `${baseUrl}${ROUTES.catalog.path}`,
         lastModified: new Date(),
         changeFrequency: "daily",
         priority: 0.9,
      },
      {
         url: `${baseUrl}${ROUTES.about.path}`,
         lastModified: new Date(),
         changeFrequency: "weekly",
         priority: 0.6,
      },
   ];

   try {
      const dresses = await getAllDresses();
      const dressUrls = dresses.map((dress) => ({
         url: `${baseUrl}${ROUTES.catalog.path}/${dress.id}`,
         lastModified: new Date(dress.updatedAt || new Date()),
         changeFrequency: "weekly",
         priority: 0.7,
      }));

      return [...staticPages, ...dressUrls];
   } catch (error) {
      console.error("Error generating sitemap:", error);
      return staticPages;
   }
}
