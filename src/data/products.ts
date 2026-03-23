export type CategoryId = "kadın" | "erkek" | "aksesuar";
export type CategorySlug = "kadin" | "erkek" | "aksesuar";

const categoryToSlug: Record<CategoryId, CategorySlug> = {
  kadın: "kadin",
  erkek: "erkek",
  aksesuar: "aksesuar",
};

const slugToCategory: Record<CategorySlug, CategoryId> = {
  kadin: "kadın",
  erkek: "erkek",
  aksesuar: "aksesuar",
};

export function categoryIdToSlug(categoryId: CategoryId): CategorySlug {
  return categoryToSlug[categoryId];
}

export function categorySlugToId(categorySlug: string): CategoryId | null {
  if (categorySlug === "kadin" || categorySlug === "erkek" || categorySlug === "aksesuar") {
    return slugToCategory[categorySlug];
  }
  return null;
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  imageUrl: string;
  images: string[];
  sizes: string[];
};

/** public/images içindeki dosya adı (uzantısız) → /images/...jpg */
const img = (filename: string) => `/images/${filename}.jpg`;

/** SaltWear yaz koleksiyonu — görseller public/images ile aynı isimde olmalı */
export const products: Product[] = [
  {
    id: "sw-01",
    slug: "erkek-cicekli-gomlek",
    name: "Erkek Çiçekli Gömlek",
    description:
      "Pamuklu dokuda çiçek deseni; Ege akşamı için hafif ve nefes alan bir üst.",
    price: 1299,
    category: "erkek",
    imageUrl: img("erkek-gomlek"),
    images: [img("erkek-gomlek"), img("erkek-gomlek2"), img("erkek-gomlek3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-02",
    slug: "erkek-keten-sort",
    name: "Erkek Keten Şort",
    description: "Doğal keten, rahat bel ve plajdan iskeleye uzanan sade siluet.",
    price: 899,
    category: "erkek",
    imageUrl: img("erkek-keten-sort"),
    images: [img("erkek-keten-sort"), img("erkek-keten-sort2"), img("erkek-keten-sort3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-03",
    slug: "kadin-yazlik-gomlek",
    name: "Kadın Yazlık Gömlek",
    description: "Bol kesim, yumuşak kumaş; pareo üstü veya gün batımı yürüyüşü için.",
    price: 949,
    category: "kadın",
    imageUrl: img("kadin-yaz-gomlek"),
    images: [img("kadin-yaz-gomlek"), img("kadin-yaz-gomlek2"), img("kadin-yaz-gomlek3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-04",
    slug: "kadin-plaj-sortu",
    name: "Kadın Plaj Şortu",
    description: "Hızlı kuruyan yapı; kum ve deniz arasında özgür hareket.",
    price: 749,
    category: "kadın",
    imageUrl: img("kadin-plaj-sort"),
    images: [img("kadin-plaj-sort"), img("kadin-plaj-sort2"), img("kadin-plaj-sort3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-05",
    slug: "hafif-yaz-elbisesi",
    name: "Hafif Yaz Elbisesi",
    description: "Akışkan kesim, ince askı; sıcak akşamlar ve teras sofralarına uygun.",
    price: 1899,
    category: "kadın",
    imageUrl: img("kadin-elbise"),
    images: [img("kadin-elbise"), img("kadin-elbise2"), img("kadin-elbise3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-06",
    slug: "hasir-sapka",
    name: "Hasır Şapka",
    description: "Geniş kenar, doğal doku; güneşe karşı zarif ve hafif koruma.",
    price: 599,
    category: "aksesuar",
    imageUrl: img("kadin-hasir-sapka"),
    images: [img("kadin-hasir-sapka"), img("kadin-hasir-sapka2"), img("kadin-hasir-sapka3")],
    sizes: ["Standart"],
  },
  {
    id: "sw-07",
    slug: "plaj-cantasi",
    name: "Plaj Çantası",
    description: "Örgü ve kum tonları; havlu, kitap ve günlük plaj ihtiyaçları için.",
    price: 1199,
    category: "aksesuar",
    imageUrl: img("hasir-canta"),
    images: [img("hasir-canta"), img("hasir-canta2"), img("hasir-canta3")],
    sizes: ["Standart"],
  },
  {
    id: "sw-08",
    slug: "terlik",
    name: "Terlik",
    description: "Yumuşak taban, minimal kayış; iskele ve kumsalda konforlu adımlar.",
    price: 1399,
    category: "aksesuar",
    imageUrl: img("kadin-terlik"),
    images: [img("kadin-terlik"), img("kadin-terlik2"), img("kadin-terlik3")],
    sizes: ["36", "37", "38", "39", "40"],
  },
];

export const categories: { id: CategoryId; label: string; hint: string }[] = [
  { id: "erkek", label: "Erkek", hint: "Gömlek ve keten şort" },
  { id: "kadın", label: "Kadın", hint: "Yazlık üst, plaj ve elbise" },
  { id: "aksesuar", label: "Aksesuar", hint: "Şapka, çanta ve terlik" },
];
