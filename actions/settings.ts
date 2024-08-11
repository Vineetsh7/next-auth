"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { settingSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (value: z.infer<typeof settingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized!" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized!" };
  }

  if (user.isOAuth) {
    value.email = undefined;
    value.password = undefined;
    value.newPassword = undefined;
    value.isTwoFactorEnabled = undefined;
  }

  if (value.email && value.email !== user.email) {
    const existingUser = await getUserByEmail(value.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }
    const verificationToken = await generateVerificationToken(value.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }

  if (value.password && value.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(value.password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Incorrect Password!" };
    }

    const hashedPassword = await bcrypt.hash(value.newPassword, 10);
    value.password = hashedPassword;
    value.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...value,
    },
  });
  return { success: "Settings updated!" };
};
