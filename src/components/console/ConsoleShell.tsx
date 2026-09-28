import type { ReactNode } from "react";
import { BrandMark } from "@/components/site/BrandMark";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth/AuthProvider";
import { useTheme } from "@/lib/theme/ThemeProvider";

export type ConsoleNavGroup = {
  label: string;
  items: { id: string; label: string; hint?: string }[];
};

/**
 * Shell dos consoles (/admin e /empresa).
 * O /admin mantém a plataforma; o /empresa recebe a marca do tenant.
 */
export function ConsoleShell({
  kicker,
  title,
  nav,
  active,
  onNavigate,
  brand,
  children,
  footer,
}: {
  kicker: string;
  title: string;
  nav: ConsoleNavGroup[];
  active: string;
  onNavigate: (id: string) => void;
  brand?: { name: string; logoUrl?: string | null; darkLogoUrl?: string | null; accent?: string | null } | null;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { signOut, user } = useAuth();
  const { resolved, setChoice } = useTheme();

  const navList = (
    <nav className="space-y-5">
      {nav.map((group) => (
        <div key={group.label}>
          <p className="px-2 pb-1.5 text-[10.5px] font-medium uppercase tracking-[0.09em] c-muted">
            {group.label}
          </p>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <button
                key={item.id}
                type="button"
                className="c-nav-item"
                data-active={active === item.id}
                aria-current={active === item.id ? "page" : undefined}
                onClick={() => onNavigate(item.id)}
              >
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="admin-console" data-tenant-branded={brand ? "true" : "false"}>
      <header
        className="sticky top-0 z-40 backdrop-blur"
        style={{
          background: "color-mix(in oklab, var(--c-surface) 88%, transparent)",
        }}
      >
        <div className="site-container-wide console-header-grid grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-2.5">
          <div className="flex min-w-0 items-center gap-3">
            <Link to={brand ? "/academy/inicio" : "/"} aria-label={`${brand?.name ?? "SíndicoLab"} — página inicial`} className="shrink-0">
              {brand?.logoUrl || brand?.darkLogoUrl ? (
                <img src={(resolved === "dark" ? brand.darkLogoUrl : brand.logoUrl) ?? brand.logoUrl ?? brand.darkLogoUrl ?? ""} alt={brand.name} className="h-12 w-auto max-w-[180px] object-contain sm:h-14 sm:max-w-[240px]" />
              ) : <BrandMark size={28} variant={resolved === "dark" ? "white-blue" : "black-blue"} />}
            </Link>
            <div className="min-w-0 leading-tight">
              <p className="truncate text-sm font-medium">{title}</p>
              <p className="truncate text-[11px] uppercase tracking-[0.1em] c-muted">{kicker}</p>
            </div>
          </div>

          <div className="console-header-actions flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label={resolved === "dark" ? "Usar tema claro" : "Usar tema escuro"}
              className="c-btn min-h-11 min-w-11"
              data-variant="ghost"
              onClick={() => setChoice(resolved === "dark" ? "light" : "dark")}
            >
              {resolved === "dark" ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2z" />
                </svg>
              )}
            </button>
            {user?.email && (
              <span className="hidden max-w-[200px] truncate px-2 text-xs c-muted lg:inline">
                {user.email}
              </span>
            )}
            <Link to="/academy/inicio" className="c-btn" data-variant="ghost" data-size="sm">
              Ir para a Academy
            </Link>
            <button onClick={signOut} className="c-btn" data-variant="secondary" data-size="sm">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="site-container-wide console-layout grid lg:grid-cols-[228px_minmax(0,1fr)]">
        <aside className="console-sidebar lg:sticky lg:top-[68px] lg:h-fit">
          {navList}
          {footer && <div className="mt-6 border-t c-divide pt-4 text-xs c-muted">{footer}</div>}
        </aside>
        <main className="console-main min-w-0 pb-16">{children}</main>
      </div>
    </div>
  );
}
