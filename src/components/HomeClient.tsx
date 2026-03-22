"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CategoryId, Product } from "@/data/products";
import {
  getCart,
  saveCart,
  getFavorites,
  addToCart as addToCartStorage,
  toggleFavorite as toggleFavoriteStorage,
} from "@/lib/shop-storage";

import { About } from "./About";
import { CampaignBanner } from "./CampaignBanner";
import type { CartLine } from "./CartDrawer";
import { CartDrawer } from "./CartDrawer";
import { CategorySection } from "./CategorySection";
import { Contact } from "./Contact";
import { FavoritesDrawer } from "./FavoritesDrawer";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Newsletter } from "./Newsletter";
import { ProductGrid } from "./ProductGrid";
import { SearchOverlay } from "./SearchOverlay";

type HomeClientProps = {
  products: Product[];
};

export function HomeClient({ products }: HomeClientProps) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);

  const [cartLines, setCartLines] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactDone, setContactDone] = useState(false);

  const syncFromStorage = useCallback(() => {
    const storedCart = getCart();
    const storedFavorites = getFavorites();

    setCartLines(
      storedCart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      })),
    );

    setFavorites(new Set(storedFavorites));
  }, []);

  useEffect(() => {
    syncFromStorage();

    window.addEventListener("saltwear:storage-updated", syncFromStorage);
    window.addEventListener("focus", syncFromStorage);
    window.addEventListener("pageshow", syncFromStorage);

    return () => {
      window.removeEventListener("saltwear:storage-updated", syncFromStorage);
      window.removeEventListener("focus", syncFromStorage);
      window.removeEventListener("pageshow", syncFromStorage);
    };
  }, [syncFromStorage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setCartOpen(false);
        setFavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (cartOpen || favOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen, favOpen]);

  const productsById = useMemo(() => {
    const map = new Map<string, Product>();
    products.forEach((product) => map.set(product.id, product));
    return map;
  }, [products]);

  const displayProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const categoryOk = categoryFilter ? product.category === categoryFilter : true;

      if (!categoryOk) return false;
      if (!q) return true;

      return (
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q)
      );
    });
  }, [products, categoryFilter, searchQuery]);

  const cartCount = useMemo(
    () => cartLines.reduce((sum, line) => sum + line.quantity, 0),
    [cartLines],
  );

  const favoriteItems = useMemo(
    () => products.filter((product) => favorites.has(product.id)),
    [products, favorites],
  );

  const openCart = useCallback(() => {
    setFavOpen(false);
    setSearchOpen(false);
    setCartOpen(true);
  }, []);

  const openFavorites = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setFavOpen(true);
  }, []);

  const openSearch = useCallback(() => {
    setCartOpen(false);
    setFavOpen(false);
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const selectCategory = (id: CategoryId) => {
    setCategoryFilter(id);
    requestAnimationFrame(() => {
      document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const clearCategory = () => {
    setCategoryFilter(null);
  };

  const toggleFavorite = (productId: string) => {
    const next = toggleFavoriteStorage(productId);
    setFavorites(new Set(next));
  };

  const addToCart = (product: Product) => {
    addToCartStorage({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    const storedCart = getCart();

    setCartLines(
      storedCart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
      })),
    );

    setCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const current = getCart();

    const next = current
      .map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(next);
    syncFromStorage();
  };

  const removeLine = (productId: string) => {
    const current = getCart();
    const next = current.filter((item) => item.id !== productId);
    saveCart(next);
    syncFromStorage();
  };

  const checkout = () => {
    window.alert("Bu demo projede gerçek ödeme sistemi bulunmamaktadır.");
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;

    setNewsletterDone(true);
    setNewsletterEmail("");

    setTimeout(() => {
      setNewsletterDone(false);
    }, 2200);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      return;
    }

    setContactDone(true);
    setContactName("");
    setContactEmail("");
    setContactMessage("");

    setTimeout(() => {
      setContactDone(false);
    }, 2200);
  };

  const scrollToProducts = () => {
    document.getElementById("urunler")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar
        cartCount={cartCount}
        favoriteCount={favorites.size}
        onOpenSearch={openSearch}
        onOpenCart={openCart}
        onOpenFavorites={openFavorites}
      />

      <Hero onYazSecimi={scrollToProducts} />

      <CategorySection onSelect={selectCategory} />

      <ProductGrid
        products={displayProducts}
        filter={categoryFilter}
        onClearFilter={clearCategory}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
      />

      <CampaignBanner />
      <About />

      <Newsletter
        email={newsletterEmail}
        onEmailChange={setNewsletterEmail}
        submitted={newsletterDone}
        onSubmit={handleNewsletterSubmit}
      />

      <Contact
        name={contactName}
        email={contactEmail}
        message={contactMessage}
        onName={setContactName}
        onEmail={setContactEmail}
        onMessage={setContactMessage}
        submitted={contactDone}
        onSubmit={handleContactSubmit}
      />

      <Footer />

      <CartDrawer
        open={cartOpen}
        lines={cartLines}
        productsById={productsById}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeLine}
        onCheckout={checkout}
      />

      <FavoritesDrawer
        open={favOpen}
        items={favoriteItems}
        onClose={() => setFavOpen(false)}
        onRemove={toggleFavorite}
        onScrollToProducts={scrollToProducts}
      />

      <SearchOverlay
        open={searchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={closeSearch}
      />
    </>
  );
}
