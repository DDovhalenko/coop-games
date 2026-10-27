import { startGoogleSignIn } from "../actions";

export function SignInPanel() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="mb-3 text-sm font-medium text-violet-400">
          CO-OP GAME LIBRARY
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Войдите, чтобы продолжить
        </h1>
        <p className="mt-3 text-zinc-400">
          Используйте Google аккаунт. Данные профиля мы не сохраняем.
        </p>
        <form action={startGoogleSignIn} className="mt-6">
          <button className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-200">
            Продолжить с Google
          </button>
        </form>
      </section>
    </main>
  );
}
