import PageTitle from "@/components/common/pageTitle";
import SectionWrapper from "@/components/common/sectionsWrapper";
import { METADATA, TEXTS, q_and_a } from "@/lib/texts";
import deco1 from "@/images/decorations/deco1.png";
import deco2 from "@/images/decorations/deco2.png";
import deco3 from "@/images/decorations/deco3.png";
import deco4 from "@/images/decorations/deco4.png";
import deco5 from "@/images/decorations/deco5.png";
import deco6 from "@/images/decorations/deco6.png";
import deco7 from "@/images/decorations/deco7.png";
import Image from "next/image";

export const metadata = METADATA.about;

const decorations = [deco1, deco2, deco3, deco4, deco5, deco6, deco7];

const AboutPage = () => {
   return (
      <SectionWrapper>
         <PageTitle title={TEXTS.routesTitles.about} />
         <div className="flex flex-col gap-2">
            {q_and_a.map(({ question, answer }, index) => (
               <>
                  <div className="collapse bg-primary">
                     <input
                        type="radio"
                        name="my-accordion-1"
                        defaultChecked={!index}
                     />
                     <div className="collapse-title text-xl font-medium ">
                        {question}
                     </div>
                     <div className="collapse-content text-base m-1 pt-3 rounded-box bg-white ">
                        <div className="flex opacity-30">
                           <span>•</span>
                           <Image
                              className="h-6 w-auto mx-auto object-contain"
                              src={decorations[index % decorations.length]}
                              alt="Decoration element"
                           />
                           <span>•</span>
                        </div>
                        <p>{answer}</p>
                     </div>
                  </div>
               </>
            ))}
         </div>
      </SectionWrapper>
   );
};

export default AboutPage;
