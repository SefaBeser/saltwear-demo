export function BrandInsights() {
  return (
    <section
      id="marka-degerleri"
      className="scroll-mt-24 bg-gradient-to-b from-shell-50/40 via-white to-cream-50/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-sea-100/70 bg-white/90 p-7 shadow-innerWarm sm:p-9">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-sea-600">
              Marka Yaklaşımı
            </p>
            <h3 className="mt-4 font-display text-3xl text-[var(--heading)]">Doğal Kumaşlar</h3>
            <p className="mt-4 font-sans text-base leading-[1.8] text-neutral-600">
              Keten, organik pamuk ve hasır — nefes alan, zamana direnen, tene dost malzemeler.
              Kumaşlarımızı Türkiye&apos;nin köklü tekstil atölyelerinden ve seçili Akdeniz
              tedarikçilerinden özenle temin ediyoruz.
            </p>

            <h4 className="mt-8 font-display text-2xl text-[var(--heading)]">Özenli Üretim</h4>
            <p className="mt-3 font-sans text-base leading-[1.8] text-neutral-600">
              Her parça, OEKO-TEX sertifikalı atölyelerde sınırlı sayıda üretilir. Hızlı modanın
              karşısında durarak kaliteyi ve işçiliği önceliklendiriyoruz. Bir SaltWear ürünü bir
              sezonda değil, birçok yazda yanınızda olsun diye tasarlanır.
            </p>

            <h4 className="mt-8 font-display text-2xl text-[var(--heading)]">Kıyıdan İlham</h4>
            <p className="mt-3 font-sans text-base leading-[1.8] text-neutral-600">
              Akdeniz kıyı kültürü — açık tonlar, doğal dokular, güneşin sıcaklığı ve denizin
              sakinliği — koleksiyonlarımızın ilham kaynağıdır. Plajdan terasa, kumdan taş sokaklara
              geçişi tek bir siluette mümkün kılıyoruz.
            </p>
          </article>

          <article className="rounded-2xl border border-sea-100/70 bg-gradient-to-b from-white to-shell-50/70 p-7 shadow-innerWarm sm:p-9">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-sea-600">
              Gelecek Vizyonu
            </p>
            <h3 className="mt-4 font-display text-3xl text-[var(--heading)]">
              Sürdürülebilirlik Taahhüdü
            </h3>

            <h4 className="mt-8 font-display text-2xl text-[var(--heading)]">
              Daha Az Üret, Daha İyi Üret
            </h4>
            <p className="mt-3 font-sans text-base leading-[1.8] text-neutral-600">
              SaltWear olarak hızlı tüketimin karşısında bir duruş sergiliyoruz. Koleksiyonlarımız
              sezonluk ve sınırlı sayıda üretilir; stok fazlası yaratmak yerine gerçek talebe yanıt
              vermeyi tercih ederiz.
            </p>
            <p className="mt-5 font-sans text-base leading-[1.8] text-neutral-600">
              Yol haritamızda geri dönüştürülmüş kumaşlardan oluşan SaltWear Eco hattımız, buyback
              programımız ve ambalajlarımızın tamamen geri dönüştürülebilir malzemelerden üretilmesi
              yer alıyor. Yazı güzel kılan şeyi — denizi, kumu, doğayı — korumak da sorumluluğumuz.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
