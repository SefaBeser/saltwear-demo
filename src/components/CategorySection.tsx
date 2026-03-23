import type { CategoryId } from "@/data/products";

type CategorySectionProps = {
  onSelect: (id: CategoryId) => void;
};

const cards: {
  id: CategoryId;
  title: string;
  image: string;
}[] = [
  {
    id: "erkek",
    title: "Erkek",
    image: "/images/erkek-gomlek.jpg",
  },
  {
    id: "kadın",
    title: "Kadın",
    image: "/images/kadin-elbise.jpg",
  },
  {
    id: "aksesuar",
    title: "Aksesuar",
    image: "/images/hasir-canta.jpg",
  },
];

export function CategorySection({ onSelect }: CategorySectionProps) {
  return (
    <section
      id="koleksiyon"
      className="scroll-mt-24 bg-gradient-to-b from-shell-50/80 via-cream-50/40 to-transparent py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sea-600">
            Koleksiyon
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-[var(--heading)] sm:text-4xl">
            Ege çizgisinde üç seçenek
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-neutral-600">
            Bir kategori seçin; ürünler aşağıda anında süzülür.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelect(card.id)}
              className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-card ring-1 ring-sea-100/40 transition duration-500 hover:-translate-y-2 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-sand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sea-900/70 via-sea-800/15 to-transparent opacity-90 transition group-hover:from-sea-900/75" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-display text-2xl font-medium text-white drop-shadow-sm">
                    {card.title}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
