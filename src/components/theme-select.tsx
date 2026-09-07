"use client";

import { useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const key = "portfolio-theme";
const eventName = "portfolio-theme-change";

function normalize(value: string | null | undefined): Theme {
  return value === "light" || value === "dark" ? value : "system";
}

function snapshot(): Theme {
  return normalize(document.documentElement.dataset.themePreference);
}

function apply(preference: Theme) {
  const root = document.documentElement;
  root.dataset.themePreference = preference;
  root.dataset.theme =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
}

function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const sync = () => {
    apply(snapshot());
    notify();
  };
  const storage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      apply(normalize(event.newValue));
      notify();
    }
  };
  media.addEventListener("change", sync);
  window.addEventListener(eventName, sync);
  window.addEventListener("storage", storage);
  return () => {
    media.removeEventListener("change", sync);
    window.removeEventListener(eventName, sync);
    window.removeEventListener("storage", storage);
  };
}

export function ThemeSelect({
  labels,
}: {
  labels: Record<Theme | "label", string>;
}) {
  const preference = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "system" as const,
  );
  return (
    <label className="theme-control">
      <span className="sr-only">{labels.label}</span>
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4v16a8 8 0 0 0 0-16Z" fill="currentColor" />
      </svg>
      <select
        value={preference}
        onChange={(event) => {
          const next = normalize(event.target.value);
          apply(next);
          try {
            localStorage.setItem(key, next);
          } catch {
            /* La preferencia sigue funcionando durante esta visita. */
          }
          window.dispatchEvent(new Event(eventName));
        }}
      >
        <option value="system">{labels.system}</option>
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
    </label>
  );
}
