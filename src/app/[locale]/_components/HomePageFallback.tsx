import { useTranslations } from "next-intl";

export function HomePageFallback() {
  const t = useTranslations("common");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <p className="text-zinc-400">{t("loadingProfile")}</p>
    </main>
  );
}
