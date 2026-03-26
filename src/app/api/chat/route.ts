import { NextResponse } from "next/server";
import { products } from "@/data/products";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const MAX_MESSAGES = 12;
const STOCK_INFO_REPLY =
  "Ürün stoklarımız belirli aralıklarla güncellenmektedir. Uygulama ve sitemizi takipte kalarak ürüne dair stok girişi yapılması durumunda siparişini oluşturabilirsin. Beğendiğin ürünün stoğu bittiyse ürün sayfasında “Gelince haber ver” butonuna tıklarsan ürün stoklarımıza yeniden girdiğinde seni haberdar ederiz. Öncesinde iletişim izinlerin kapalı ise açmayı unutma 😊";

function productContext() {
  return products
    .map((p) => `- ${p.name} | kategori:${p.category} | fiyat:${p.price} TL | slug:${p.slug}`)
    .join("\n");
}

function normalize(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function stockProductReply(input: string): string | null {
  const q = normalize(input);
  const asksAvailability =
    q.includes("var mi") || q.includes("stokta") || q.includes("stogu") || q.includes("stok");
  if (!asksAvailability) return null;

  const matched = products.find((p) => {
    const name = normalize(p.name);
    const slug = normalize(p.slug.replace(/-/g, " "));
    return q.includes(name) || q.includes(slug);
  });

  if (!matched) return null;
  return `Sana yardımcı olayım. Şu an öne çıkan ürünlerden bazıları: ${matched.name} (${matched.price} TL). Stoklarımız hızla tükeniyor. Acele et!😊`;
}

function localResponder(input: string) {
  const q = normalize(input);

  if (q.includes("urun stok bilgisi") || q.includes("urunlerin stok bilgisi") || q.includes("stok bilgisi")) {
    return STOCK_INFO_REPLY;
  }

  const productStockAnswer = stockProductReply(input);
  if (productStockAnswer) return productStockAnswer;

  if (q.includes("teslimat") || q.includes("kargo") || q.includes("iade")) {
    return "Teslimat ve iade için /teslimat-ve-iade sayfasını ziyaret edebilirsin. Paketler 1-2 iş günü içinde UPS ile ücretsiz kargoya verilir.";
  }

  if (q.includes("erkek")) return "Erkek ürünleri için /kategori/erkek sayfasına gidebilirsin.";
  if (q.includes("kadın") || q.includes("kadin")) return "Kadın ürünleri için /kategori/kadin sayfasına gidebilirsin.";
  if (q.includes("aksesuar")) return "Aksesuar ürünleri için /kategori/aksesuar sayfasına gidebilirsin.";
  if (q.includes("fiyat")) {
    const min = Math.min(...products.map((p) => p.price));
    const max = Math.max(...products.map((p) => p.price));
    return `Mevcut koleksiyonda fiyat aralığı ${min} TL - ${max} TL arasında.`;
  }

  const picks = products.slice(0, 3).map((p) => `${p.name} (${p.price} TL)`).join(", ");
  return `Sana yardımcı olayım. Şu an öne çıkan ürünlerden bazıları: ${picks}. İstersen kategoriye göre de önerebilirim (erkek / kadın / aksesuar).`;
}

async function openAIResponder(messages: ChatMessage[]) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const system = [
    "Sen SaltWear için yardımcı satış asistanısın.",
    "Kısa, net, samimi ve Türkçe cevap ver.",
    "Olmayan ürün veya politika uydurma; sadece verilen veriyle konuş.",
    "Gerekirse şu sayfalara yönlendir: /kategori/erkek, /kategori/kadin, /kategori/aksesuar, /teslimat-ve-iade, /favoriler",
    "Ürün verisi:",
    productContext(),
  ].join("\n");

  const input = [
    { role: "system", content: system },
    ...messages.slice(-MAX_MESSAGES).map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      input,
      temperature: 0.6,
      max_output_tokens: 260,
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { output_text?: string };
  return data.output_text?.trim() || null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: ChatMessage[] };
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const userMsg = messages.filter((m) => m.role === "user").at(-1)?.content?.trim() ?? "";

    if (!userMsg) {
      return NextResponse.json({ reply: "Mesajını biraz daha detaylandırır mısın?" }, { status: 200 });
    }

    const forcedLocalReply = localResponder(userMsg);
    const forcedMatch =
      forcedLocalReply === STOCK_INFO_REPLY || forcedLocalReply.includes("Stoklarımız hızla tükeniyor. Acele et!😊");
    if (forcedMatch) {
      return NextResponse.json({ reply: forcedLocalReply }, { status: 200 });
    }

    const aiReply = await openAIResponder(messages);
    const reply = aiReply ?? localResponder(userMsg);
    return NextResponse.json({ reply }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        reply:
          "Şu an kısa bir teknik aksaklık var. Birkaç saniye sonra tekrar dener misin?",
      },
      { status: 200 },
    );
  }
}
