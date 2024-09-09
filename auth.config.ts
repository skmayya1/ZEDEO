import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
 
export default { providers: [
    Google({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  ]} satisfies NextAuthConfig