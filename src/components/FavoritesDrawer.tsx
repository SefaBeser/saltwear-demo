"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { formatTry } from "@/lib/format";
import { IconClose, IconHeart } from "./icons";

type FavoritesDrawerProps = {
  open: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onGoToFavoritesPage: () => void;
};

export function FavoritesDrawer({
  open,
  onClose,
  items,
  onRemove,
  onGoToFavoritesPage,
}: FavoritesDrawerProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-[70] bg-sea-900/30 backdrop-blur-[2px] transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-gradient-to-b from-white to-cream-50/80 shadow-soft-lg transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Favoriler"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-sea-100 px-5 py-4">
          <h2 className="font-display text-xl text-sea-900">Favoriler</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Kapat"
          >
            <IconClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-neutral-600">
              Henüz favori ürün eklemediniz. Ürün kartlarındaki kalp ikonunu kullanın.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((p) => (
                <li
                  key={p.id}
                  className="flex gap-4 rounded-xl border border-neutral-100 p-3 transition hover:border-neutral-200"
                >
                  <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                    <Image src={p.imageUrl} alt={p.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sea-900">{p.name}</p>
                    <p className="mt-1 text-sm text-neutral-600">{formatTry(p.price)}</p>
                    <button
                      type="button"
                      onClick={() => onRemove(p.id)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                    >
                      <IconHeart className="h-4 w-4" filled />
                      Kaldır
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-sea-100 px-5 py-4">
          <button
            type="button"
            onClick={() => {
              onGoToFavoritesPage();
              onClose();
            }}
            className="w-full rounded-full border border-sea-300/90 bg-white/95 py-3 text-sm font-medium tracking-wide text-sea-900 shadow-innerWarm transition hover:border-sea-500 hover:bg-sea-50"
          >
            Ürünlere git
          </button>
        </div>
      </aside>
    </>
  );
}
