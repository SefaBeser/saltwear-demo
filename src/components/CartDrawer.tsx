"use client";

import Image from "next/image";
import type { Product } from "@/data/products";
import { formatTry } from "@/lib/format";
import { IconClose } from "./icons";

export type CartLine = { productId: string; quantity: number; size?: string };

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  lines: CartLine[];
  productsById: Map<string, Product>;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
};

export function CartDrawer({
  open,
  onClose,
  lines,
  productsById,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const total = lines.reduce((sum, line) => {
    const p = productsById.get(line.productId);
    if (!p) return sum;
    return sum + p.price * line.quantity;
  }, 0);

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
        aria-label="Sepet"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-sea-100 px-5 py-4">
          <h2 className="font-display text-xl text-sea-900">Sepetim</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Sepeti kapat"
          >
            <IconClose className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <p className="mt-8 text-center text-neutral-600">Sepetiniz şu an boş.</p>
          ) : (
            <ul className="space-y-6">
              {lines.map((line) => {
                const product = productsById.get(line.productId);
                if (!product) return null;
                return (
                  <li key={line.productId} className="flex gap-4 border-b border-neutral-100 pb-6">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-sand-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sea-900">{product.name}</p>
                      <p className="mt-1 text-sm text-neutral-600">{formatTry(product.price)}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-neutral-200">
                          <button
                            type="button"
                            className="px-3 py-1 text-lg leading-none text-neutral-700"
                            onClick={() =>
                              onUpdateQuantity(line.productId, Math.max(1, line.quantity - 1))
                            }
                            aria-label="Adet azalt"
                          >
                            −
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            className="px-3 py-1 text-lg leading-none text-neutral-700"
                            onClick={() => onUpdateQuantity(line.productId, line.quantity + 1)}
                            aria-label="Adet artır"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemove(line.productId)}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-sea-100 bg-cream-50 px-5 py-5">
          <div className="flex items-center justify-between text-lg font-semibold text-sea-900">
            <span>Toplam</span>
            <span>{formatTry(total)}</span>
          </div>
          <button
            type="button"
            onClick={onCheckout}
            disabled={lines.length === 0}
            className="mt-4 w-full rounded-full bg-gradient-to-b from-sea-600 to-sea-700 py-3 text-sm font-medium tracking-wide text-white shadow-soft transition hover:from-sea-500 hover:to-sea-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ödeme Yap
          </button>
        </div>
      </aside>
    </>
  );
}
