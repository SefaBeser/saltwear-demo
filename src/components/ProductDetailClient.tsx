"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { addToCart, getFavorites, toggleFavorite as toggleFavoriteStorage } from "@/lib/shop-storage";

type ProductDetailClientProps = {
  product: Product;
};

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const gallery = useMemo(
    () => (product.images?.length ? product.images : [product.imageUrl]),
    [product.images, product.imageUrl],
  );

  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const syncFavoriteFromStorage = useCallback(() => {
    setIsFavorite(getFavorites().includes(product.id));
  }, [product.id]);

  useEffect(() => {
    syncFavoriteFromStorage();
    window.addEventListener("saltwear:storage-updated", syncFavoriteFromStorage);
    return () => window.removeEventListener("saltwear:storage-updated", syncFavoriteFromStorage);
  }, [syncFavoriteFromStorage]);

  useEffect(() => {
    setSelectedImage(gallery[0]);
  }, [gallery]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      size: selectedSize || undefined,
    });

    setCartMessage(
      selectedSize
        ? `${product.name} (${selectedSize}) sepete eklendi.`
        : `${product.name} sepete eklendi.`,
    );

    setTimeout(() => {
      setCartMessage("");
    }, 2200);
  };

  const handleToggleFavorite = () => {
    const next = toggleFavoriteStorage(product.id);
    setIsFavorite(next.includes(product.id));
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-[2rem] bg-neutral-100">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
            priority
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {gallery.map((imgSrc) => {
            const isActive = selectedImage === imgSrc;

            return (
              <button
                key={imgSrc}
                type="button"
                onClick={() => setSelectedImage(imgSrc)}
                className={`relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border transition ${
                  isActive
                    ? "border-sky-600 ring-2 ring-sky-200"
                    : "border-transparent hover:border-sky-200"
                }`}
              >
                <Image
                  src={imgSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 200px"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-sky-700">
          SaltWear
        </p>

        <h1 className="mb-4 font-display text-4xl text-slate-800 sm:text-5xl">
          {product.name}
        </h1>

        <p className="mb-6 text-3xl font-semibold text-sky-800">₺{product.price}</p>

        <p className="mb-8 max-w-xl text-lg leading-8 text-neutral-600">{product.description}</p>

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
            Beden
          </p>

          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => {
              const active = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[58px] rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "border-sky-700 bg-sky-700 text-white"
                      : "border-sky-200 bg-white text-slate-700 hover:bg-sky-50"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-sky-700 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90"
          >
            Sepete Ekle
          </button>

          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`rounded-full border px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition ${
              isFavorite
                ? "border-sky-700 bg-sky-700 text-white"
                : "border-sky-200 text-slate-700 hover:bg-sky-50"
            }`}
          >
            {isFavorite ? "Favorilere Eklendi" : "Favorilere Ekle"}
          </button>
        </div>

        {cartMessage ? (
          <p className="mb-8 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {cartMessage}
          </p>
        ) : null}

        <div className="rounded-[1.5rem] border border-sky-100 bg-white/80 p-6">
          <h2 className="mb-3 text-lg font-semibold text-slate-800">Ürün Detayı</h2>
          <ul className="space-y-2 text-sm leading-7 text-neutral-600">
            <li>• Yaz sezonuna uygun hafif ve ferah kullanım</li>
            <li>• Günlük kullanım ve sahil kombinleri için ideal</li>
            <li>• SaltWear yaz koleksiyonunun seçili parçası</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
