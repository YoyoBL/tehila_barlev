export default function robots() {
   const baseUrl = "https://tehilabarlev.com";
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: ["/admin/", "/api/"], // Exclude private admin pages and API endpoints from indexing
      },
      sitemap: `${baseUrl}/sitemap.xml`,
   };
}
