import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signUserIn } from "../actions/user.actions";
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [
      Credentials({
         // You can specify which fields should be submitted, by adding keys to the `credentials` object.
         // e.g. domain, username, password, 2FA token, etc.
         credentials: {
            email: { type: "email", required: true },
            password: { type: "password", required: true },
         },
         authorize: async (credentials) => {
            let user = null;

            // logic to salt and hash password

            // logic to verify if user exists
            user = await signUserIn(credentials);

            if (!user) {
               // No user found, so this is their first attempt to login
               // meaning this is also the place you could do registration
               throw new Error("User not found.");
            }

            // return user object with the their profile data
            return user.data;
         },
      }),
   ],
});
