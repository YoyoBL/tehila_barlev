"use client";
import TextInput from "@/components/common/textInput";
import dynamic from "next/dynamic";
const ImageUpload = dynamic(() => import("@/components/newDress/imageUpload"), {
   ssr: false,
});
import Badge from "@/components/common/badge";
import DressCard from "@/components/catalog/dressCard";
import { TEXTS } from "@/lib/texts";
import { useImages } from "@/contexts/imageContext";
import { addNewDress } from "@/actions/dress.actions";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { U_CARE_CDN_BASEURL } from "@/lib/constants";
import cn from "@/lib/twMerge";
const { tags, sizes: sizesTags } = TEXTS;

const NewDressForm = () => {
   const { files, resetUploader } = useImages();
   const [error, setError] = useState("");

   const imagesUuid = useMemo(() => files.map((file) => file.uuid), [files]);

   function handleClick(key, e) {
      const { value, checked } = e.target;
      const preValues = formik.values[key];
      if (checked) return formik.setFieldValue(key, [...preValues, value]);

      formik.setFieldValue(
         key,
         preValues.filter((preValue) => preValue !== value)
      );
   }

   const formik = useFormik({
      initialValues: {
         title: "",
         price: "",
         coverIndex: 0,
         sizes: [],
         tags: [],
      },
      onSubmit: async (values) => {
         try {
            if (!tags.length || !sizes.length || !imagesUuid.length)
               throw new Error(TEXTS.newDress.missingFields);
            values = { ...values, images: imagesUuid };
            const { data, error } = await addNewDress(values);
            if (error) return console.log(error);
            resetUploader();
            formik.resetForm();
         } catch (error) {
            console.log(error);
            setError(error.message);
         }
      },
   });

   const { title, price, sizes, coverIndex } = formik.values;

   return (
      <form onSubmit={formik.handleSubmit} className="grid gap-2">
         <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
               <TextInput
                  label={TEXTS.newDress.dressTitle}
                  required
                  {...formik.getFieldProps("title")}
               />
            </div>

            <div className="col-span-1">
               <TextInput
                  label={TEXTS.common.price}
                  required
                  pattern="\d*"
                  inputMode="numeric"
                  {...formik.getFieldProps("price")}
               />
            </div>
         </div>

         <h3>{TEXTS.common.pictures}</h3>

         <ImageUpload />

         <h3>{TEXTS.common.sizes}</h3>
         <div id="sizes" className="flex flex-wrap gap-2">
            {sizesTags.map((tag) => (
               <Badge
                  key={tag}
                  title={tag}
                  className={"badge-lg whitespace-nowrap"}
                  value={tag}
                  onChange={(e) => handleClick("sizes", e)}
               />
            ))}
         </div>

         <h3>{TEXTS.common.tags}</h3>
         <div id="tags" className="flex flex-wrap gap-3">
            {tags.map((tag) => (
               <Badge
                  key={tag}
                  title={tag}
                  className={"badge-lg whitespace-nowrap"}
                  value={tag}
                  onChange={(e) => handleClick("tags", e)}
               />
            ))}
         </div>
         <h3>{TEXTS.common.preview}</h3>
         <div className="mt-3 flex gap-3">
            <DressCard
               dressData={{
                  images: imagesUuid,
                  title,
                  price,
                  sizes,
                  coverIndex,
               }}
            />
            <div className="grid grid-cols-2 items-stretch gap-2">
               {imagesUuid.map((uuid, index) => (
                  <Image
                     key={uuid}
                     src={U_CARE_CDN_BASEURL + "/" + uuid + "/-/preview/"}
                     width={600}
                     height={909}
                     onClick={() => formik.setFieldValue("coverIndex", index)}
                     alt="Dress preview"
                     className={cn(
                        "w-20 object-cover rounded-btn",
                        index === formik.values.coverIndex &&
                           "outline outline-4 outline-info"
                     )}
                  />
               ))}
            </div>
         </div>
         {error && (
            <div role="alert" className="alert alert-error flex">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth="2"
                     d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
               </svg>
               <span>{error}</span>
            </div>
         )}
         <button
            disabled={formik.isSubmitting}
            className="btn btn-primary btn-block btn-lg"
            type="submit"
         >
            {formik.isSubmitting ? (
               <div className="loading loading-dots loading-md"></div>
            ) : (
               TEXTS.common.save
            )}
         </button>
      </form>
   );
};

export default NewDressForm;
