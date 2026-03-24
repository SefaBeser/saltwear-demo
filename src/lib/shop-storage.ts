export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  size?: string;
  quantity: number;
};

const CART_KEY = "saltwear_cart";
const FAVORITES_KEY = "saltwear_favorites";
const MAX_QUANTITY_PER_PRODUCT = 10;

function normalizeCart(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];

  const totalByProduct = new Map<string, number>();
  const normalized: CartItem[] = [];

  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const item = raw as CartItem;
    if (typeof item.id !== "string" || !item.id) continue;
    const quantity = Number.isFinite(item.quantity) ? Math.floor(item.quantity) : 0;
    if (quantity <= 0) continue;

    const used = totalByProduct.get(item.id) ?? 0;
    const remaining = MAX_QUANTITY_PER_PRODUCT - used;
    if (remaining <= 0) continue;

    const nextQuantity = Math.min(quantity, remaining);
    normalized.push({
      id: item.id,
      name: typeof item.name === "string" ? item.name : "",
      price: typeof item.price === "number" && Number.isFinite(item.price) ? item.price : 0,
      imageUrl: typeof item.imageUrl === "string" ? item.imageUrl : "",
      size: typeof item.size === "string" ? item.size : undefined,
      quantity: nextQuantity,
    });
    totalByProduct.set(item.id, used + nextQuantity);
  }

  return normalized;
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(CART_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as CartItem[];
    return normalizeCart(parsed);
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  const normalized = normalizeCart(items);
  window.localStorage.setItem(CART_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event("saltwear:storage-updated"));
}

export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const totalForProduct = cart
    .filter((cartItem) => cartItem.id === item.id)
    .reduce((sum, cartItem) => sum + cartItem.quantity, 0);

  if (totalForProduct >= MAX_QUANTITY_PER_PRODUCT) {
    return;
  }

  const existing = cart.find((cartItem) => cartItem.id === item.id && cartItem.size === item.size);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(FAVORITES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export function saveFavorites(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("saltwear:storage-updated"));
}

export function toggleFavorite(productId: string) {
  const favorites = getFavorites();
  const exists = favorites.includes(productId);

  const next = exists ? favorites.filter((id) => id !== productId) : [...favorites, productId];

  saveFavorites(next);
  return next;
}