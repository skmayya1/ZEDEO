import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "../auth.config"
import prisma from "./lib/prisma"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages:{
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: {
    strategy: 'jwt'
  },
  ...authConfig,
})