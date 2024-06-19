"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ImageContext = createContext({
   files: [],
   setFiles: () => {},
   resetUploader: () => {},
});

export const ImageProvider = ({ children }) => {
   const [files, setFiles] = useState([]);
   const ctxRef = useRef();

   function resetUploader() {
      ctxRef.current.removeAllFiles();
   }

   return (
      <ImageContext.Provider value={{ files, setFiles, resetUploader }}>
         <lr-upload-ctx-provider
            ref={ctxRef}
            ctx-name="my-uploader"
         ></lr-upload-ctx-provider>
         {children}
      </ImageContext.Provider>
   );
};

export const useImages = () => {
   return useContext(ImageContext);
};
