export function About() {
  return (
    <section
      id="hakkimizda"
      className="scroll-mt-24 bg-gradient-to-b from-white/80 via-shell-50/50 to-transparent py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-10">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100 shadow-card ring-1 ring-sea-100/40">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div>
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sea-600">
            Hakkımızda
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[var(--heading)] sm:text-4xl">
            Sahil markası SaltWear
          </h2>
          <div className="mt-8 space-y-5 font-sans text-base leading-[1.8] text-neutral-600">
            <p>
              SaltWear, 2025 yılında Türkiye'de doğdu. Çıkış noktamız basit bir gözlemdi: yazın en
              güzel anları — sahilde bir yürüyüş, gün batımında bir teras sofrası, limandan dönen bir
              tekne — çoğu zaman üzerimizdekilerin rahatlığıyla doğru orantılı.
            </p>
            <p>
              Bu anlara eşlik edecek parçalar tasarlamak istedik. Gösterişli değil, kendinden emin.
              Trendi kovalayan değil, zamansız. Plajda da şehirde de aynı doğallıkla taşınabilen bir
              gardırop.
            </p>
            <p>
              İsmimiz bu felsefenin özetidir: Salt — denizin tuzu, kıyı yaşamının sade güzelliği.
              Wear — giyimin en yalın hali. İkisi bir arada: doğallığı giyilebilir kılan bir marka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
