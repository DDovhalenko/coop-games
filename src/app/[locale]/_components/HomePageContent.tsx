import { auth } from "../../../../auth";
import { prisma } from "../../../lib/prisma";
import type { AppLocale } from "../../../i18n/routing";
import { GameLibrary } from "./GameLibrary";
import { NicknameSetupPanel } from "./NicknameSetupPanel";
import { SignInPanel } from "./SignInPanel";

type HomePageContentProps = {
  locale: AppLocale;
};

export async function HomePageContent({ locale }: HomePageContentProps) {
  const session = await auth();
  const googleAccountId = session?.googleAccountId;

  if (!googleAccountId) {
    return <SignInPanel locale={locale} />;
  }

  if (typeof session.userId !== "number") {
    return <NicknameSetupPanel locale={locale} />;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      nickname: true,
      memberships: {
        orderBy: { joinedAt: "desc" },
        take: 1,
        select: {
          group: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  if (!user) {
    return <NicknameSetupPanel locale={locale} />;
  }

  return (
    <GameLibrary
      locale={locale}
      nickname={user.nickname}
      group={user.memberships[0]?.group ?? null}
    />
  );
}
