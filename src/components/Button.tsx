import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { Link } from "../i18n/navigation";

type ButtonSize = "small" | "medium";

type SharedButtonProps = {
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedButtonProps;

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type TextLinkProps = ComponentProps<typeof Link>;

const baseStyles =
  "inline-flex cursor-pointer items-center justify-center rounded-xl bg-violet-600 font-semibold text-white transition-colors hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400 disabled:cursor-not-allowed disabled:opacity-60";
const textControlStyles =
  "cursor-pointer text-zinc-400 transition hover:text-white";

function getButtonClassName(
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
) {
  const sizeStyles =
    size === "small" ? "px-4 py-2.5 text-sm" : "px-5 py-3";

  return [baseStyles, sizeStyles, fullWidth && "w-full", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  size = "medium",
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={getButtonClassName(size, fullWidth, className)}
    />
  );
}

export function TextButton({
  className,
  type = "button",
  ...props
}: TextButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={[textControlStyles, className].filter(Boolean).join(" ")}
    />
  );
}

export function TextLink({
  className,
  ...props
}: TextLinkProps) {
  return (
    <Link
      {...props}
      className={[
        textControlStyles,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
