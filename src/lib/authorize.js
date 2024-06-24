import { auth } from "./auth";

export async function authorize() {
   const session = await auth();
   if (!session) throw new Error("Access denied");
}
