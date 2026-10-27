import { endSession } from "../actions";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <form action={endSession}>
      <button className={className ?? "text-sm text-zinc-400 hover:text-white"}>
        Выйти
      </button>
    </form>
  );
}
