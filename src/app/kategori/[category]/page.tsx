import { notFound } from "next/navigation";
import { CategoryProductsClient } from "@/components/CategoryProductsClient";
import { categorySlugToId, products } from "@/data/products";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryId = categorySlugToId(category);

  if (!categoryId) {
    notFound();
  }

  return <CategoryProductsClient categoryId={categoryId} products={products} />;
}
