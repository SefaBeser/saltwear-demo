"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const quickLinks = [
  { label: "Erkek ürün öner", href: "/kategori/erkek" },
  { label: "Kadın ürün öner", href: "/kategori/kadin" },
  { label: "Aksesuar öner", href: "/kategori/aksesuar" },
  { label: "Teslimat ve iade koşulları", href: "/teslimat-ve-iade" },
] as const;

export function ChatAssistant() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Merhaba, ben SaltWear asistanı. Ürün seçimi, kategori ve teslimat/iade sorularında yardımcı olabilirim.",
    },
  ]);

  const canSend = useMemo(() => text.trim().length > 0 && !loading, [text, loading]);

  async function sendMessage(raw: string) {
    const content = raw.trim();
    if (!content || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await res.json()) as { reply?: string };
      const reply =
        typeof data?.reply === "string" && data.reply.trim()
          ? data.reply.trim()
          : "Şu an cevap üretilemedi, tekrar deneyebilir misin?";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Bağlantıda kısa bir sorun oldu. Lütfen tekrar dene.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage(text);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      {open ? (
        <section className="w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-sea-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-sea-600 px-4 py-3 text-white">
            <p className="text-sm font-semibold">SaltWear Asistan</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-1 text-xs hover:bg-white/15"
            >
              Kapat
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto bg-gradient-to-b from-white to-sea-50/30 p-3">
            {messages.map((m, i) => (
              <div
                key={`${m.role}-${i}`}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-sea-600 text-white"
                    : "border border-sea-100 bg-white text-slate-700"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading ? (
              <div className="max-w-[85%] rounded-xl border border-sea-100 bg-white px-3 py-2 text-sm text-slate-500">
                Yazıyor...
              </div>
            ) : null}
          </div>

          <div className="border-t border-sea-100 p-3">
            <div className="mb-2 flex flex-wrap gap-2">
              {quickLinks.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    setOpen(false);
                  }}
                  className="rounded-full border border-sea-200 px-3 py-1 text-xs text-sea-700 hover:bg-sea-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <form onSubmit={onSubmit} className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="flex-1 rounded-lg border border-sea-200 px-3 py-2 text-sm outline-none focus:border-sea-500"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-lg bg-sea-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Gönder
              </button>
            </form>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full bg-sea-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sea-700"
          aria-label="Sohbet asistanını aç"
        >
          AI Asistan
        </button>
      )}
    </div>
  );
}
