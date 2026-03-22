"use client";

type ContactProps = {
  name: string;
  email: string;
  message: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onMessage: (v: string) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export function Contact({
  name,
  email,
  message,
  onName,
  onEmail,
  onMessage,
  submitted,
  onSubmit,
}: ContactProps) {
  return (
    <section
      id="iletisim"
      className="scroll-mt-24 border-t border-sea-100/50 bg-gradient-to-b from-cream-50/70 to-shell-50 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-xl">
          <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sea-600">
            İletişim
          </p>
          <h2 className="mt-4 font-display text-3xl font-medium text-[var(--heading)] sm:text-4xl">
            Bize yazın
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-neutral-600">
            Sorularınız için mesaj bırakın.
          </p>

          {submitted ? (
            <p className="mt-10 rounded-2xl border border-lagoon-200 bg-lagoon-50/90 px-6 py-4 font-sans text-sm text-lagoon-900">
              Mesajınız alındı. En kısa sürede size dönüş yapacağız. (Demo)
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-12 space-y-6">
              <div>
                <label htmlFor="iletisim-ad" className="block font-sans text-sm font-medium text-neutral-700">
                  Ad soyad
                </label>
                <input
                  id="iletisim-ad"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => onName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-sea-200/80 bg-white px-4 py-3 font-sans text-sm text-neutral-900 shadow-innerWarm outline-none transition focus:border-sea-400 focus:ring-2 focus:ring-sea-100"
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div>
                <label htmlFor="iletisim-eposta" className="block font-sans text-sm font-medium text-neutral-700">
                  E-posta
                </label>
                <input
                  id="iletisim-eposta"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-sea-200/80 bg-white px-4 py-3 font-sans text-sm text-neutral-900 shadow-innerWarm outline-none transition focus:border-sea-400 focus:ring-2 focus:ring-sea-100"
                  placeholder="ornek@eposta.com"
                />
              </div>
              <div>
                <label htmlFor="iletisim-mesaj" className="block font-sans text-sm font-medium text-neutral-700">
                  Mesaj
                </label>
                <textarea
                  id="iletisim-mesaj"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => onMessage(e.target.value)}
                  className="mt-2 w-full resize-y rounded-xl border border-sea-200/80 bg-white px-4 py-3 font-sans text-sm text-neutral-900 shadow-innerWarm outline-none transition focus:border-sea-400 focus:ring-2 focus:ring-sea-100"
                  placeholder="Mesajınızı yazın"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-sea-600 py-3 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:bg-sea-500 sm:w-auto sm:px-14"
              >
                Gönder
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
