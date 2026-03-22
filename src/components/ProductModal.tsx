"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { formatTry } from "@/lib/format";
import { IconClose } from "./icons";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="urun-detay-baslik"
    >
      <button
        type="button"
        className="absolute inset-0 bg-sea-900/25 backdrop-blur-[3px]"
        aria-label="Kapat"
        onClick={onClose}
      />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-soft-lg ring-1 ring-sea-100/50 md:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full border border-white/80 bg-white/95 p-2 text-sea-800 shadow-soft transition hover:bg-white"
          aria-label="Kapat"
        >
          <IconClose className="h-5 w-5" />
        </button>
        <div className="relative aspect-square w-full bg-sand-100 md:max-w-md md:aspect-auto md:min-h-[440px]">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-5 overflow-y-auto bg-gradient-to-br from-white to-shell-50/80 p-6 sm:p-10">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-sea-600">
            Ürün
          </p>
          <h2 id="urun-detay-baslik" className="font-display text-2xl font-medium text-[var(--heading)] sm:text-3xl">
            {product.name}
          </h2>
          <p className="font-sans text-base leading-relaxed text-neutral-600">{product.description}</p>
          <p className="font-sans text-2xl font-semibold tracking-wide text-sea-800">{formatTry(product.price)}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="rounded-full bg-sea-600 px-8 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:bg-sea-500"
            >
              Sepete Ekle
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-sea-200/90 bg-white px-8 py-2.5 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-sea-900 shadow-innerWarm transition hover:border-sea-300"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
