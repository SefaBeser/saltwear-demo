"use client";

import { IconClose } from "./icons";

type SearchOverlayProps = {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
};

export function SearchOverlay({ open, query, onQueryChange, onClose }: SearchOverlayProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[55]" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-sea-900/25 backdrop-blur-[2px]"
        aria-label="Aramayı kapat"
        onClick={onClose}
      />
      <div className="relative mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-sea-100/80 bg-white/95 px-4 py-4 shadow-soft backdrop-blur-md sm:px-6">
        <label htmlFor="site-arama" className="sr-only">
          Ürün ara
        </label>
        <input
          id="site-arama"
          autoFocus
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ürün adı veya açıklama ara…"
          className="flex-1 border-none bg-transparent text-lg text-sea-900 outline-none placeholder:text-neutral-400"
        />
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-sea-800 transition hover:bg-sea-50"
          aria-label="Aramayı kapat"
        >
          <IconClose className="h-6 w-6" />
        </button>
      </div>
      <p className="relative mx-auto mt-3 max-w-3xl px-4 text-center text-xs text-sea-800/90 sm:px-6">
        Yazdıkça ürün listesi filtrelenir. Kapatmak için dışarı tıklayın veya Esc tuşuna basın.
      </p>
    </div>
  );
}
