import { useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { LanguageSwitcher } from "../../../components/LanguageSwitcher";
import { SignOutButton } from "../../../components/SignOutButton";
import { GameCard, type GameCardData } from "../../../components/GameCard";
import { CreateGroupBlock } from "./CreateGroupBlock";
import { Button } from "../../../components/Button";
import { GroupNameEditor } from "../../../components/dialogs/GroupNameEditor";

type GroupSummary = {
  id: number;
  name: string;
};

type GameLibraryProps = {
  locale: AppLocale;
  nickname: string;
  group: GroupSummary | null;
};

const games: GameCardData[] = [
  {
    id: 1,
    title: "It Takes Two",
    players: "two",
    status: "wantToPlay",
    rating: "—",
  },
  {
    id: 2,
    title: "Baldur's Gate 3",
    players: "twoToFour",
    status: "planned",
    rating: "—",
  },
  {
    id: 3,
    title: "Deep Rock Galactic",
    players: "oneToFour",
    status: "playing",
    rating: "—",
  },
];

export function GameLibrary({ locale, nickname, group }: GameLibraryProps) {
  const t = useTranslations("games");
  const metadata = useTranslations("metadata");
  const common = useTranslations("common");

  const playerLabels = {
    two: t("players.two"),
    twoToFour: t("players.twoToFour"),
    oneToFour: t("players.oneToFour"),
  };
  const statusLabels = {
    wantToPlay: t("statuses.wantToPlay"),
    planned: t("statuses.planned"),
    playing: t("statuses.playing"),
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {metadata("title")}
            </h1>
            <LanguageSwitcher />
          </div>
          <p className="mt-3 text-zinc-400">{metadata("description")}</p>
          <h2 className="mt-8 text-2xl font-semibold tracking-tight">
            {t("pageHeading")}
          </h2>
          <div className="mt-5 flex items-center gap-4">
            <span className="text-sm text-zinc-300">
              {t("signedInAs", { nickname })}
            </span>
            <SignOutButton
              locale={locale}
              label={common("signOut")}
              className="text-sm"
            />
          </div>
        </header>

        {group !== null ? (
          <>
            <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{group.name}</h2>
                  <GroupNameEditor
                    locale={locale}
                    groupId={group.id}
                    groupName={group.name}
                  />
                </div>
                <p className="mt-1 text-sm text-zinc-400">
                  {t("totalCount", { count: games.length })}
                </p>
              </div>
              <Button
                type="button"
                size="small"
              >
                {t("addGame")}
              </Button>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={{
                    id: game.id,
                    title: game.title,
                    players: playerLabels[game.players],
                    status: statusLabels[game.status],
                    rating: t("rating", { rating: game.rating }),
                  }}
                />
              ))}
            </section>
          </>
        ) : (
          <CreateGroupBlock locale={locale} />
        )}

        <footer className="mt-12 border-t border-zinc-800 pt-5 text-sm text-zinc-500">
          {common("footer")}
        </footer>
      </div>
    </main>
  );
}
