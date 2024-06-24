"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ImageContext = createContext({
   files: [],
   setFiles: () => {},
   resetUploader: () => {},
   addImagesToUploadList: () => {},
});

export const ImageProvider = ({ children }) => {
   const [mounted, setMounted] = useState(false);

   const [files, setFiles] = useState([]);
   const ctxRef = useRef();

   function resetUploader() {
      ctxRef.current.removeAllFiles();
   }

   function addImagesToUploadList(imagesUuids = []) {
      imagesUuids.forEach((imageUuid) =>
         ctxRef.current.addFileFromUuid(imageUuid)
      );
   }

   return (
      <>
         <lr-upload-ctx-provider
            id="uploaderctx"
            ref={ctxRef}
            ctx-name="my-uploader"
         ></lr-upload-ctx-provider>
         <ImageContext.Provider
            value={{
               files,
               setFiles,
               mounted,
               setMounted,
               resetUploader,
               addImagesToUploadList,
            }}
         >
            {children}
         </ImageContext.Provider>
      </>
   );
};

export const useImages = () => {
   return useContext(ImageContext);
};
