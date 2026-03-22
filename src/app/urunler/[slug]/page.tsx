import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { ProductDetailClient } from "../../../components/ProductDetailClient";
import { ProductDetailNav } from "../../../components/ProductDetailNav";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7faf9_0%,#fffdf8_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        <ProductDetailNav />
        <ProductDetailClient product={product} />
      </div>
    </main>
  );
}
