import cn from "@/lib/twMerge";

const TextInput = ({
   label,
   labelPosition = "topStart",
   placeholder = "",
   className = "",
   required = false,
   ...rest
}) => {
   const labelTopStart = labelPosition === "topStart";
   const labelTopEnd = labelPosition === "topEnd";
   const labelBottomStart = labelPosition === "bottomStart";
   const labelBottomEnd = labelPosition === "bottomEnd";
   const labelTop = labelTopStart || labelTopEnd;
   const labelBottom = labelBottomStart || labelBottomEnd;

   label = required ? (
      <>
         {label}
         <span className="text-error">*</span>
      </>
   ) : (
      <>{label}</>
   );

   return (
      <label className={cn("form-control w-full", className)}>
         {labelTop && (
            <div className="label *:text-xl">
               {labelTopStart && <span className="label-text">{label}</span>}
               {labelTopEnd && <span className="label-text-alt">{label}</span>}
            </div>
         )}
         <input
            {...rest}
            minLength="2"
            type="text"
            placeholder={placeholder}
            className="peer input input-bordered w-full"
            required={required}
         />
         {labelBottom && (
            <div className="label *:text-xl">
               {labelBottomStart && (
                  <span className="label-text-alt">{label}</span>
               )}
               {labelBottomEnd && (
                  <span className="label-text-alt">{label}</span>
               )}
            </div>
         )}
      </label>
   );
};

export default TextInput;
