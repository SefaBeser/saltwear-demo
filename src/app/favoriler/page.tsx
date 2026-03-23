import { FavoritesPageClient } from "@/components/FavoritesPageClient";
import { products } from "@/data/products";

export default function FavoritesPage() {
  return <FavoritesPageClient products={products} />;
}
