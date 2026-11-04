import "next-auth";

declare module "next-auth" {
  interface Session {
    googleAccountId?: string;
    userId?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: number;
    userIdChecked?: boolean;
  }
}
