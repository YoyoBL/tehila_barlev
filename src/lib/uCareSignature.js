import "server-only";

import { UploadcareAuthSchema, deleteFiles } from "@uploadcare/rest-client";

const uploadCareSchema = new UploadcareAuthSchema({
   publicKey: "833cac450f04ae30bf74",
   secretKey: process.env.U_CARE_SECRET_KEY,
});

export async function deleteMultipleImages(uuids) {
   const result = await deleteFiles(
      { uuids },
      { authSchema: uploadCareSchema }
   );
   return result;
}
