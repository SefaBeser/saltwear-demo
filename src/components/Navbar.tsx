"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryIdToSlug, type CategoryId } from "@/data/products";
import { scrollToPageSection } from "@/lib/in-page-nav";
import { IconCart, IconClose, IconHeart, IconMenu, IconSearch } from "./icons";

const categoryHref = (id: CategoryId) => `/kategori/${categoryIdToSlug(id)}`;

/** Metin gibi görünen düğüm — <a href="#..."> Next.js ile sorun çıkarabiliyor */
const navTextBtnClass =
  "cursor-pointer border-0 bg-transparent p-0 text-left font-sans text-sm font-medium text-neutral-600 transition hover:text-sea-700";

const dropdownPanelClass =
  "absolute left-1/2 top-full z-[60] w-max -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible pointer-events-none";

const dropdownLinkClass =
  "block px-4 py-2.5 font-sans text-sm text-neutral-700 transition hover:bg-sea-50 hover:text-sea-800 first:rounded-t-xl last:rounded-b-xl";

const columnHeadingClass =
  "mb-3 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sea-600";

const megaLinkClass =
  "block py-1.5 font-sans text-sm text-neutral-700 transition hover:text-sea-800";

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
      className={`fixed inset-x-0 top-0 z-50 overflow-visible transition-all duration-300 ${
        scrolled
          ? "border-b border-sea-100/80 bg-white/90 shadow-soft backdrop-blur-md"
          : "border-b border-white/30 bg-white/55 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 overflow-visible px-6 py-4 sm:px-8 lg:px-10">
        <button
          type="button"
          className="inline-flex items-center gap-2 transition hover:opacity-80"
          aria-label="SaltWear ana sayfa"
          onClick={() => scrollToPageSection("hero")}
        >
          <span className="font-display text-2xl font-medium tracking-tight text-[var(--heading)]">
            SaltWear
          </span>
          <span className="relative h-9 w-9 overflow-hidden sm:h-10 sm:w-10" aria-hidden>
            <Image
              src="/images/logoson.png"
              alt=""
              fill
              className="object-contain object-center mix-blend-screen scale-[2.8] translate-y-[7px]"
            />
          </span>
        </button>

        <nav className="hidden items-center gap-8 overflow-visible md:flex" aria-label="Ana menü">
          <button type="button" className={navTextBtnClass} onClick={() => scrollToPageSection("hero")}>
            Ana Sayfa
          </button>

          <div className="group relative py-1">
            <button type="button" className={navTextBtnClass} onClick={() => scrollToPageSection("koleksiyon")}>
              Koleksiyon
            </button>
            <div className={dropdownPanelClass} role="menu" aria-label="Koleksiyon alt menü">
              <div className="min-w-[12.5rem] overflow-hidden rounded-xl border border-sea-100/80 bg-white py-1 shadow-soft-lg ring-1 ring-sea-100/30">
                <Link href={categoryHref("erkek")} className={dropdownLinkClass} role="menuitem">
                  Erkek
                </Link>
                <Link href={categoryHref("kadın")} className={dropdownLinkClass} role="menuitem">
                  Kadın
                </Link>
                <Link href={categoryHref("aksesuar")} className={dropdownLinkClass} role="menuitem">
                  Aksesuar
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative py-1">
            <button type="button" className={navTextBtnClass} onClick={() => scrollToPageSection("urunler")}>
              Ürünler
            </button>
            <div className={dropdownPanelClass} role="menu" aria-label="Ürün grupları">
              <div className="w-[min(92vw,32rem)] overflow-hidden rounded-xl border border-sea-100/80 bg-white p-5 shadow-soft-lg ring-1 ring-sea-100/30">
                <div className="grid grid-cols-3 gap-6 sm:gap-8">
                  <div>
                    <p className={columnHeadingClass}>Erkek</p>
                    <Link href={`${categoryHref("erkek")}?grup=gomlek`} className={megaLinkClass}>
                      Gömlek
                    </Link>
                    <Link href={`${categoryHref("erkek")}?grup=sort`} className={megaLinkClass}>
                      Şort
                    </Link>
                  </div>
                  <div>
                    <p className={columnHeadingClass}>Kadın</p>
                    <Link href={`${categoryHref("kadın")}?grup=gomlek`} className={megaLinkClass}>
                      Gömlek
                    </Link>
                    <Link href={`${categoryHref("kadın")}?grup=sort`} className={megaLinkClass}>
                      Şort
                    </Link>
                    <Link href={`${categoryHref("kadın")}?grup=elbise`} className={megaLinkClass}>
                      Elbise
                    </Link>
                  </div>
                  <div>
                    <p className={columnHeadingClass}>Aksesuar</p>
                    <Link href={`${categoryHref("aksesuar")}?grup=sapka`} className={megaLinkClass}>
                      Şapka
                    </Link>
                    <Link href={`${categoryHref("aksesuar")}?grup=canta`} className={megaLinkClass}>
                      Çanta
                    </Link>
                    <Link href={`${categoryHref("aksesuar")}?grup=terlik`} className={megaLinkClass}>
                      Terlik
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" className={navTextBtnClass} onClick={() => scrollToPageSection("hakkimizda")}>
            Hakkımızda
          </button>
          <button type="button" className={navTextBtnClass} onClick={() => scrollToPageSection("iletisim")}>
            İletişim
          </button>
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
        <div className="max-h-[min(85vh,calc(100dvh-5rem))] overflow-y-auto border-t border-sea-100 bg-shell-50/95 px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobil menü">
            <button
              type="button"
              className="rounded-lg px-2 py-2.5 text-left font-sans text-base font-medium text-[var(--heading)]"
              onClick={() => {
                scrollToPageSection("hero");
                setOpen(false);
              }}
            >
              Ana Sayfa
            </button>

            <div className="rounded-lg border border-sea-100/60 bg-white/60 px-2 py-2">
              <button
                type="button"
                className="block w-full px-2 py-2 text-left font-sans text-sm font-semibold text-sea-800"
                onClick={() => {
                  scrollToPageSection("koleksiyon");
                  setOpen(false);
                }}
              >
                Koleksiyon
              </button>
              <div className="mt-1 flex flex-col border-t border-sea-100/50 pt-2">
                <Link
                  href={categoryHref("erkek")}
                  className="px-2 py-2 font-sans text-base text-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  Erkek
                </Link>
                <Link
                  href={categoryHref("kadın")}
                  className="px-2 py-2 font-sans text-base text-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  Kadın
                </Link>
                <Link
                  href={categoryHref("aksesuar")}
                  className="px-2 py-2 font-sans text-base text-neutral-700"
                  onClick={() => setOpen(false)}
                >
                  Aksesuar
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-sea-100/60 bg-white/60 px-2 py-2">
              <button
                type="button"
                className="block w-full px-2 py-2 text-left font-sans text-sm font-semibold text-sea-800"
                onClick={() => {
                  scrollToPageSection("urunler");
                  setOpen(false);
                }}
              >
                Ürünler
              </button>
              <div className="mt-2 space-y-3 border-t border-sea-100/50 pt-3">
                <div>
                  <p className={`${columnHeadingClass} mb-1 px-2`}>Erkek</p>
                  <Link
                    href={`${categoryHref("erkek")}?grup=gomlek`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Gömlek
                  </Link>
                  <Link
                    href={`${categoryHref("erkek")}?grup=sort`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Şort
                  </Link>
                </div>
                <div>
                  <p className={`${columnHeadingClass} mb-1 px-2`}>Kadın</p>
                  <Link
                    href={`${categoryHref("kadın")}?grup=gomlek`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Gömlek
                  </Link>
                  <Link
                    href={`${categoryHref("kadın")}?grup=sort`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Şort
                  </Link>
                  <Link
                    href={`${categoryHref("kadın")}?grup=elbise`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Elbise
                  </Link>
                </div>
                <div>
                  <p className={`${columnHeadingClass} mb-1 px-2`}>Aksesuar</p>
                  <Link
                    href={`${categoryHref("aksesuar")}?grup=sapka`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Şapka
                  </Link>
                  <Link
                    href={`${categoryHref("aksesuar")}?grup=canta`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Çanta
                  </Link>
                  <Link
                    href={`${categoryHref("aksesuar")}?grup=terlik`}
                    className="block px-2 py-1.5 font-sans text-base text-neutral-700"
                    onClick={() => setOpen(false)}
                  >
                    Terlik
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="rounded-lg px-2 py-2.5 text-left font-sans text-base font-medium text-[var(--heading)]"
              onClick={() => {
                scrollToPageSection("hakkimizda");
                setOpen(false);
              }}
            >
              Hakkımızda
            </button>
            <button
              type="button"
              className="rounded-lg px-2 py-2.5 text-left font-sans text-base font-medium text-[var(--heading)]"
              onClick={() => {
                scrollToPageSection("iletisim");
                setOpen(false);
              }}
            >
              İletişim
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
