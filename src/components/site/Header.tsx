"use client";

import { Suspense, useEffect, useState } from "react";
import { Logo } from "./Logo";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { Search } from "@/components/ui/Icon";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  // Press "/" anywhere to open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement) &&
        !(e.target instanceof HTMLSelectElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50">
        <AnnouncementBar />
        <div className="relative border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur-xl">
          <Container size="wide">
            <div className="flex h-[72px] items-center justify-between gap-4">
              <Logo />
              <Suspense fallback={<nav aria-label="Primary" className="hidden lg:flex" />}>
                <MegaMenu />
              </Suspense>
              <div className="flex items-center gap-2">
                {/* Bigger search affordance — shows like a search field */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search products"
                  className="hidden h-11 items-center gap-3 border border-[var(--line-strong)] bg-white px-4 text-sm text-[var(--ink-3)] transition hover:border-[var(--ink)] hover:text-[var(--ink)] sm:inline-flex"
                >
                  <Search size={15} />
                  <span className="font-medium">Search products</span>
                  <kbd className="ml-2 hidden font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--ink-4)] md:inline">
                    /
                  </kbd>
                </button>
                {/* Compact search button on mobile */}
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search products"
                  className="inline-flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--ink)] sm:hidden"
                >
                  <Search size={16} />
                </button>
                <CartButton />
                <MobileMenu />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
