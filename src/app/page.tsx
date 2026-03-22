import { HomeClient } from "@/components/HomeClient";
import { products } from "@/data/products";

export default function Page() {
  return <HomeClient products={products} />;
}
