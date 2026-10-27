import { getRequestConfig } from "next-intl/server";
import { isAppLocale, routing } from "./routing";

const messageLoaders = {
  en: () => import("../../messages/en.json"),
  ru: () => import("../../messages/ru.json"),
  uk: () => import("../../messages/uk.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = isAppLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: (await messageLoaders[locale]()).default,
  };
});
