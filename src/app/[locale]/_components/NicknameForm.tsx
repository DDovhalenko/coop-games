"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "../../../i18n/routing";
import { saveNickname, type NicknameState } from "../../actions";

const initialState: NicknameState = {};

type NicknameFormProps = {
  locale: AppLocale;
};

export function NicknameForm({ locale }: NicknameFormProps) {
  const t = useTranslations("auth");
  const errors = useTranslations("errors");
  const saveAction = saveNickname.bind(null, locale);
  const [state, action, pending] = useActionState(saveAction, initialState);

  return (
    <form action={action} className="mt-6 space-y-4">
      <label className="block text-sm font-medium text-zinc-200" htmlFor="nickname">
        {t("profileNameLabel")}
      </label>
      <input
        id="nickname"
        name="nickname"
        required
        maxLength={32}
        autoComplete="nickname"
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500"
        placeholder={t("nicknamePlaceholder")}
      />
      {state.error && <p className="text-sm text-rose-300">{errors(state.error)}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? t("savingProfileButton") : t("createProfileButton")}
      </button>
    </form>
  );
}
