import { Suspense } from "react";
import { HomePageContent } from "./_components/HomePageContent";
import { HomePageFallback } from "./_components/HomePageFallback";

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageFallback />}>
      <HomePageContent />
    </Suspense>
  );
}
