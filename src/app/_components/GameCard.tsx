export type GameCardData = {
  id: number;
  title: string;
  players: string;
  status: string;
  rating: string;
};

type GameCardProps = {
  game: GameCardData;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div className="mb-5 flex h-28 items-center justify-center rounded-xl bg-zinc-800 text-4xl">
        🎮
      </div>

      <h3 className="text-lg font-semibold">{game.title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{game.players}</p>

      <div className="mt-5 flex items-center justify-between gap-2">
        <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-300">
          {game.status}
        </span>
        <span className="text-sm text-zinc-400">Оценка: {game.rating}</span>
      </div>
    </article>
  );
}
