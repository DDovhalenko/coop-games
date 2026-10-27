import { useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { NicknameForm } from "./NicknameForm";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SignOutButton } from "./SignOutButton";

type NicknameSetupPanelProps = {
  locale: AppLocale;
};

export function NicknameSetupPanel({ locale }: NicknameSetupPanelProps) {
  const t = useTranslations("auth");
  const common = useTranslations("common");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-violet-400">{t("firstSignIn")}</p>
          <LanguageSwitcher />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t("createNicknameHeading")}
        </h1>
        <p className="mt-3 text-zinc-400">
          {t("nicknameDescription")}
        </p>
        <NicknameForm locale={locale} />
        <div className="mt-4">
          <SignOutButton
            locale={locale}
            label={common("signOut")}
            className="w-full rounded-xl px-5 py-3 text-sm text-zinc-400 transition hover:text-white"
          />
        </div>
      </section>
    </main>
  );
}
