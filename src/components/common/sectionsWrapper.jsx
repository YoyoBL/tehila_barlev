import cn from "@/lib/twMerge";

const SectionWrapper = ({ children, className }) => {
   return (
      <section
         className={cn("h-full py-3 px-5 flex flex-col gap-2", className)}
      >
         {children}
      </section>
   );
};

export default SectionWrapper;
