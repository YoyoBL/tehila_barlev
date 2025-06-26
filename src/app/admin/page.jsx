import { auth, signIn } from "@/lib/auth";
import SectionWrapper from "@/components/common/sectionsWrapper";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import PageTitle from "@/components/common/pageTitle";
import AdminLogoutBtn from "@/components/adminLogoutBtn";

const AdminPage = async () => {
   const user = await auth();
   if (!user) return signIn("github", { redirectTo: "/admin" });
   return (
      <SectionWrapper>
         <PageTitle title="היי יפשלי🥰" />
         <ul className="flex flex-col gap-3">
            <li>
               <Link
                  href={ROUTES.newDress.path}
                  className="btn btn-primary btn-lg btn-block"
               >
                  הוספת שמלה
               </Link>
            </li>
            <li>
               <AdminLogoutBtn />
            </li>
         </ul>
      </SectionWrapper>
   );
};

export default AdminPage;
