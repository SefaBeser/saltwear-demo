"use client";

import { FormEvent } from "react";
import { IconClose, IconSearch } from "./icons";

type SearchOverlayProps = {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onSearch: () => void;
  onClose: () => void;
};

export function SearchOverlay({ open, query, onQueryChange, onSearch, onClose }: SearchOverlayProps) {
  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="fixed inset-0 z-[55]" role="dialog" aria-modal="true">
      <button
        type="button"
        className="absolute inset-0 bg-sea-900/25 backdrop-blur-[2px]"
        aria-label="Aramayı kapat"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-sea-100/80 bg-white/95 px-4 py-4 shadow-soft backdrop-blur-md sm:px-6"
      >
        <button
          type="submit"
          className="rounded-full p-2 text-sea-700 transition hover:bg-sea-50"
          aria-label="Ara"
        >
          <IconSearch className="h-5 w-5" />
        </button>
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
      </form>
      <p className="relative mx-auto mt-3 max-w-3xl px-4 text-center text-xs text-sea-800/90 sm:px-6">
        Arama simgesine tıklayın veya Enter ile sonuç sayfasına gidin. Kapatmak için dışarı tıklayın
        veya Esc tuşuna basın.
      </p>
    </div>
  );
}
