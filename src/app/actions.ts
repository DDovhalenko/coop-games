"use server";

import { redirect } from "next/navigation";
import { Prisma } from "../generated/prisma/client";
import { auth, signIn, signOut } from "../../auth";
import { prisma } from "../lib/prisma";

export async function startGoogleSignIn() {
  await signIn("google", { redirectTo: "/" });
}

export async function endSession() {
  await signOut({ redirectTo: "/" });
}

export type NicknameState = { error?: string };

export async function saveNickname(
  _previousState: NicknameState,
  formData: FormData,
): Promise<NicknameState> {
  const session = await auth();
  const googleAccountId = session?.googleAccountId;

  if (!googleAccountId) {
    return { error: "Сессия входа не найдена. Войдите через Google ещё раз." };
  }

  const nickname = String(formData.get("nickname") ?? "").trim();
  if (!nickname || nickname.length > 32) {
    return { error: "Укажите никнейм длиной от 1 до 32 символов." };
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
        return { error: "Этот никнейм уже занят. Выберите другой." };
      }
    } else {
      throw error;
    }
  }

  redirect("/");
}
