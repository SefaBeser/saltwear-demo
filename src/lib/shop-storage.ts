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
  
  export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }
  
  export function saveCart(items: CartItem[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("saltwear:storage-updated"));
  }
  
  export function addToCart(item: Omit<CartItem, "quantity">) {
    const cart = getCart();
    const existing = cart.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === item.size
    );
  
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
    return raw ? JSON.parse(raw) : [];
  }
  
  export function saveFavorites(ids: string[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event("saltwear:storage-updated"));
  }
  
  export function toggleFavorite(productId: string) {
    const favorites = getFavorites();
    const exists = favorites.includes(productId);
  
    const next = exists
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];
  
    saveFavorites(next);
    return next;
  }