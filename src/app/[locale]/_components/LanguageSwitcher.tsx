"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { Link, useRouter } from "../../../i18n/navigation";

const locales: { code: AppLocale; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" },
];

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();

  function prefetchLocale(locale: AppLocale) {
    if (locale !== currentLocale) {
      router.prefetch("/", { locale });
    }
  }

  return (
    <nav aria-label={t("language")} className="flex gap-2 text-xs">
      {locales.map(({ code, label }) => (
        <Link
          key={code}
          href="/"
          locale={code}
          onMouseEnter={() => prefetchLocale(code)}
          onFocus={() => prefetchLocale(code)}
          aria-current={currentLocale === code ? "page" : undefined}
          className={
            currentLocale === code
              ? "font-semibold text-violet-300"
              : "text-zinc-400 transition hover:text-white"
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
