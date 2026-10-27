import { NicknameForm } from "./NicknameForm";
import { SignOutButton } from "./SignOutButton";

export function NicknameSetupPanel() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-12 text-white">
      <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <p className="mb-3 text-sm font-medium text-violet-400">ПЕРВЫЙ ВХОД</p>
        <h1 className="text-3xl font-bold tracking-tight">Создайте никнейм</h1>
        <p className="mt-3 text-zinc-400">
          Он будет отображаться в группах. Почта Google в профиль не записывается.
        </p>
        <NicknameForm />
        <div className="mt-4">
          <SignOutButton className="w-full rounded-xl px-5 py-3 text-sm text-zinc-400 transition hover:text-white" />
        </div>
      </section>
    </main>
  );
}
