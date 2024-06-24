import PageTitle from "@/components/common/pageTitle";
import SectionWrapper from "@/components/common/sectionsWrapper";

import { ROUTES } from "@/lib/constants";
import { ImageProvider } from "@/contexts/imageContext";
import NewDressForm from "@/components/newDress/newDressForm";
import { getDress } from "@/actions/dress.actions";

const NewDress = async ({ searchParams: { edit } }) => {
   let dress = null;
   if (edit) dress = await getDress(edit);
   return (
      <SectionWrapper>
         <PageTitle title={ROUTES.newDress.title} />
         <ImageProvider>
            <NewDressForm dress={dress?.data} />
         </ImageProvider>
      </SectionWrapper>
   );
};

export default NewDress;
