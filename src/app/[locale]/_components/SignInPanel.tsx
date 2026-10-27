import { useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { startGoogleSignIn } from "../../actions";
import { LanguageSwitcher } from "./LanguageSwitcher";

type SignInPanelProps = {
  locale: AppLocale;
};

export function SignInPanel({ locale }: SignInPanelProps) {
  const t = useTranslations("auth");
  const metadata = useTranslations("metadata");
  const signInAction = startGoogleSignIn.bind(null, locale);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-sm font-medium text-violet-400">
            {metadata("title")}
          </h1>
          <LanguageSwitcher />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          {t("signInHeading")}
        </h2>
        <p className="mt-3 text-zinc-400">
          {t("signInDescription")}
        </p>
        <form action={signInAction} className="mt-6">
          <button className="w-full cursor-pointer rounded-xl bg-white px-5 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-200">
            {t("googleButton")}
          </button>
        </form>
      </section>
    </main>
  );
}
