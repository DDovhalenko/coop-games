import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: { scope: "openid" },
      },
      profile(profile) {
        // Keep only Google's stable subject. Name, email, and image are not
        // needed by this app and must not enter the Auth.js user/JWT payload.
        return {
          id: profile.sub,
          name: null,
          email: null,
          image: null,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        // Override Auth.js's per-login user UUID with Google's stable ID.
        token.sub = account.providerAccountId;
      }
      delete token.email;
      delete token.name;
      delete token.picture;
      return token;
    },
    async session({ session, token }) {
      return {
        expires: session.expires,
        ...(token.sub ? { googleAccountId: token.sub } : {}),
      };
    },
  },
});
