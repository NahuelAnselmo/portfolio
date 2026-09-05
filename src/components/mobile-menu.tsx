"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type MobileMenuProps = {
  items: readonly { href: string; label: string }[];
  openLabel: string;
  closeLabel: string;
};

export function MobileMenu({ items, openLabel, closeLabel }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div
      className="md:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          close();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="menu-trigger"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? "×" : "☰"}</span>
      </button>
      <ul id="mobile-navigation" hidden={!open} className="mobile-navigation">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={close}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
