"use client";

import type { Product } from "@/data/products";

type SizePickerModalProps = {
  open: boolean;
  product: Product | null;
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onClose: () => void;
  onConfirm: () => void;
};

export function SizePickerModal({
  open,
  product,
  selectedSize,
  onSelectSize,
  onClose,
  onConfirm,
}: SizePickerModalProps) {
  if (!open || !product) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[90] bg-sea-900/35 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Beden seçimi"
        className="fixed left-1/2 top-1/2 z-[100] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-soft-lg"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sea-600">Sepete Ekle</p>
        <h3 className="mt-2 font-display text-2xl text-[var(--heading)]">{product.name}</h3>
        <p className="mt-3 text-sm text-neutral-600">Devam etmek için beden seçin.</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.sizes.map((size) => {
            const active = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`min-w-[58px] rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "border-sea-700 bg-sea-700 text-white"
                    : "border-sea-200 bg-white text-slate-700 hover:bg-sea-50"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-full border border-sea-200 bg-white text-xs font-semibold uppercase tracking-[0.12em] text-slate-700"
          >
            Vazgeç
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selectedSize}
            className="h-11 flex-1 rounded-full bg-sea-600 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-sea-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sepete Ekle
          </button>
        </div>
      </div>
    </>
  );
}
