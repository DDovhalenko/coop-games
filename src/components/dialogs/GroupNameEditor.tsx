"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import type { AppLocale } from "../../i18n/routing";
import {
  updateGroupName,
  type UpdateGroupNameState,
} from "../../app/actions";
import { Button, TextButton } from "../Button";
import { TextInput } from "../TextInput";

const initialState: UpdateGroupNameState = {};

type GroupNameEditorProps = {
  locale: AppLocale;
  groupId: number;
  groupName: string;
};

export function GroupNameEditor(props: GroupNameEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("groups");

  return (
    <>
      <button
        type="button"
        aria-label={t("editGroupName")}
        title={t("editGroupName")}
        onClick={() => setIsOpen(true)}
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-white transition hover:text-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <path d="m15 5 4 4M4 20l4.2-.9L20 7.3a2.1 2.1 0 0 0-3-3L5.2 16.1 4 20Z" />
        </svg>
      </button>
      {isOpen && (
        <GroupNameEditDialog
          key={`${props.groupId}-${props.groupName}`}
          {...props}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

type GroupNameEditDialogProps = GroupNameEditorProps & {
  onClose: () => void;
};

function GroupNameEditDialog({
  locale,
  groupId,
  groupName,
  onClose,
}: GroupNameEditDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(groupName);
  const t = useTranslations("groups");
  const errors = useTranslations("errors");
  const updateAction = updateGroupName.bind(null, locale, groupId);
  const [state, action, pending] = useActionState(updateAction, initialState);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    dialog.querySelector<HTMLInputElement>("input[name='name']")?.focus();
  }, []);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-white shadow-2xl backdrop:bg-black/70"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {t("editGroupHeading")}
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            {t("editGroupDescription")}
          </p>
        </div>
        <TextButton
          type="button"
          aria-label={t("cancelGroupEdit")}
          onClick={closeDialog}
          className="text-2xl leading-none"
        >
          ×
        </TextButton>
      </div>

      <form action={action}>
        <TextInput
          id={`group-name-${groupId}`}
          name="name"
          maxLength={80}
          autoComplete="off"
          label={t("groupNameLabel")}
          value={name}
          onValueChange={setName}
          requiredMessage={t("groupNameRequired")}
          placeholder={t("groupNamePlaceholder")}
        />
        {state.error && (
          <p className="mt-3 text-sm text-rose-300">
            {state.error === "groupNameRequired"
              ? t("groupNameRequired")
              : errors(state.error)}
          </p>
        )}
        <div className="mt-6 flex items-center justify-end gap-4">
          <TextButton type="button" onClick={closeDialog} className="text-sm">
            {t("cancelGroupEdit")}
          </TextButton>
          <Button type="submit" disabled={pending}>
            {pending ? t("savingGroupNameButton") : t("updateGroupButton")}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
