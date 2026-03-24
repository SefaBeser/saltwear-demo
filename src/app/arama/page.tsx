import { SearchResultsClient } from "@/components/SearchResultsClient";
import { firstSearchParam, products } from "@/data/products";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  return <SearchResultsClient products={products} query={firstSearchParam(q) ?? ""} />;
}
