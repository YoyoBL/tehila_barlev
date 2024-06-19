const InputError = ({ fieldName, formik }) => {
   return (
      <>
         {formik?.touched?.[fieldName] && formik?.errors?.[fieldName] ? (
            <div className="text-sm text-error">
               {formik.errors?.[fieldName]}
            </div>
         ) : null}
      </>
   );
};

export default InputError;
