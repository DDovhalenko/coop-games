import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

export default function LocalizedNotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-violet-400">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-3 text-zinc-400">{t("description")}</p>
        <Link
          href="/"
          className="mt-8 inline-flex cursor-pointer rounded-xl bg-violet-600 px-5 py-3 font-semibold transition hover:bg-violet-500"
        >
          {t("homeLink")}
        </Link>
      </section>
    </main>
  );
}
