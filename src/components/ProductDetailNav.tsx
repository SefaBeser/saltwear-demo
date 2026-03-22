"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "@/lib/shop-storage";
import { IconCart } from "./icons";

export function ProductDetailNav() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const sync = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    sync();
    window.addEventListener("saltwear:storage-updated", sync);
    return () => window.removeEventListener("saltwear:storage-updated", sync);
  }, []);

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-sky-100 pb-5">
      <Link
        href="/"
        className="font-display text-3xl text-slate-800 transition hover:opacity-80"
      >
        SaltWear
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-base font-semibold text-slate-700 transition hover:text-sky-700"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/#urunler"
          className="relative inline-flex items-center gap-2 text-base font-semibold text-slate-700 transition hover:text-sky-700"
          aria-label={`Sepet, ${cartCount} ürün`}
        >
          <IconCart className="h-5 w-5" />
          <span>Sepet</span>
          {cartCount > 0 ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-700 px-1.5 text-xs font-bold text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          ) : null}
        </Link>
      </div>
    </div>
  );
}
