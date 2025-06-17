// app/sitemap.xml/route.js
"use server";
import prisma from "@/lib/db"; // adjust this path if needed

export async function GET(req) {
   const baseUrl = "https://tehilabarlev.com"; // replace with your domain

   try {
      const dresses = await prisma.dress.findMany({
         select: { id: true },
      });

      const staticPaths = ["", "/about", "/catalog"];

      const dynamicPaths = dresses.map((dress) => `/catalog/${dress.id}`);

      const allPaths = [...staticPaths, ...dynamicPaths];

      const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
     .map(
        (path) => `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
     )
     .join("")}
</urlset>`;

      return new Response(body, {
         headers: {
            "Content-Type": "application/xml",
         },
      });
   } catch (error) {
      console.error("Sitemap generation error:", error);
      return new Response("Failed to generate sitemap", { status: 500 });
   }
}
