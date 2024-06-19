import cn from "@/lib/twMerge";

const Badge = ({ title = "title", className, ...rest }) => {
   return (
      <label
         className={cn(
            "badge  badge-secondary badge-lg  p-3 has-[:checked]:badge-primary",
            className
         )}
      >
         {title}
         <input type="checkbox" className="hidden" {...rest} />
      </label>
   );
};

export default Badge;
