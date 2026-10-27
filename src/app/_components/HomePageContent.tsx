import { auth } from "../../../auth";
import { prisma } from "../../lib/prisma";
import { GameLibrary } from "./GameLibrary";
import { NicknameSetupPanel } from "./NicknameSetupPanel";
import { SignInPanel } from "./SignInPanel";

export async function HomePageContent() {
  const session = await auth();
  const googleAccountId = session?.googleAccountId;

  if (!googleAccountId) {
    return <SignInPanel />;
  }

  const account = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "google",
        providerAccountId: googleAccountId,
      },
    },
    include: { user: true },
  });

  if (!account) {
    return <NicknameSetupPanel />;
  }

  return <GameLibrary nickname={account.user.nickname} />;
}
