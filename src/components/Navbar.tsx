"use client";

import { useEffect, useState } from "react";
import { IconCart, IconClose, IconHeart, IconMenu, IconSearch } from "./icons";

const navLinks = [
  { href: "#hero", label: "Ana Sayfa" },
  { href: "#koleksiyon", label: "Koleksiyon" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
];

type NavbarProps = {
  cartCount: number;
  favoriteCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
};

export function Navbar({
  cartCount,
  favoriteCount,
  onOpenSearch,
  onOpenCart,
  onOpenFavorites,
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-sea-100/80 bg-white/90 shadow-soft backdrop-blur-md"
          : "border-b border-white/30 bg-white/55 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <a
          href="#hero"
          className="font-display text-2xl font-medium tracking-tight text-[var(--heading)] transition hover:opacity-80"
        >
          SaltWear
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Ana menü">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-medium text-neutral-600 transition hover:text-sea-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            onClick={onOpenSearch}
            className="rounded-full p-2.5 text-neutral-700 transition hover:bg-sea-50"
            aria-label="Arama"
          >
            <IconSearch className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative rounded-full p-2.5 text-neutral-700 transition hover:bg-sea-50"
            aria-label="Favoriler"
          >
            <IconHeart className="h-5 w-5" />
            {favoriteCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sea-600 px-1 text-[10px] font-semibold text-white">
                {favoriteCount > 9 ? "9+" : favoriteCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={onOpenCart}
            className="relative rounded-full p-2.5 text-neutral-700 transition hover:bg-sea-50"
            aria-label="Sepet"
          >
            <IconCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sea-600 px-1 text-[10px] font-semibold text-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className="rounded-full p-2.5 text-neutral-700 transition hover:bg-sea-50 md:hidden"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen(!open)}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-sea-100 bg-shell-50/95 px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobil menü">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-base font-medium text-[var(--heading)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
