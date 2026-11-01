import { auth } from "../../../../auth";
import type { AppLocale } from "../../../i18n/routing";
import { GameLibrary } from "./GameLibrary";
import { NicknameSetupPanel } from "./NicknameSetupPanel";
import { NicknameSessionRefresh } from "./NicknameSessionRefresh";
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

  const sessionRefresh = session.nicknameNeedsRefresh ? (
    <NicknameSessionRefresh />
  ) : null;

  if (!session.nickname) {
    return (
      <>
        <NicknameSetupPanel locale={locale} />
        {sessionRefresh}
      </>
    );
  }

  return (
    <>
      <GameLibrary locale={locale} nickname={session.nickname} />
      {sessionRefresh}
    </>
  );
}
