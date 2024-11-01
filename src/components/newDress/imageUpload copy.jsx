"use client";
import React from "react";
import {
   FileUploaderMinimal,
   FileUploaderRegular,
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";
import { useImages } from "@/contexts/imageContext";

function ImageUpload() {
   const { files, setFiles } = useImages();

   const handleChangeEvent = (items) => {
      setFiles([
         ...items.allEntries.filter((file) => file.status === "success"),
      ]);
   };

   return (
      <div>
         <FileUploaderMinimal
            c
            id="uploaderctx"
            onChange={handleChangeEvent}
            pubkey="833cac450f04ae30bf74"
            maxLocalFileSizeBytes={10000000}
            imgOnly={true}
         />

         {/* <div>
            {files.map((file) => (
               <div key={file.uuid}>
                  <img src={file.cdnUrl} alt={file.fileInfo.originalFilename} />
               </div>
            ))}
         </div> */}
      </div>
   );
}

export default ImageUpload;
