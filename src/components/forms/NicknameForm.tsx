"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "../../i18n/routing";
import { saveNickname, type NicknameState } from "../../app/actions";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const initialState: NicknameState = {};

type NicknameFormProps = {
  locale: AppLocale;
};

export function NicknameForm({ locale }: NicknameFormProps) {
  const t = useTranslations("auth");
  const errors = useTranslations("errors");
  const [nickname, setNickname] = useState("");
  const saveAction = saveNickname.bind(null, locale);
  const [state, action, pending] = useActionState(saveAction, initialState);

  return (
    <form action={action} className="mt-6 space-y-4">
      <TextInput
        id="nickname"
        name="nickname"
        maxLength={32}
        autoComplete="nickname"
        label={t("profileNameLabel")}
        value={nickname}
        onValueChange={setNickname}
        requiredMessage={t("profileNameRequired")}
        placeholder={t("nicknamePlaceholder")}
      />
      {state.error && <p className="text-sm text-rose-300">{errors(state.error)}</p>}
      <Button
        type="submit"
        fullWidth
        disabled={pending}
      >
        {pending ? t("savingProfileButton") : t("createProfileButton")}
      </Button>
    </form>
  );
}
