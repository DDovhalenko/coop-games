import "next-auth";

declare module "next-auth" {
  interface Session {
    googleAccountId?: string;
    nickname?: string;
    nicknameNeedsRefresh?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    nickname?: string;
    profileChecked?: boolean;
    nicknameNeedsRefresh?: boolean;
  }
}
