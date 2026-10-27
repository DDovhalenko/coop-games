"use client";

import { useActionState } from "react";
import { saveNickname, type NicknameState } from "../actions";

const initialState: NicknameState = {};

export function NicknameForm() {
  const [state, action, pending] = useActionState(saveNickname, initialState);

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-zinc-200" htmlFor="nickname">
        Имя профиля
      </label>
      <input
        id="nickname"
        name="nickname"
        required
        maxLength={32}
        autoComplete="nickname"
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
        placeholder="Например, Dragon"
      />
      {state.error && <p className="text-sm text-rose-300">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Сохраняем…" : "Создать профиль"}
      </button>
    </form>
  );
}
