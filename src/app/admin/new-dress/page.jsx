import PageTitle from "@/components/common/pageTitle";
import SectionWrapper from "@/components/common/sectionsWrapper";

import { ROUTES } from "@/lib/constants";
import { ImageProvider } from "@/contexts/imageContext";
import NewDressForm from "@/components/newDress/newDressForm";

const NewDress = () => {
   return (
      <SectionWrapper>
         <PageTitle title={ROUTES.newDress.title} />
         <ImageProvider>
            <NewDressForm />
         </ImageProvider>
      </SectionWrapper>
   );
};

export default NewDress;
