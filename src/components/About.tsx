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
          <p className="mt-8 font-sans text-base leading-[1.8] text-neutral-600">
            SaltWear, Ege kıyısından ilham alan resortwear çizgisinde; plaj, yaz akşamı ve tatil
            rahatlığını bir araya getirir. Keten, hasır ve açık tonlarda doğal kumaşlarla hem ferah
            hem de şık bir siluet sunarız.
          </p>
        </div>
      </div>
    </section>
  );
}
