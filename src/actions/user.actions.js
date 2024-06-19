"use server";
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function addNewUser(values) {
   try {
      const email = values.email.toLowerCase();
      const exists = await prisma.user.findUnique({ where: { email } });

      if (exists) throw new Error("Email already registered.");
      const hashedPassword = await bcrypt.hash(values.password, 12);
      const newUser = await prisma.user.create({
         data: {
            ...values,
            email,
            password: hashedPassword,
         },
      });
      const res = {
         ok: true,
         data: newUser,
      };
   } catch (error) {
      console.log(error.message);
      return { ok: false, data: error.message };
   }
}

export async function signUserIn(credentials) {
   try {
      const user = await prisma.user.findUnique({
         where: {
            email: credentials.email.toLowerCase(),
         },
      });
      if (!user) throw new Error("Wrong email or password");

      const validatePassword = await bcrypt.compare(
         credentials.password,
         user.password
      );
      if (!validatePassword) throw new Error("Wrong email or password");

      return {
         ok: true,
         data: user,
      };
   } catch (error) {
      console.log(error.message);
      return null;
   }
}
