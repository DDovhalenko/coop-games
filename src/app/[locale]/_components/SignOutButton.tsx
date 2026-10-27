import { endSession } from "../../actions";
import type { AppLocale } from "../../../i18n/routing";

type SignOutButtonProps = {
  locale: AppLocale;
  label: string;
  className?: string;
};

export function SignOutButton({ locale, label, className }: SignOutButtonProps) {
  const signOutAction = endSession.bind(null, locale);

  return (
    <form action={signOutAction}>
      <button className={className ?? "text-sm text-zinc-400 hover:text-white"}>
        {label}
      </button>
    </form>
  );
}
