import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./src/lib/prisma";

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
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
    async jwt({ token, account, trigger }) {
      if (account?.provider === "google") {
        // Override Auth.js's per-login user UUID with Google's stable ID.
        token.sub = account.providerAccountId;
      }

      // Profile claims are always loaded from our database. In particular, do
      // not trust values supplied to unstable_update by a client.
      if (token.sub && (trigger === "update" || !token.profileChecked)) {
        const linkedAccount = await prisma.oAuthAccount.findUnique({
          where: {
            provider_providerAccountId: {
              provider: "google",
              providerAccountId: token.sub,
            },
          },
          select: { user: { select: { nickname: true } } },
        });

        if (linkedAccount) {
          token.nickname = linkedAccount.user.nickname;
        } else {
          delete token.nickname;
        }

        token.profileChecked = true;
        // Server Component session reads can't write refreshed cookies. Mark
        // legacy tokens so a Server Action can persist this claim once.
        token.nicknameNeedsRefresh = !account && trigger !== "update";
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
        ...(typeof token.nickname === "string"
          ? { nickname: token.nickname }
          : {}),
        ...(token.nicknameNeedsRefresh ? { nicknameNeedsRefresh: true } : {}),
      };
    },
  },
});
