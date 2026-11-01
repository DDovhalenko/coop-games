"use server";

import { redirect } from "next/navigation";
import { Prisma } from "../generated/prisma/client";
import { auth, signIn, signOut, unstable_update } from "../../auth";
import { prisma } from "../lib/prisma";
import { isAppLocale } from "../i18n/routing";

export async function startGoogleSignIn(requestedLocale: string) {
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "en";
  await signIn("google", { redirectTo: `/${locale}` });
}

export async function endSession(requestedLocale: string) {
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "en";
  await signOut({ redirectTo: `/${locale}` });
}

export async function refreshNicknameSession() {
  // jwt() ignores client-provided fields and reads the nickname from Prisma.
  await unstable_update({});
}

export type NicknameErrorCode =
  | "sessionMissing"
  | "nicknameLength"
  | "nicknameTaken";

export type NicknameState = { error?: NicknameErrorCode };

export async function saveNickname(
  requestedLocale: string,
  _previousState: NicknameState,
  formData: FormData,
): Promise<NicknameState> {
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "en";
  const session = await auth();
  const googleAccountId = session?.googleAccountId;

  if (!googleAccountId) {
    return { error: "sessionMissing" };
  }

  const nickname = String(formData.get("nickname") ?? "").trim();
  if (!nickname || nickname.length > 32) {
    return { error: "nicknameLength" };
  }

  try {
    const existingAccount = await prisma.oAuthAccount.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "google",
          providerAccountId: googleAccountId,
        },
      },
    });

    if (!existingAccount) {
      await prisma.user.create({
        data: {
          nickname,
          oauthAccounts: {
            create: {
              provider: "google",
              providerAccountId: googleAccountId,
            },
          },
        },
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const accountWasCreatedElsewhere = await prisma.oAuthAccount.findUnique({
        where: {
          provider_providerAccountId: {
            provider: "google",
            providerAccountId: googleAccountId,
          },
        },
        select: { id: true },
      });

      if (!accountWasCreatedElsewhere) {
        return { error: "nicknameTaken" };
      }
    } else {
      throw error;
    }
  }

  // Persist the new DB-backed nickname claim before redirecting.
  await unstable_update({});

  redirect(`/${locale}`);
}
