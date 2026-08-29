import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-surface/95">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <svg width="20" height="20" viewBox="0 0 22 22" aria-hidden>
              <circle cx="7" cy="7" r="6.5" fill="var(--color-eth)" />
              <circle cx="15" cy="15" r="6.5" fill="var(--color-btc)" />
            </svg>
            <span className="text-base font-medium text-ink-soft">
              ETH <span className="font-normal text-muted">vs</span> BTC
            </span>
          </Link>
          <Link href="/" className="text-sm text-eth hover:underline">
            Back to tracker
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10 sm:px-8">
        <h1 className="text-3xl text-ink">{title}</h1>
        <p className="mt-1 text-sm text-muted">Last updated {updated}</p>
        <div className="legal-prose mt-8 space-y-6 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
      </main>

      <footer className="mt-auto border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-6 text-xs text-muted sm:px-8">
          <Link href="/" className="hover:text-eth">
            ethvbtc.com
          </Link>
        </div>
      </footer>
    </div>
  );
}
