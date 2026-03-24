"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";
import { addToCart, getFavorites, toggleFavorite as toggleFavoriteStorage } from "@/lib/shop-storage";

type ProductDetailClientProps = {
  product: Product;
};

type ProductInfoContent = {
  detailLines: string[];
  materialsLines: string[];
};

const PRODUCT_INFO: Record<string, ProductInfoContent> = {
  "erkek-cicekli-gomlek": {
    detailLines: [
      "Yarı transparan dökümlü kumaştan relaxed fit gömlek.",
      "Bisiklet yaka ve omuzdan bağlamalı kısa kollu.",
      "Göğüste yama cepler.",
    ],
    materialsLines: [
      "MALZEMELER",
      "DIŞ",
      "100% viskoz",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Düşük sıcaklık ve az devirli yıkama giysilerin rengini, şeklini ve kumaş yapısını korumaya yardımcı olarak giysilere daha narin davranır.",
      "",
      "Giysi Bakım Kılavuzu",
      "Çamaşır makinesinde yıkanabileceği maksimum sıcaklık 30°C'lik kısa programda yıkayın",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Maksimum 150 ºC'de ütüleyin",
      "Tetrakloroetilen Kuru Temizleme",
      "Kurutucu kullanılmaz",
    ],
  },
  "erkek-keten-sort": {
    detailLines: [
      "Keten kumaştan relaxed fit bermuda.",
      "Bağcıklı ayarlanabilir elastik bel.",
      "Ön cepler ve yama arka cep detayı.",
    ],
    materialsLines: [
      "MALZEMELER",
      "DIŞ",
      "100% keten",
      "ASTAR",
      "82% polyester",
      "18% pamuk",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Düşük sıcaklık ve az devirli yıkama giysilerin rengini, şeklini ve kumaş yapısını korumaya yardımcı olarak giysilere daha narin davranır.",
      "",
      "Giysi Bakım Kılavuzu",
      "Çamaşır makinesinde yıkanabileceği maksimum sıcaklık 30°C'lik kısa programda yıkayın",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Maksimum 110 ºC'de ütüleyin",
      "Tetrakloroetilen Kuru Temizleme",
      "Kurutucu kullanılmaz",
    ],
  },
  "kadin-yazlik-gomlek": {
    detailLines: [
      "Önü düğmeli, v yaka, uzun kollu, yakalı gömlek.",
      "Fisto işleme detaylı.",
    ],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MALZEMELER",
      "DIŞ",
      "ANA KUMAŞ",
      "81% polyester",
      "19% pamuk",
      "NAKIŞLAR",
      "100% polyester",
      "En az şunları içerir:",
      "DIŞ",
      "ANA KUMAŞ",
      "81% RCS sertifikalı geri dönüştürülmüş polyester",
      "19% OCS sertifikalı organik yetiştirilmiş pamuk",
      "NAKIŞLAR",
      "100% RCS sertifikalı geri dönüştürülmüş polyester",
      "",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Giysilerinizi sadece gerektiğinde yıkayın. Yıkama işlemleri giysileri zamanla yıpratır.",
      "",
      "Giysi Bakım Kılavuzu",
      "Maksimum 30ºC'de elde yıkanır",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Maksimum 110 ºC'de ütüleyin",
      "Kuru temizleme yapılmaz",
      "Kurutucu kullanılmaz",
    ],
  },
  "kadin-plaj-sortu": {
    detailLines: ["İçten düğmeli, metal kopçalı, önü fermuarlı, orta bel şort."],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MALZEMELER",
      "DIŞ",
      "97% pamuk",
      "3% elastan",
      "En az şunları içerir:",
      "DIŞ",
      "97% OCS sertifikalı organik yetiştirilmiş pamuk",
      "",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Düşük sıcaklık ve az devirli yıkama giysilerin rengini, şeklini ve kumaş yapısını korumaya yardımcı olarak giysilere daha narin davranır.",
      "",
      "Giysi Bakım Kılavuzu",
      "Çamaşır makinesinde yıkanabileceği maksimum sıcaklık 40°C'lik kısa programda yıkayın",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Maksimum 150 ºC'de ütüleyin",
      "Tetrakloroetilen Kuru Temizleme",
      "Kurutucu kullanılmaz",
    ],
  },
  "hafif-yaz-elbisesi": {
    detailLines: [
      "Düğmeli önü, kloş etek ucu, dantel aplikeli.",
      "Çiçek desenli, bağcıklı ayarlanabilir uzun kollu ve bağcıklı v yaka.",
      "Pamuk karışımlı kısa elbise.",
    ],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MALZEMELER",
      "DIŞ",
      "ANA KUMAŞ",
      "77% pamuk",
      "23% dut agaci ipegi",
      "DANTEL",
      "100% poliamit",
      "ASTAR",
      "100% polyester",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Giysilerinizi sadece gerektiğinde yıkayın. Yıkama işlemleri giysileri zamanla yıpratır.",
      "",
      "Giysi Bakım Kılavuzu",
      "Maksimum 30ºC'de elde yıkanır",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Maksimum 110 ºC'de ütüleyin",
      "Kuru temizleme yapılmaz",
      "Kurutucu kullanılmaz",
    ],
  },
  "hasir-sapka": {
    detailLines: ["Geniş kenarlı şapka.", "Kontrast uyumlu şerit detaylı.", "Burgu kenarlı bitiş."],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MALZEMELER",
      "DIŞ",
      "100% selüloz kremi",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Ürünleri niteliğine göre kuru bir pamuklu bezle veya yumuşak bir fırçayla temizlemek gibi basit eylemler, onları korumamıza yardımcı olabilir.",
      "",
      "Giysi Bakım Kılavuzu",
      "Yıkanmaz",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Ütülenmez",
      "Kuru temizleme yapılmaz",
      "Kurutucu kullanılmaz",
    ],
  },
  "plaj-cantasi": {
    detailLines: ["Örgü gövdeli maxi tote çanta.", "Ayarlanabilir çift omuz askılı.", "Fermuarlı çıkarılabilir cüzdanlı."],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MİKTAR",
      "Yükseklik: 32.9 cm",
      "Genişlik: 52.62 cm",
      "Uzunluk: 7.2 cm",
      "MALZEMELER",
      "DIŞ",
      "SAP",
      "100% poliüretan",
      "ANA MALZEME",
      "100% kağıt",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Ürünleri niteliğine göre kuru bir pamuklu bez veya yumuşak bir fırçayla temizlemek gibi basit eylemler, onları korumamıza yardımcı olabilir.",
      "",
      "Giysi Bakım Kılavuzu",
      "Yıkanmaz",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Ütülenmez",
      "Kuru temizleme yapılmaz",
      "Kurutucu kullanılmaz",
    ],
  },
  terlik: {
    detailLines: ["Platform sandalet.", "Önü kumaş parmak arası bantlı.", "Kalın platform tabanlı. Yuvarlak burun bitişli."],
    materialsLines: [
      "MALZEMELER VE BAKIM",
      "MALZEMELER",
      "ÜST",
      "100% polyester",
      "ASTAR",
      "100% polyester",
      "TABAN",
      "100% etilen vinil asetat",
      "İÇ TABAN",
      "90% polyester",
      "10% etilen vinil asetat",
      "Ayak üstü",
      "Astar ve iç taban",
      "Ayak tabanı",
      "Deri",
      "Deri yaymak",
      "Tekstil",
      "Diğer malzemeler",
      "BAKIM",
      "Ömrünü uzatmak için giysilerinize özen gösterin.",
      "Ürünleri niteliğine göre kuru bir pamuklu bezle veya yumuşak bir fırçayla temizlemek gibi basit eylemler, onları korumamıza yardımcı olabilir.",
      "",
      "Giysi Bakım Kılavuzu",
      "Yıkanmaz",
      "Suya batırmayın",
      "Çamaşır suyu / beyazlatıcı kullanılmaz",
      "Deri/Rugan. Kuru bir pamuklu bezle temizleyin.",
      "Ütülenmez",
      "Süet/Nubuk/Kalın süet: Yumuşak fırça veya sert süngerle temizleyin.",
      "Kuru temizleme yapılmaz",
      "Deri. Renksiz veya derinin rengine uygun cilalar kullanılabilir.",
      "Kurutucu kullanılmaz",
      "Süet/Nubuk/Kalın süet: Toz önleyici veya nem ve leke önleyici (su tutmayı engelleyen) spreylerle korunabilir.",
    ],
  },
};

