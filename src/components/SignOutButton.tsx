import { endSession } from "../app/actions";
import type { AppLocale } from "../i18n/routing";
import { TextButton } from "./Button";

type SignOutButtonProps = {
  locale: AppLocale;
  label: string;
  className?: string;
};

export function SignOutButton({ locale, label, className }: SignOutButtonProps) {
  const signOutAction = endSession.bind(null, locale);

  return (
    <form action={signOutAction}>
      <TextButton type="submit" className={className ?? "text-sm"}>
        {label}
      </TextButton>
    </form>
  );
}
