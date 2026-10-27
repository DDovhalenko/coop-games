import { Suspense } from "react";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { isAppLocale } from "../../i18n/routing";
import { HomePageContent } from "./_components/HomePageContent";
import { HomePageFallback } from "./_components/HomePageFallback";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  if (!isAppLocale(locale)) notFound();

  setRequestLocale(locale);

  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent locale={locale} />
    </Suspense>
  );
}