function isHeadingLine(line: string) {
  if (!line) return false;
  return !/[a-zçğıöşü]/.test(line);
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const gallery = useMemo(
    () => (product.images?.length ? product.images : [product.imageUrl]),
    [product.images, product.imageUrl],
  );

  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const [materialsOpen, setMaterialsOpen] = useState(false);

  const content = PRODUCT_INFO[product.slug];

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
    <>
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
            <div className="space-y-1 text-sm leading-7 text-neutral-600">
              {(content?.detailLines ?? [
                "Yaz sezonuna uygun hafif ve ferah kullanım.",
                "Günlük kullanım ve sahil kombinleri için ideal.",
                "SaltWear yaz koleksiyonunun seçili parçası.",
              ]).map((line, idx) => (
                <p key={`detail-${idx}`}>{line}</p>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setMaterialsOpen(true)}
              className="mt-5 rounded-full border border-sky-200 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:bg-sky-50"
            >
              Malzemeler ve Bakım
            </button>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-[90] bg-slate-900/35 backdrop-blur-[2px] transition-opacity ${
          materialsOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!materialsOpen}
        onClick={() => setMaterialsOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 right-0 z-[95] flex w-full max-w-md flex-col bg-gradient-to-b from-white to-sky-50/70 shadow-soft-lg transition-transform duration-300 ${
          materialsOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Malzemeler ve Bakım"
        aria-hidden={!materialsOpen}
      >
        <div className="flex items-center justify-between border-b border-sky-100 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-800">Malzemeler ve Bakım</h2>
          <button
            type="button"
            onClick={() => setMaterialsOpen(false)}
            className="rounded-full p-2 text-neutral-700 transition hover:bg-neutral-100"
            aria-label="Kapat"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5 text-sm leading-7 text-neutral-700">
          {(content?.materialsLines ?? ["Malzeme bilgisi yakında eklenecek."]).map((line, idx) => {
            if (!line) {
              return <div key={`space-${idx}`} className="h-4" />;
            }
            return (
              <p
                key={`${line}-${idx}`}
                className={isHeadingLine(line) ? "font-semibold uppercase tracking-[0.08em] text-slate-900" : ""}
              >
                {line}
              </p>
            );
          })}
        </div>
      </aside>
    </>
  );
}
