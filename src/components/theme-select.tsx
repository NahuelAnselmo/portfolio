"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Theme = "system" | "light" | "dark";
const key = "portfolio-theme";
const eventName = "portfolio-theme-change";
const themes: readonly Theme[] = ["system", "light", "dark"];

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
  const [open, setOpen] = useState(false);
  const control = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<Record<Theme, HTMLButtonElement | null>>({
    system: null,
    light: null,
    dark: null,
  });
  const preference = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "system" as const,
  );

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!control.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  function choose(next: Theme) {
    apply(next);
    try {
      localStorage.setItem(key, next);
    } catch {
      /* La preferencia sigue funcionando durante esta visita. */
    }
    window.dispatchEvent(new Event(eventName));
    setOpen(false);
    trigger.current?.focus();
  }

  function focusOption(theme: Theme) {
    requestAnimationFrame(() => options.current[theme]?.focus());
  }

  function moveFocus(current: Theme, direction: 1 | -1) {
    const index = themes.indexOf(current);
    const next = themes[(index + direction + themes.length) % themes.length];
    options.current[next]?.focus();
  }

  return (
    <div
      ref={control}
      className="theme-control"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="theme-trigger"
        aria-label={`${labels.label}: ${labels[preference]}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="theme-options"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setOpen(true);
            focusOption(preference);
          }
        }}
      >
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
        <span>{labels[preference]}</span>
        <svg
          className="theme-chevron"
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      {open && (
        <div className="theme-menu">
          <p id="theme-options-label" className="theme-menu-label">
            {labels.label}
          </p>
          <div
            id="theme-options"
            role="menu"
            aria-labelledby="theme-options-label"
          >
            {themes.map((theme) => (
              <button
                key={theme}
                ref={(element) => {
                  options.current[theme] = element;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={preference === theme}
                className="theme-option"
                onClick={() => choose(theme)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    moveFocus(theme, event.key === "ArrowDown" ? 1 : -1);
                  }
                  if (event.key === "Home" || event.key === "End") {
                    event.preventDefault();
                    options.current[
                      event.key === "Home" ? "system" : "dark"
                    ]?.focus();
                  }
                }}
              >
                <span className="theme-option-mark" aria-hidden="true" />
                {labels[theme]}
                {preference === theme && (
                  <span className="theme-option-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
