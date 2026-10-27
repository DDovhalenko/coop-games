"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { refreshNicknameSession } from "../../actions";

export function NicknameSessionRefresh() {
  const router = useRouter();
  const refreshed = useRef(false);

  useEffect(() => {
    if (refreshed.current) return;
    refreshed.current = true;

    void refreshNicknameSession()
      .then(() => router.refresh())
      .catch((error: unknown) => {
        console.error("Failed to refresh the nickname session claim.", error);
      });
  }, [router]);

  return null;
}
