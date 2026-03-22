"use client";
import Link from "next/link";


import Image from "next/image";
import type { Product } from "@/data/products";
import { formatTry } from "@/lib/format";
import { IconHeart } from "./icons";

type ProductCardProps = {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onAddToCart: () => void;
};

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article
      id={`urun-${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-sea-100/30 transition duration-500 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-sea-50/50 to-sand-100/80">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(47,79,92,0.06)_100%)]" />
        <button
          type="button"
          onClick={onToggleFavorite}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/90 text-sea-700 shadow-soft backdrop-blur-sm transition hover:bg-white"
          aria-label={isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
          aria-pressed={isFavorite}
        >
          <IconHeart className="h-[1.125rem] w-[1.125rem]" filled={isFavorite} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-6 sm:px-7">
        <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sea-500">
          SaltWear
        </p>
        <h3 className="mt-3 font-display text-xl font-medium leading-snug tracking-tight text-[var(--heading)] sm:text-[1.35rem]">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-2 font-sans text-sm font-normal leading-relaxed text-neutral-600">
          {product.description}
        </p>
        <p className="mt-5 font-sans text-base font-semibold tracking-wide text-sea-800">
          {formatTry(product.price)}
        </p>
        <div className="mt-7 flex flex-row gap-3">
          <Link
            href={`/urunler/${product.slug}`}
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full border border-sea-200/80 bg-shell-50/80 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:bg-white"
          >
            İncele
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
            className="h-11 min-w-0 flex-1 rounded-full bg-sea-600 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-soft transition hover:bg-sea-500"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </article>
  );
}
