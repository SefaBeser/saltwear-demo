import type { Metadata } from "next";
import Link from "next/link";
import { ProductDetailNav } from "@/components/ProductDetailNav";

export const metadata: Metadata = {
  title: "Teslimat ve İade Şartları | SaltWear",
  description: "SaltWear teslimat, ürün iadesi ve geri ödeme şartları.",
};

export default function TeslimatVeIadePage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7faf9_0%,#fffdf8_100%)]">
      <div className="mx-auto max-w-3xl px-6 py-8 sm:px-8 lg:px-12">
        <ProductDetailNav />

        <article className="mt-4 rounded-2xl border border-sea-100/90 bg-white/70 px-6 py-10 shadow-sm backdrop-blur-sm sm:px-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[var(--heading)] sm:text-4xl">
            Teslimat ve İade Şartları
          </h1>

          <section className="mt-10">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sea-700">
              Teslimat
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
              Paketiniz 1-2 iş günü içerisinde UPS kargoya verilerek sizlere ücretsiz bir şekilde teslimatı
              sağlanır.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sea-700">
              Ürün İade ve Değişimi
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
              Satın almış olduğunuz ürünü iade etmek istediğinizde iade koşullarına uygun bir şekilde,{" "}
              <span className="font-semibold text-neutral-900">310018870</span> UPS kargo iade kodu ile
              ücretsiz bir şekilde gönderebilirsiniz.
            </p>
          </section>

          <section className="mt-10">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sea-700">
              Ürün İade Koşulları
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 font-sans text-sm leading-relaxed text-neutral-700">
              <li>Sipariş teslim tarihinden itibaren 30 günü geçmemiş olmalı.</li>
              <li>Ürünün orijinal ambalajı bozulmamış olmalı.</li>
              <li>Ürün etiketleri, varsa logoları çıkarılmamalı.</li>
              <li>Ürün yeniden satışa sunulabilir durumda olmalıdır.</li>
              <li>
                Erkek koleksiyonu: İç giyim ve slip mayolarda, hijyen dolayısıyla iade yapılamamaktadır.
              </li>
              <li>
                Kadın koleksiyonu: Hijyen kuralları gereği bikini alt ve mayonun ağ kısmındaki hijyen
                bantları çıkarıldığında iade yapılamamaktadır.
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-sea-700">
              Geri Ödeme
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-700">
              İadeniz ilgili depoya ulaştıktan sonra iade koşullarına uygunluğu kontrol edilir. Koşullara
              uygun olan ürünün ücret iade işlemleri 5 iş günü içerisinde bankanıza yapılır. Bu aşamadan
              sonra hesabınıza yansıma süresi banka süreçlerine bağlı olarak değişkenlik gösterebilir. İade
              koşullarına uygun olmayan ürün teslimat adresine iade edilir.
            </p>
          </section>

          <p className="mt-12 border-t border-sea-100/80 pt-8">
            <Link
              href="/"
              className="font-sans text-sm font-medium text-sea-700 underline-offset-4 transition hover:text-sea-900 hover:underline"
            >
              Ana sayfaya dön
            </Link>
          </p>
        </article>
      </div>
    </main>
  );
}
