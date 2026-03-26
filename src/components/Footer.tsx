import Image from "next/image";
import Link from "next/link";
import { IconInstagram, IconPinterest, IconTiktok, IconTwitter, IconYoutube } from "./icons";

const linkClass =
  "font-sans text-sm text-neutral-700 transition hover:text-sea-700";

const quickLinks = [
  { href: "#hero", label: "Ana Sayfa" },
  { href: "#urunler", label: "Ürünler" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
  { href: "/teslimat-ve-iade", label: "Teslimat ve İade Şartları" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-sea-100/80 bg-gradient-to-b from-shell-50 via-cream-50/50 to-sea-50/40">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-10">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2">
              <p className="font-display text-3xl font-medium tracking-tight text-[var(--heading)]">
                SaltWear
              </p>
              <span className="relative h-9 w-9 overflow-hidden sm:h-10 sm:w-10" aria-hidden>
                <Image
                  src="/images/logoson.png"
                  alt=""
                  fill
                  className="object-contain object-center mix-blend-screen scale-[2.8] translate-y-[7px]"
                />
              </span>
            </div>
            <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-neutral-600">
              Sahil, plaj ve gün batımı için keten, hasır ve doğal kumaşlar. Tatil rahatlığında,
              sıcak ve samimi bir yaz markası.
            </p>
          </div>
          <div className="md:col-span-3 md:pt-1">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-sea-600">
              Bağlantılar
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 md:pt-1">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-sea-600">
              Sosyal medya
            </p>
            <div className="mt-5 flex gap-5">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sea-600 transition hover:text-sea-800"
                aria-label="Instagram"
              >
                <IconInstagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sea-600 transition hover:text-sea-800"
                aria-label="X"
              >
                <IconTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sea-600 transition hover:text-sea-800"
                aria-label="YouTube"
              >
                <IconYoutube className="h-6 w-6" />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sea-600 transition hover:text-sea-800"
                aria-label="Pinterest"
              >
                <IconPinterest className="h-6 w-6" />
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sea-600 transition hover:text-sea-800"
                aria-label="TikTok"
              >
                <IconTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-16 border-t border-sea-100/70 pt-10 text-center font-sans text-xs tracking-wide text-neutral-500">
          © 2026 SaltWear. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
