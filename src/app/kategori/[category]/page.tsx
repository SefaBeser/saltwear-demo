import { notFound } from "next/navigation";
import { CategoryProductsClient } from "@/components/CategoryProductsClient";
import { categorySlugToId, parseMenuGroupParam, products } from "@/data/products";

type PageProps = {
  params: Promise<{ category: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = (await searchParams) ?? {};

  const catRaw = resolvedParams?.category;
  if (typeof catRaw !== "string" || !catRaw.trim()) {
    notFound();
  }

  const categoryId = categorySlugToId(catRaw.trim());
  if (!categoryId) {
    notFound();
  }

  const grup = resolvedSearchParams.grup;
  const groupFilter = parseMenuGroupParam(grup);

  return (
    <CategoryProductsClient categoryId={categoryId} groupFilter={groupFilter} products={products} />
  );
}
