import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "uk"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: false,
});

export type AppLocale = (typeof routing.locales)[number];

export function isAppLocale(locale: string | undefined): locale is AppLocale {
  return routing.locales.some((supportedLocale) => supportedLocale === locale);
}
