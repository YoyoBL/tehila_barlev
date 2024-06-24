import { TEXTS } from "@/lib/texts";
import Badge from "../common/badge";

const BadgesFilters = () => {
   const className =
      "flex items-center gap-2 overflow-x-auto pb-2 hide-scrollbar whitespace-nowrap shrink-0";
   return (
      <>
         <div className={className}>
            {TEXTS.tags.map((filter) => (
               <Badge key={filter} title={filter} />
            ))}
         </div>
         <div className={className}>
            {TEXTS.sizes.map((size) => (
               <Badge key={size} title={size} />
            ))}
         </div>
      </>
   );
};

export default BadgesFilters;
