import { useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { CreateGroupForm } from "../../../components/forms/CreateGroupForm";

type CreateGroupBlockProps = {
  locale: AppLocale;
};

export function CreateGroupBlock({ locale }: CreateGroupBlockProps) {
  const t = useTranslations("groups");

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-6 py-12 sm:px-10">
      <h2 className="text-2xl font-semibold tracking-tight">
        {t("createFirstHeading")}
      </h2>
      <p className="mt-3 max-w-xl text-zinc-400">
        {t("createFirstDescription")}
      </p>
      <CreateGroupForm locale={locale} />
    </section>
  );
}
