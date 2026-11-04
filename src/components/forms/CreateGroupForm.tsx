"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "../../i18n/routing";
import { createGroup, type CreateGroupState } from "../../app/actions";
import { Button } from "../Button";
import { TextInput } from "../TextInput";

const initialState: CreateGroupState = {};

type CreateGroupFormProps = {
  locale: AppLocale;
};

export function CreateGroupForm({ locale }: CreateGroupFormProps) {
  const [name, setName] = useState("");
  const t = useTranslations("groups");
  const errors = useTranslations("errors");
  const createAction = createGroup.bind(null, locale);
  const [state, action, pending] = useActionState(createAction, initialState);

  return (
    <form action={action} className="mt-6 max-w-lg">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <TextInput
          id="group-name"
          name="name"
          maxLength={80}
          autoComplete="off"
          label={t("groupNameLabel")}
          value={name}
          onValueChange={setName}
          requiredMessage={t("groupNameRequired")}
          containerClassName="min-w-0 flex-1"
          placeholder={t("groupNamePlaceholder")}
        />
        <Button
          type="submit"
          size="small"
          disabled={pending}
        >
          {pending ? t("creatingGroupButton") : t("createGroupButton")}
        </Button>
      </div>
      {state.error && (
        <p className="mt-3 text-sm text-rose-300">{errors(state.error)}</p>
      )}
    </form>
  );
}
