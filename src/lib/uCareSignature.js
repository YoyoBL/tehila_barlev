import "server-only";

import {
   UploadcareAuthSchema,
   deleteFiles,
   storeFiles,
} from "@uploadcare/rest-client";

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

export async function storeImages(uuids = []) {
   const result = await storeFiles({ uuids }, { authSchema: uploadCareSchema });
   return result;
}
