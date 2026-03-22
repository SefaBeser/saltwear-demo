"use client";

type NewsletterProps = {
  email: string;
  onEmailChange: (v: string) => void;
  submitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
};

export function Newsletter({ email, onEmailChange, submitted, onSubmit }: NewsletterProps) {
  return (
    <section
      id="ebulten"
      className="scroll-mt-24 border-y border-sea-100/50 bg-gradient-to-br from-sea-50/50 via-shell-50 to-cream-50/80 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 rounded-3xl bg-white/70 p-8 shadow-card ring-1 ring-sea-100/40 backdrop-blur-sm sm:p-10 lg:grid-cols-12 lg:gap-16 lg:p-12">
          <div className="lg:col-span-5">
            <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-sea-600">
              Bülten
            </p>
            <h2 className="mt-4 font-display text-2xl font-medium tracking-tight text-[var(--heading)] sm:text-3xl">
              SaltWear yaz dünyasına katılın
            </h2>
            <p className="mt-4 font-sans text-sm leading-relaxed text-neutral-600 sm:text-base">
              Yeni sezon, plaj notları ve özel duyurular için e-posta listemize kayıt olun.
            </p>
          </div>
          <div className="lg:col-span-7">
            {submitted ? (
              <p className="rounded-2xl border border-lagoon-200 bg-lagoon-50/80 px-6 py-5 font-sans text-sm text-lagoon-900">
                Teşekkürler! Kaydınız alındı. (Demo — gerçek gönderim yoktur.)
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
                <label htmlFor="ebulten-email" className="sr-only">
                  E-posta adresi
                </label>
                <input
                  id="ebulten-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  placeholder="ornek@eposta.com"
                  className="min-h-12 flex-1 rounded-full border border-sea-200/70 bg-white px-6 font-sans text-sm text-neutral-900 shadow-innerWarm outline-none transition placeholder:text-neutral-400 focus:border-sea-400 focus:ring-2 focus:ring-sea-100"
                />
                <button
                  type="submit"
                  className="h-12 shrink-0 rounded-full bg-sea-600 px-10 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-soft transition hover:bg-sea-500 sm:px-12"
                >
                  Abone Ol
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
