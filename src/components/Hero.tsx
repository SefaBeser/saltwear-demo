"use client";

import Image from "next/image";
import { scrollToPageSection } from "@/lib/in-page-nav";

type HeroProps = {
  onYazSecimi: () => void;
};

const heroImage = "/images/tasar.jpg";

export function Hero({ onYazSecimi }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-shell-50 lg:min-h-screen"
    >
      <div className="grid min-h-[100svh] lg:min-h-screen lg:grid-cols-2 lg:items-stretch">
        {/* Metin — ferah, editorial yerleşim */}
        <div className="relative z-10 flex flex-col justify-center px-6 pb-16 pt-28 sm:px-10 sm:pb-20 sm:pt-32 lg:order-1 lg:px-12 lg:pb-24 lg:pl-14 lg:pr-10 xl:pl-20 xl:pr-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sea-50/90 via-shell-50/95 to-cream-50/90 lg:from-shell-50 lg:via-cream-50/80 lg:to-transparent" />
          <div className="relative max-w-xl">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.45em] text-sea-600/90">
              SaltWear
            </p>
            <h1 className="mt-6 font-display text-display-sm font-medium text-[var(--heading)] sm:text-display lg:text-display-lg">
              SaltWear ile yazın en hafif halini keşfedin
            </h1>
            <p className="mt-8 font-sans text-base font-normal leading-[1.75] text-neutral-600 sm:text-lg">
              SaltWear, kıyı yaşamından ilham alarak doğal kumaşlar ve özenli kesimlerle plajdan gün
              batımına uzanan bir gardırop sunar. Sınırlı sayıda, zamansız parçalar.
            </p>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <button
                type="button"
                className="inline-flex h-12 items-center justify-center rounded-full bg-sea-600 px-10 font-sans text-sm font-medium tracking-wide text-white shadow-hero transition hover:bg-sea-500"
                onClick={() => scrollToPageSection("koleksiyon")}
              >
                Koleksiyonu Keşfet
              </button>
              <button
                type="button"
                onClick={onYazSecimi}
                className="inline-flex h-12 items-center justify-center rounded-full border border-sea-300/60 bg-white/90 px-10 font-sans text-sm font-medium tracking-wide text-sea-800 shadow-innerWarm backdrop-blur-sm transition hover:border-lagoon-400 hover:bg-white"
              >
                Yaz Seçkisi
              </button>
            </div>
          </div>
        </div>

        {/* Görsel — büyük beachwear alanı */}
        <div className="relative min-h-[52vh] lg:order-2 lg:min-h-screen">
          <Image
            src={heroImage}
            alt="Sahil ve yaz"
            fill
            priority
            className="object-cover object-[center_42%]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shell-50/90 via-transparent to-sea-100/20 lg:bg-gradient-to-l lg:from-transparent lg:via-sea-50/10 lg:to-shell-50/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-sea-900/5" />

          {/* Köşe etiketi — editorial */}
          <div className="absolute bottom-8 left-6 right-6 font-sans text-xs font-medium uppercase tracking-[0.25em] text-white/95 drop-shadow-md sm:left-auto sm:right-10 sm:text-right lg:bottom-12">
            <span className="rounded-full bg-white/20 px-4 py-2 backdrop-blur-md">
          
            </span>
          </div>
        </div>
      </div>

      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-sea-200/60 to-transparent" />
    </section>
  );
}
