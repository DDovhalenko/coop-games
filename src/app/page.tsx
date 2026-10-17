
const games = [
  {
    id: 1,
    title: "It Takes Two",
    players: "2 игрока",
    status: "Хотим пройти",
    rating: "—",
  },
  {
    id: 2,
    title: "Baldur's Gate 3",
    players: "2–4 игрока",
    status: "В планах",
    rating: "—",
  },
  {
    id: 3,
    title: "Deep Rock Galactic",
    players: "1–4 игрока",
    status: "Проходим",
    rating: "—",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10">
          <p className="mb-3 text-sm font-medium text-violet-400">
            CO-OP GAME LIBRARY
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Наша игровая библиотека
          </h1>

          <p className="mt-3 text-zinc-400">
            Собираем игры, выбираем, во что играть вместе.
          </p>
        </header>

        <section className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Игры группы</h2>
            <p className="mt-1 text-sm text-zinc-400">
              Всего игр: {games.length}
            </p>
          </div>

          <button
            type="button"
            className="rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-500"
          >
            + Добавить игру
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <article
              key={game.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5"
            >
              <div className="mb-5 flex h-28 items-center justify-center rounded-xl bg-zinc-800 text-4xl">
                🎮
              </div>

              <h3 className="text-lg font-semibold">{game.title}</h3>

              <p className="mt-2 text-sm text-zinc-400">
                {game.players}
              </p>

              <div className="mt-5 flex items-center justify-between gap-2">
                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
                  {game.status}
                </span>

                <span className="text-sm text-zinc-400">
                  Оценка: {game.rating}
                </span>
              </div>
            </article>
          ))}
        </section>

        <footer className="mt-12 border-t border-zinc-800 pt-5 text-sm text-zinc-500">
          Кооперативная база игр · Первая версия
        </footer>
      </div>
    </main>
  );
}
