"use client";
import cn from "@/lib/twMerge";

const Badge = ({ title = "title", className, inputClassName, ...rest }) => {
   return (
      <label
         className={cn(
            "badge  badge-secondary badge-lg  p-3 has-[:checked]:badge-primary",
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
