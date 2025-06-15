"use client";
import cn from "@/lib/twMerge";

const Badge = ({ title = "title", className, inputClassName, ...rest }) => {
   return (
      <label
         className={cn(
            "badge badge-primary badge-lg  p-3 has-[:checked]:badge-neutral",
            className
         )}
      >
         <input
            type="checkbox"
            className={cn("hidden", inputClassName)}
            {...rest}
         />
         {title}
      </label>
   );
};

export default Badge;
