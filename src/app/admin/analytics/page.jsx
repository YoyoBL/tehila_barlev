import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SectionWrapper from "@/components/common/sectionsWrapper";
import PageTitle from "@/components/common/pageTitle";
import AnalyticsDashboard from "./analyticsDashboard";

export const metadata = {
   title: "נתוני פעילות ואנליטיקס",
};

export default async function AnalyticsPage() {
   // Validate session on server-side
   const session = await auth();
   if (!session) {
      redirect("/admin");
   }

   return (
      <SectionWrapper className="px-5 py-3">
         <PageTitle title="נתוני פעילות ואנליטיקס 👑" />
         <AnalyticsDashboard />
      </SectionWrapper>
   );
}
