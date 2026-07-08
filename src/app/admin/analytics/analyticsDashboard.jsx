"use client";

import { useEffect, useState, useTransition } from "react";
import { getAnalyticsData } from "@/actions/analytics.actions";
import { ILS, U_CARE_CDN_BASEURL } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function AnalyticsDashboard() {
   const [preset, setPreset] = useState("30days");
   
   // Set default date range to last 30 days
   const getPastDate = (days) => {
      const d = new Date();
      d.setDate(d.getDate() - days);
      return d.toISOString().split("T")[0];
   };

   const [startDate, setStartDate] = useState(getPastDate(30));
   const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
   const [analytics, setAnalytics] = useState(null);
   const [error, setError] = useState(null);
   const [isPending, startTransition] = useTransition();
   const [sortField, setSortField] = useState("views");
   const [sortAsc, setSortAsc] = useState(false);

   // Handle preset change
   const handlePresetChange = (selectedPreset) => {
      setPreset(selectedPreset);
      const today = new Date().toISOString().split("T")[0];
      setEndDate(today);

      if (selectedPreset === "7days") {
         setStartDate(getPastDate(7));
      } else if (selectedPreset === "30days") {
         setStartDate(getPastDate(30));
      } else if (selectedPreset === "alltime") {
         setStartDate("2025-01-01"); // Far past relative to app release
      }
   };

   // Fetch data
   useEffect(() => {
      const fetchData = () => {
         startTransition(async () => {
            setError(null);
            const res = await getAnalyticsData(startDate, endDate);
            if (res.error) {
               setError(res.error);
            } else {
               setAnalytics(res.data);
            }
         });
      };
      fetchData();
   }, [startDate, endDate]);

   if (error) {
      return (
         <div className="alert alert-error shadow-lg my-5">
            <i className="bi bi-exclamation-triangle text-xl"></i>
            <span>שגיאה בטעינת נתונים: {error}</span>
         </div>
      );
   }

   const summary = analytics?.summary || {
      totalViews: 0,
      totalContacts: 0,
      totalShares: 0,
      totalFavorites: 0,
   };

   const dressesList = analytics?.dresses || [];

   // Sort dresses
   const sortedDresses = [...dressesList].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle custom sorting fields
      if (sortField === "conversion") {
         valA = a.views > 0 ? (a.contacts / a.views) * 100 : 0;
         valB = b.views > 0 ? (b.contacts / b.views) * 100 : 0;
      } else if (sortField === "title") {
         valA = a.title.toLowerCase();
         valB = b.title.toLowerCase();
         return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      } else if (sortField === "price") {
         valA = Number(a.price) || 0;
         valB = Number(b.price) || 0;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
   });

   const toggleSort = (field) => {
      if (sortField === field) {
         setSortAsc(!sortAsc);
      } else {
         setSortField(field);
         setSortAsc(false);
      }
   };

   // Calculate top dresses metrics for visual insights
   const maxViews = Math.max(...dressesList.map((d) => d.views), 1);
   const maxContacts = Math.max(...dressesList.map((d) => d.contacts), 1);

   const topByViews = [...dressesList]
      .sort((a, b) => b.views - a.views)
      .slice(0, 4);

   const topByContacts = [...dressesList]
      .sort((a, b) => b.contacts - a.contacts)
      .slice(0, 4);

   // Conversion rates
   const totalConversion =
      summary.totalViews > 0
         ? ((summary.totalContacts / summary.totalViews) * 100).toFixed(1)
         : "0.0";

   return (
      <div className="space-y-8 pb-10" dir="rtl">
         {/* Filter Section */}
         <div className="card bg-base-100 shadow-xl border border-secondary p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div>
                  <h3 className="font-semibold text-lg text-neutral-content">טווח תאריכים</h3>
                  <p className="text-sm text-neutral-400">בחר טווח להצגת נתוני פעילות באתר</p>
               </div>

               {/* Presets */}
               <div className="join join-horizontal self-center md:self-auto">
                  <button
                     className={`btn btn-sm join-item ${preset === "7days" ? "btn-primary" : "btn-neutral"}`}
                     onClick={() => handlePresetChange("7days")}
                  >
                     שבוע אחרון
                  </button>
                  <button
                     className={`btn btn-sm join-item ${preset === "30days" ? "btn-primary" : "btn-neutral"}`}
                     onClick={() => handlePresetChange("30days")}
                  >
                     30 ימים אחרונים
                  </button>
                  <button
                     className={`btn btn-sm join-item ${preset === "alltime" ? "btn-primary" : "btn-neutral"}`}
                     onClick={() => handlePresetChange("alltime")}
                  >
                     הכל
                  </button>
               </div>

               {/* Custom dates */}
               <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="form-control">
                     <label className="label py-0.5 text-xs text-neutral-400">מתאריך</label>
                     <input
                        type="date"
                        className="input input-bordered input-sm bg-base-200"
                        value={startDate}
                        onChange={(e) => {
                           setPreset("custom");
                           setStartDate(e.target.value);
                        }}
                     />
                  </div>
                  <div className="form-control">
                     <label className="label py-0.5 text-xs text-neutral-400">עד תאריך</label>
                     <input
                        type="date"
                        className="input input-bordered input-sm bg-base-200"
                        value={endDate}
                        onChange={(e) => {
                           setPreset("custom");
                           setEndDate(e.target.value);
                        }}
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Pending Indicator */}
         {isPending && (
            <div className="flex justify-center my-4">
               <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
         )}

         {/* Metrics Summary Cards */}
         <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Views */}
            <div className="card bg-base-100 shadow-lg border-l-4 border-info p-4 flex flex-row items-center gap-4 transition hover:scale-102">
               <div className="size-12 rounded-full bg-info/10 text-info flex items-center justify-center text-2xl shrink-0">
                  <i className="bi bi-eye"></i>
               </div>
               <div>
                  <div className="text-sm text-neutral-400">צפיות בשמלות</div>
                  <div className="text-3xl font-extrabold">{summary.totalViews}</div>
               </div>
            </div>

            {/* Contacts */}
            <div className="card bg-base-100 shadow-lg border-l-4 border-success p-4 flex flex-row items-center gap-4 transition hover:scale-102">
               <div className="size-12 rounded-full bg-success/10 text-success flex items-center justify-center text-2xl shrink-0">
                  <i className="bi bi-whatsapp"></i>
               </div>
               <div>
                  <div className="text-sm text-neutral-400">קליקים לוואטסאפ</div>
                  <div className="text-3xl font-extrabold">{summary.totalContacts}</div>
               </div>
            </div>

            {/* Shares */}
            <div className="card bg-base-100 shadow-lg border-l-4 border-warning p-4 flex flex-row items-center gap-4 transition hover:scale-102">
               <div className="size-12 rounded-full bg-warning/10 text-warning flex items-center justify-center text-2xl shrink-0">
                  <i className="bi bi-send"></i>
               </div>
               <div>
                  <div className="text-sm text-neutral-400">שיתופי שמלה</div>
                  <div className="text-3xl font-extrabold">{summary.totalShares}</div>
               </div>
            </div>

            {/* Favorites */}
            <div className="card bg-base-100 shadow-lg border-l-4 border-error p-4 flex flex-row items-center gap-4 transition hover:scale-102">
               <div className="size-12 rounded-full bg-error/10 text-error flex items-center justify-center text-2xl shrink-0">
                  <i className="bi bi-heart-fill"></i>
               </div>
               <div>
                  <div className="text-sm text-neutral-400">הוספות למועדפים</div>
                  <div className="text-3xl font-extrabold">{summary.totalFavorites}</div>
               </div>
            </div>

            {/* Conversion */}
            <div className="card bg-base-100 shadow-lg border-l-4 border-primary p-4 col-span-2 lg:col-span-1 flex flex-row items-center gap-4 transition hover:scale-102">
               <div className="size-12 rounded-full bg-primary/20 text-primary-content flex items-center justify-center text-2xl shrink-0">
                  <i className="bi bi-percent"></i>
               </div>
               <div>
                  <div className="text-sm text-neutral-400">יחס המרה (קליק/צפייה)</div>
                  <div className="text-3xl font-extrabold text-primary-content">{totalConversion}%</div>
               </div>
            </div>
         </div>

         {/* Visual charts (Custom CSS) */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top by views */}
            <div className="card bg-base-100 shadow-xl border border-secondary p-5 space-y-4">
               <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                  <i className="bi bi-trophy text-warning"></i> השמלות הנצפות ביותר
               </h3>
               <div className="space-y-4">
                  {topByViews.map((dress) => {
                     const pct = maxViews > 0 ? (dress.views / maxViews) * 100 : 0;
                     return (
                        <div key={dress.id} className="space-y-1">
                           <div className="flex justify-between items-center text-sm">
                              <Link href={`/catalog/${dress.id}`} className="font-semibold text-secondary-content hover:underline">
                                 {dress.title}
                              </Link>
                              <span className="text-neutral-400">{dress.views} צפיות</span>
                           </div>
                           <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3">
                              <div
                                 className="bg-info h-3 rounded-full transition-all duration-500"
                                 style={{ width: `${pct}%` }}
                              ></div>
                           </div>
                        </div>
                     );
                  })}
                  {topByViews.length === 0 && (
                     <p className="text-sm text-neutral-400 text-center py-4">אין נתונים זמינים</p>
                  )}
               </div>
            </div>

            {/* Top by WhatsApp */}
            <div className="card bg-base-100 shadow-xl border border-secondary p-5 space-y-4">
               <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2">
                  <i className="bi bi-chat-heart text-success"></i> השמלות המתעניינות ביותר (וואטסאפ)
               </h3>
               <div className="space-y-4">
                  {topByContacts.map((dress) => {
                     const pct = maxContacts > 0 ? (dress.contacts / maxContacts) * 100 : 0;
                     return (
                        <div key={dress.id} className="space-y-1">
                           <div className="flex justify-between items-center text-sm">
                              <Link href={`/catalog/${dress.id}`} className="font-semibold text-secondary-content hover:underline">
                                 {dress.title}
                              </Link>
                              <span className="text-neutral-400">{dress.contacts} קליקים</span>
                           </div>
                           <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3">
                              <div
                                 className="bg-success h-3 rounded-full transition-all duration-500"
                                 style={{ width: `${pct}%` }}
                              ></div>
                           </div>
                        </div>
                     );
                  })}
                  {topByContacts.length === 0 && (
                     <p className="text-sm text-neutral-400 text-center py-4">אין נתונים זמינים</p>
                  )}
               </div>
            </div>
         </div>

         {/* Detailed Table */}
         <div className="card bg-base-100 shadow-xl border border-secondary p-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-4 gap-3">
               <h3 className="font-bold text-lg">פירוט ביצועי קטלוג</h3>
               <div className="flex flex-wrap gap-2 items-center text-sm">
                  <span className="text-neutral-400">מיון מהיר:</span>
                  <button
                     className={`btn btn-xs ${sortField === "views" ? "btn-primary text-primary-content" : "btn-neutral"}`}
                     onClick={() => {
                        setSortField("views");
                        setSortAsc(false);
                     }}
                  >
                     הכי נצפות
                  </button>
                  <button
                     className={`btn btn-xs ${sortField === "contacts" ? "btn-primary text-primary-content" : "btn-neutral"}`}
                     onClick={() => {
                        setSortField("contacts");
                        setSortAsc(false);
                     }}
                  >
                     הכי הרבה פניות
                  </button>
                  <button
                     className={`btn btn-xs ${sortField === "shares" ? "btn-primary text-primary-content" : "btn-neutral"}`}
                     onClick={() => {
                        setSortField("shares");
                        setSortAsc(false);
                     }}
                  >
                     הכי הרבה שיתופים
                  </button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="table table-md w-full">
                  <thead>
                     <tr className="bg-base-200 text-neutral-content">
                        <th>שמלה</th>
                        <th onClick={() => toggleSort("price")} className="cursor-pointer hover:bg-base-300">
                           מחיר {sortField === "price" && (sortAsc ? "▲" : "▼")}
                        </th>
                        <th onClick={() => toggleSort("views")} className="cursor-pointer hover:bg-base-300">
                           צפיות {sortField === "views" && (sortAsc ? "▲" : "▼")}
                        </th>
                        <th onClick={() => toggleSort("contacts")} className="cursor-pointer hover:bg-base-300">
                           פניות וואטסאפ {sortField === "contacts" && (sortAsc ? "▲" : "▼")}
                        </th>
                        <th onClick={() => toggleSort("shares")} className="cursor-pointer hover:bg-base-300">
                           שיתופים {sortField === "shares" && (sortAsc ? "▲" : "▼")}
                        </th>
                        <th onClick={() => toggleSort("favorites")} className="cursor-pointer hover:bg-base-300">
                           מועדפים {sortField === "favorites" && (sortAsc ? "▲" : "▼")}
                        </th>
                        <th onClick={() => toggleSort("conversion")} className="cursor-pointer hover:bg-base-300">
                           אחוז פנייה {sortField === "conversion" && (sortAsc ? "▲" : "▼")}
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {sortedDresses.map((dress) => {
                        const rate =
                           dress.views > 0
                              ? ((dress.contacts / dress.views) * 100).toFixed(1)
                              : "0.0";
                        const coverUuid = dress.images[dress.coverIndex];
                        const coverSrc = coverUuid
                           ? `${U_CARE_CDN_BASEURL}/${coverUuid}/-/preview/100x100/`
                           : null;

                        return (
                           <tr key={dress.id} className="hover hover:bg-base-200/50 transition">
                              <td className="flex items-center gap-3">
                                 <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12 relative bg-neutral">
                                       {coverSrc ? (
                                          <Image
                                             src={coverSrc}
                                             fill
                                             className="object-cover"
                                             alt={dress.title}
                                          />
                                       ) : (
                                          <div className="size-full bg-neutral-600"></div>
                                       )}
                                    </div>
                                 </div>
                                 <div>
                                    <Link href={`/catalog/${dress.id}`} className="font-bold hover:underline">
                                       {dress.title}
                                    </Link>
                                 </div>
                              </td>
                              <td className="font-mono text-sm">{dress.price}{ILS}</td>
                              <td className="font-semibold">{dress.views}</td>
                              <td className="text-success font-semibold">{dress.contacts}</td>
                              <td className="text-warning font-semibold">{dress.shares}</td>
                              <td className="text-error font-semibold">{dress.favorites}</td>
                              <td>
                                 <div className="flex items-center gap-2">
                                    <span className="font-semibold text-primary-content">{rate}%</span>
                                    <progress
                                       className="progress progress-primary w-12"
                                       value={rate}
                                       max="100"
                                    ></progress>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                     {sortedDresses.length === 0 && (
                        <tr>
                           <td colSpan="7" className="text-center py-6 text-neutral-400">
                              אין שמלות בקטלוג
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
