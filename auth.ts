import { db } from "./lib/db";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async jwt({ token }) {
      console.log({ token });
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
