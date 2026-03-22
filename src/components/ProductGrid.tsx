"use client";

import type { CategoryId, Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  filter: CategoryId | null;
  onClearFilter: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (product: Product) => void;
};

export function ProductGrid({
  products,
  filter,
  onClearFilter,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: ProductGridProps) {
  const list = products;

  const filterLabel: Record<CategoryId, string> = {
    kadın: "Kadın",
    erkek: "Erkek",
    aksesuar: "Aksesuar",
  };

  return (
    <section
      id="urunler"
      className="scroll-mt-28 bg-gradient-to-b from-transparent via-sea-50/20 to-shell-50/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 border-b border-sea-100/60 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sea-600">
              Mağaza
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[var(--heading)] sm:text-4xl lg:text-[2.75rem]">
              Yaz seçkisi
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-neutral-600">
              keten, hasır ve açık tonlarda plaj ve akşam için.
            </p>
          </div>
          {filter && (
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-sans text-sm text-neutral-500">
                Filtre:{" "}
                <span className="font-medium text-sea-800">{filterLabel[filter]}</span>
              </span>
              <button
                type="button"
                onClick={onClearFilter}
                className="rounded-full border border-sea-200/80 bg-white px-6 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-sea-800 shadow-innerWarm transition hover:border-sea-300"
              >
                Tümünü göster
              </button>
            </div>
          )}
        </div>

        {list.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-dashed border-sea-200/70 bg-white/80 px-8 py-16 text-center font-sans text-neutral-600 shadow-innerWarm">
            Arama veya filtre kriterlerinize uygun ürün bulunamadı. Aramayı temizleyin veya farklı bir
            kategori deneyin.
          </p>
        ) : (
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFavorite={() => onToggleFavorite(product.id)}
                onAddToCart={() => onAddToCart(product)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
