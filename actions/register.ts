"use server";

import * as z from "zod";
import bcrypt from "bcrypt";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Geçersiz alanlar." };
  }

  const { email, name, password, unitId } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser?.emailVerified === null) {
    const verificationToken = await generateVerificationToken(email);

    if (verificationToken.expires > new Date()) {
      return {
        error: "Doğrulama süreniz devam ediyor. Mail kutunuzu kontrol edin.",
      };
    } else {
      // Eğer token'ın süresi dolmuşsa yeni bir token oluştur ve gönder
      const newVerificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
        newVerificationToken.email,
        newVerificationToken.token
      );
      return {
        error: "E-postanıza yeni bir doğrulama maili gönderildi.",
      };
    }
  }

  if (existingUser) {
    return { error: "Mail zaten kullanımda!" };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { sucess: "Confirmation email sent!", user };
};
