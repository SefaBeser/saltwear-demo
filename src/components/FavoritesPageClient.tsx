"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";
import { addToCart, getCart, getFavorites, saveCart, toggleFavorite } from "@/lib/shop-storage";
import type { CartLine } from "./CartDrawer";
import { CartDrawer } from "./CartDrawer";
import { ProductDetailNav } from "./ProductDetailNav";
import { ProductGrid } from "./ProductGrid";
import { SizePickerModal } from "./SizePickerModal";

type FavoritesPageClientProps = {
  products: Product[];
};

export function FavoritesPageClient({ products }: FavoritesPageClientProps) {
  const router = useRouter();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => new Set());
  const [sizePickerOpen, setSizePickerOpen] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [pendingSize, setPendingSize] = useState("");

  const productsById = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((product) => map.set(product.id, product));
    return map;
  }, [products]);

  const syncFromStorage = useCallback(() => {
    const storedCart = getCart();
    const favorites = getFavorites();
    setFavoriteIds(new Set(favorites));
    setCartLines(
      storedCart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      })),
    );
  }, []);

  useEffect(() => {
    syncFromStorage();
    window.addEventListener("saltwear:storage-updated", syncFromStorage);
    window.addEventListener("focus", syncFromStorage);
    return () => {
      window.removeEventListener("saltwear:storage-updated", syncFromStorage);
      window.removeEventListener("focus", syncFromStorage);
    };
  }, [syncFromStorage]);

  const favoriteProducts = useMemo(
    () => products.filter((product) => favoriteIds.has(product.id)),
    [products, favoriteIds],
  );

  const handleToggleFavorite = (productId: string) => {
    const next = toggleFavorite(productId);
    setFavoriteIds(new Set(next));
  };

  const handleAddToCart = (product: Product) => {
    const preselectedSize = product.sizes.length === 1 ? product.sizes[0] : "";
    setPendingProduct(product);
    setPendingSize(preselectedSize);
    setSizePickerOpen(true);
  };

  const confirmAddToCart = () => {
    if (!pendingProduct || !pendingSize) return;

    addToCart({
      id: pendingProduct.id,
      name: pendingProduct.name,
      price: pendingProduct.price,
      imageUrl: pendingProduct.imageUrl,
      size: pendingSize,
    });
    syncFromStorage();
    setCartOpen(true);
    setSizePickerOpen(false);
    setPendingProduct(null);
    setPendingSize("");
  };

  const updateQuantity = (productId: string, size: string | undefined, quantity: number) => {
    const current = getCart();
    const next = current
      .map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      )
      .filter((item) => item.quantity > 0);
    saveCart(next);
    syncFromStorage();
  };

  const updateLineSize = (productId: string, currentSize: string | undefined, nextSize: string) => {
    const current = getCart();
    if (!nextSize) {
      const reset = current.map((item) =>
        item.id === productId && item.size === currentSize ? { ...item, size: undefined } : item,
      );
      saveCart(reset);
      syncFromStorage();
      return;
    }

    const merged: typeof current = [];
    for (const item of current) {
      if (item.id === productId && item.size === currentSize) {
        const duplicate = merged.find((m) => m.id === item.id && m.size === nextSize);
        if (duplicate) {
          duplicate.quantity += item.quantity;
        } else {
          merged.push({ ...item, size: nextSize });
        }
      } else {
        const existing = merged.find((m) => m.id === item.id && m.size === item.size);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          merged.push({ ...item });
        }
      }
    }

    saveCart(merged);
    syncFromStorage();
  };

  const removeLine = (productId: string, size: string | undefined) => {
    const current = getCart();
    const next = current.filter((item) => !(item.id === productId && item.size === size));
    saveCart(next);
    syncFromStorage();
  };

  const checkout = () => {
    window.alert("Bu demo projede gerçek ödeme sistemi bulunmamaktadır.");
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7faf9_0%,#fffdf8_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <ProductDetailNav />
        <div className="rounded-2xl border border-sea-100/80 bg-white/80 p-5 shadow-innerWarm">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-sea-600">
            Favoriler
          </p>
          <h1 className="mt-2 font-display text-3xl text-[var(--heading)]">Favori ürünlerim</h1>
        </div>

        <ProductGrid
          products={favoriteProducts}
          filter={null}
          onClearFilter={() => router.push("/")}
          favorites={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
          onAddToCart={handleAddToCart}
        />

        <CartDrawer
          open={cartOpen}
          lines={cartLines}
          productsById={productsById}
          onClose={() => setCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onUpdateSize={updateLineSize}
          onRemove={removeLine}
          onCheckout={checkout}
        />

        <SizePickerModal
          open={sizePickerOpen}
          product={pendingProduct}
          selectedSize={pendingSize}
          onSelectSize={setPendingSize}
          onClose={() => {
            setSizePickerOpen(false);
            setPendingProduct(null);
            setPendingSize("");
          }}
          onConfirm={confirmAddToCart}
        />
      </div>
    </main>
  );
}
