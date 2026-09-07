import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { MobileMenu } from "./mobile-menu";
import { ThemeSelect } from "./theme-select";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label={portfolio.labels.home} className="wordmark">
          na<span aria-hidden="true">.</span>
        </Link>
        <div className="flex items-center gap-3 lg:gap-6">
          <nav aria-label={portfolio.labels.navigation}>
            <ul className="hidden items-center gap-7 md:flex">
              {portfolio.navigation.map((item) => (
                <li key={item.href}>
                  <Link className="nav-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MobileMenu
              items={portfolio.navigation}
              openLabel={portfolio.labels.menu}
              closeLabel={portfolio.labels.closeMenu}
            />
          </nav>
          <ThemeSelect labels={portfolio.labels.theme} />
        </div>
      </div>
    </header>
  );
}
