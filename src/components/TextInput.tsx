"use client";

import type { InputHTMLAttributes } from "react";

type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "value" | "onChange"
> & {
  id: string;
  name: string;
  label: string;
  value: string;
  requiredMessage: string;
  onValueChange: (value: string) => void;
  containerClassName?: string;
};

const inputStyles =
  "w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-violet-500";

export function TextInput({
  id,
  name,
  label,
  value,
  requiredMessage,
  onValueChange,
  className,
  containerClassName,
  required = true,
  ...inputProps
}: TextInputProps) {
  return (
    <div className={containerClassName}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-zinc-200"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={(event) => {
          const nextValue = event.currentTarget.value;
          onValueChange(nextValue);
          event.currentTarget.setCustomValidity(
            required && !nextValue.trim() ? requiredMessage : "",
          );
        }}
        onInvalid={(event) => {
          if (!event.currentTarget.value.trim()) {
            onValueChange("");
            event.currentTarget.setCustomValidity(requiredMessage);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.value.trim()) {
            onValueChange("");
            event.currentTarget.setCustomValidity(requiredMessage);
          } else {
            event.currentTarget.setCustomValidity("");
          }
        }}
        className={[inputStyles, className].filter(Boolean).join(" ")}
      />
    </div>
  );
}
