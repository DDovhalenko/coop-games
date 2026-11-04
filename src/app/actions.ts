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

  // Update the JWT with the internal user ID created or found above.
  await unstable_update({});

  redirect(`/${locale}`);
}

export type CreateGroupErrorCode = "sessionMissing" | "groupNameTooLong";

export type CreateGroupState = { error?: CreateGroupErrorCode };

export async function createGroup(
  requestedLocale: string,
  _previousState: CreateGroupState,
  formData: FormData,
): Promise<CreateGroupState> {
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "en";
  const session = await auth();
  const userId = session?.userId;

  if (typeof userId !== "number") {
    return { error: "sessionMissing" };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return {};
  }
  if (name.length > 80) {
    return { error: "groupNameTooLong" };
  }

  await prisma.$transaction(async (transaction) => {
    const group = await transaction.group.create({
      data: {
        name,
        createdById: userId,
      },
      select: { id: true },
    });

    await transaction.groupMember.create({
      data: {
        groupId: group.id,
        userId,
        role: "ADMIN",
      },
    });
  });

  redirect(`/${locale}`);
}

export type UpdateGroupNameErrorCode =
  | "sessionMissing"
  | "groupNameRequired"
  | "groupNameTooLong"
  | "groupAccessDenied";

export type UpdateGroupNameState = { error?: UpdateGroupNameErrorCode };

export async function updateGroupName(
  requestedLocale: string,
  groupId: number,
  _previousState: UpdateGroupNameState,
  formData: FormData,
): Promise<UpdateGroupNameState> {
  const locale = isAppLocale(requestedLocale) ? requestedLocale : "en";
  const session = await auth();
  const userId = session?.userId;

  if (typeof userId !== "number") {
    return { error: "sessionMissing" };
  }

  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "groupNameRequired" };
  }
  if (name.length > 80) {
    return { error: "groupNameTooLong" };
  }

  const membership = await prisma.groupMember.findUnique({
    where: {
      groupId_userId: {
        groupId,
        userId,
      },
    },
    select: { role: true },
  });

  if (
    !membership ||
    (membership.role !== "ADMIN" && membership.role !== "OWNER")
  ) {
    return { error: "groupAccessDenied" };
  }

  await prisma.group.update({
    where: { id: groupId },
    data: { name },
  });

  redirect(`/${locale}`);
}
