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
  const n = categorySlug.trim().toLowerCase();
  /* URL'de bazen unicode "kadın" gelebilir; linklerimiz "kadin" */
  if (n === "kadın" || n === "kadin") return "kadın";
  if (n === "erkek") return "erkek";
  if (n === "aksesuar") return "aksesuar";
  return null;
}

/** Ürünler menüsündeki grup filtrelemesi (URL: ?grup=...) */
export type ProductMenuGroup = "gomlek" | "sort" | "elbise" | "sapka" | "canta" | "terlik";

const MENU_GROUPS = new Set<ProductMenuGroup>(["gomlek", "sort", "elbise", "sapka", "canta", "terlik"]);

/** Next.js searchParams bazen string | string[] döner; güvenli tek string üretir */
export function firstSearchParam(value: string | string[] | undefined | null): string | null {
  if (value == null) return null;
  const s = Array.isArray(value) ? value[0] : value;
  if (typeof s !== "string") return null;
  const t = s.trim();
  return t === "" ? null : t;
}

export function parseMenuGroupParam(value: string | string[] | undefined | null): ProductMenuGroup | null {
  const raw = firstSearchParam(value);
  if (!raw) return null;
  const v = raw.toLowerCase();
  if (v === "gömlek") return "gomlek";
  if (MENU_GROUPS.has(v as ProductMenuGroup)) return v as ProductMenuGroup;
  return null;
}

export const menuGroupLabel: Record<ProductMenuGroup, string> = {
  gomlek: "Gömlek",
  sort: "Şort",
  elbise: "Elbise",
  sapka: "Şapka",
  canta: "Çanta",
  terlik: "Terlik",
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: CategoryId;
  /** Navbar “Ürünler” mega menüsü ve ?grup= filtreleme için */
  menuGroup: ProductMenuGroup;
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
    name: "Çiçek Desenli Dökümlü Gömlek",
    description:
      "Pamuklu dokuda çiçek deseni; Ege akşamı için hafif ve nefes alan bir üst.",
    price: 5690,
    category: "erkek",
    menuGroup: "gomlek",
    imageUrl: img("erkek-gomlek"),
    images: [img("erkek-gomlek"), img("erkek-gomlek2"), img("erkek-gomlek3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-02",
    slug: "erkek-keten-sort",
    name: "Keten Bermuda",
    description: "Doğal keten, rahat bel ve plajdan iskeleye uzanan sade siluet.",
    price: 3790,
    category: "erkek",
    menuGroup: "sort",
    imageUrl: img("erkek-keten-sort"),
    images: [img("erkek-keten-sort"), img("erkek-keten-sort2"), img("erkek-keten-sort3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-03",
    slug: "kadin-yazlik-gomlek",
    name: "Fisto İşlemeli Gömlek",
    description: "Bol kesim, yumuşak kumaş; pareo üstü veya gün batımı yürüyüşü için.",
    price: 3690,
    category: "kadın",
    menuGroup: "gomlek",
    imageUrl: img("kadin-yaz-gomlek"),
    images: [img("kadin-yaz-gomlek"), img("kadin-yaz-gomlek2"), img("kadin-yaz-gomlek3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-04",
    slug: "kadin-plaj-sortu",
    name: "Mini Çiçekli Şort",
    description: "Hızlı kuruyan yapı; kum ve deniz arasında özgür hareket.",
    price: 3490,
    category: "kadın",
    menuGroup: "sort",
    imageUrl: img("kadin-plaj-sort"),
    images: [img("kadin-plaj-sort"), img("kadin-plaj-sort2"), img("kadin-plaj-sort3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-05",
    slug: "hafif-yaz-elbisesi",
    name: "Desenli Hafif Yaz Elbisesi",
    description: "Akışkan kesim, ince askı; sıcak akşamlar ve teras sofralarına uygun.",
    price: 8290,
    category: "kadın",
    menuGroup: "elbise",
    imageUrl: img("kadin-elbise"),
    images: [img("kadin-elbise"), img("kadin-elbise2"), img("kadin-elbise3")],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "sw-06",
    slug: "hasir-sapka",
    name: "Burgu Kenarlı Hasır Şapka",
    description: "Geniş kenar, doğal doku; güneşe karşı zarif ve hafif koruma.",
    price: 3490,
    category: "aksesuar",
    menuGroup: "sapka",
    imageUrl: img("kadin-hasir-sapka"),
    images: [img("kadin-hasir-sapka"), img("kadin-hasir-sapka2"), img("kadin-hasir-sapka3")],
    sizes: ["Standart"],
  },
  {
    id: "sw-07",
    slug: "plaj-cantasi",
    name: "Örgü Gövdeli Tote Çanta",
    description: "Örgü ve kum tonları; havlu, kitap ve günlük plaj ihtiyaçları için.",
    price: 4990,
    category: "aksesuar",
    menuGroup: "canta",
    imageUrl: img("hasir-canta"),
    images: [img("hasir-canta"), img("hasir-canta2"), img("hasir-canta3")],
    sizes: ["Standart"],
  },
  {
    id: "sw-08",
    slug: "terlik",
    name: "Platform Sandalet",
    description: "Yumuşak taban, minimal kayış; iskele ve kumsalda konforlu adımlar.",
    price: 3590,
    category: "aksesuar",
    menuGroup: "terlik",
    imageUrl: img("kadin-terlik"),
    images: [img("kadin-terlik"), img("kadin-terlik2"), img("terlik4")],
    sizes: ["36", "37", "38", "39", "40"],
  },
];

export const categories: { id: CategoryId; label: string; hint: string }[] = [
  { id: "erkek", label: "Erkek", hint: "Gömlek ve keten şort" },
  { id: "kadın", label: "Kadın", hint: "Yazlık üst, plaj ve elbise" },
  { id: "aksesuar", label: "Aksesuar", hint: "Şapka, çanta ve sandalet" },
];
