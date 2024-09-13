import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "../auth.config"
import prisma from "./lib/prisma"

declare module "next-auth" {
  interface User {
    role?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    role: string | null;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages:{
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });
        if (existingUser && !existingUser.emailVerified) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) { 
     if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email ?? undefined },
        });
        token.role = dbUser?.role || 'editor'; // Assign role from the database or default to 'editor'
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string | null;  
      return session;
    },
  },
  ...authConfig,
})