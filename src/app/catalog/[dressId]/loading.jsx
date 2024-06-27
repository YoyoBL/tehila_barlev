import SectionWrapper from "@/components/common/sectionsWrapper";

const DressPageLoading = () => {
   return (
      <SectionWrapper className="h-full relative">
         <div className="grid grid-cols-3 place-items-center h-6 w-full gap-3 *:rounded-btn">
            <h1 className="skeleton size-full"></h1>
            <h2 className="w-full border-l-2 border-r-2 text-center skeleton size-full"></h2>
            <h2 className="skeleton size-full"></h2>
         </div>
         <div className="flex-1 flex relative">
            <div className="flex-1 carousel rounded-box">
               <div className="skeleton size-full "></div>
               <div className=" absolute top-1/2 -end-5 text-2xl text-primary">
                  <i className="bi bi-chevron-left"></i>
               </div>
               <div className="absolute top-1/2 -start-5 text-2xl text-primary">
                  <i className="bi bi-chevron-right"></i>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-3 gap-4 h-[65px] *:rounded-btn">
            <div className="skeleton size-full col-span-1 "></div>
            <div className="skeleton size-full col-span-2"></div>
         </div>
      </SectionWrapper>
   );
};

export default DressPageLoading;
