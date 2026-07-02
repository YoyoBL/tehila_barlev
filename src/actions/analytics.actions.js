"use server";
import "server-only";

import prisma from "@/lib/db";
import { authorize } from "@/lib/authorize";

/**
 * Tracks a site activity event for a specific dress.
 * Valid types: "VIEW", "CONTACT", "SHARE", "FAVORITE"
 */
export async function trackEvent(dressId, type) {
   try {
      // Validate dressId format for MongoDB ObjectId
      if (!/^[0-9a-fA-F]{24}$/.test(dressId)) {
         throw new Error("Invalid dressId format");
      }

      const validTypes = ["VIEW", "CONTACT", "SHARE", "FAVORITE"];
      if (!validTypes.includes(type)) {
         throw new Error("Invalid event type");
      }

      const newEvent = await prisma.activityEvent.create({
         data: {
            dressId,
            type,
         },
      });

      return { success: true, data: { id: newEvent.id } };
   } catch (error) {
      console.error("trackEvent error: ", error.message);
      return { success: false, error: error.message };
   }
}

/**
 * Retrieves aggregate and per-dress analytics data filtered by date range.
 * Requires user authentication.
 */
export async function getAnalyticsData(startDateStr, endDateStr) {
   try {
      await authorize();

      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);
      // Make the end date inclusive of the entire day
      endDate.setHours(23, 59, 59, 999);

      // Fetch all activity events within the date range
      const events = await prisma.activityEvent.findMany({
         where: {
            createdAt: {
               gte: startDate,
               lte: endDate,
            },
         },
      });

      // Fetch all dresses to display complete catalog insights (even 0-view items)
      const dresses = await prisma.dress.findMany({
         select: {
            id: true,
            title: true,
            price: true,
            coverIndex: true,
            images: true,
         },
      });

      // Initialize results mapping
      const dressMap = {};
      for (const dress of dresses) {
         dressMap[dress.id] = {
            id: dress.id,
            title: dress.title,
            price: dress.price,
            coverIndex: dress.coverIndex,
            images: dress.images,
            views: 0,
            contacts: 0,
            shares: 0,
            favorites: 0,
         };
      }

      let totalViews = 0;
      let totalContacts = 0;
      let totalShares = 0;
      let totalFavorites = 0;

      // Group events by dress and type
      for (const event of events) {
         const { dressId, type } = event;
         if (!dressMap[dressId]) continue; // Skip events for deleted dresses

         if (type === "VIEW") {
            dressMap[dressId].views++;
            totalViews++;
         } else if (type === "CONTACT") {
            dressMap[dressId].contacts++;
            totalContacts++;
         } else if (type === "SHARE") {
            dressMap[dressId].shares++;
            totalShares++;
         } else if (type === "FAVORITE") {
            dressMap[dressId].favorites++;
            totalFavorites++;
         }
      }

      return {
         error: null,
         data: {
            summary: {
               totalViews,
               totalContacts,
               totalShares,
               totalFavorites,
            },
            dresses: Object.values(dressMap),
         },
      };
   } catch (error) {
      console.error("getAnalyticsData error: ", error.message);
      return { error: error.message, data: null };
   }
}
