import { properties as REAL_PROPERTIES } from "@/constants/data";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || "",
);

const MODELS = ["gemini-3.8-flash", "gemini-3.5-flash-lite"];
const REQUEST_TIMEOUT_MS = 20000;

const COMPACT = REAL_PROPERTIES.map((p) => ({
  title: p.title,
  type: p.type,
  category: p.category,
  price: `${p.currency} ${p.price.toLocaleString()} ${p.pricePeriod}`,
  bedrooms: p.bedrooms,
  bathrooms: p.bathrooms,
  area: p.area,
  location: `${p.location.address}, ${p.location.city}, ${p.location.state}`,
  features: p.features,
  agent: p.agent.name,
}));

const SYSTEM_INSTRUCTION = `You are NestFlow AI, an intelligent virtual assistant embedded inside Abdulazeez Muritador's real estate portfolio mobile app, NestFlow.

Available property dataset:
${JSON.stringify(COMPACT, null, 2)}

Instructions:
- Answer recruiter, hiring manager, and visitor questions accurately based on the property dataset above.
- Highlight Abdulazeez's engineering craftsmanship (React Native, TypeScript, Expo) when asked about the app.
- Keep answers professional, concise, and engaging.`;

export type GeminiHistory = { role: string; parts: { text: string }[] }[];

export function isTimeoutError(e: any): boolean {
  const text = `${e?.name ?? ""} ${e?.message ?? ""}`;
  return /abort|timed? ?out/i.test(text);
}

function isRetryable(e: any): boolean {
  return e?.status === 503 || e?.status === 429 || isTimeoutError(e);
}

export async function askGemini(history: GeminiHistory, content: string) {
  let lastError: any;

  for (const name of MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel(
          { model: name, systemInstruction: SYSTEM_INSTRUCTION },
          { timeout: REQUEST_TIMEOUT_MS },
        );
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(content);
        return result.response.text();
      } catch (e: any) {
        lastError = e;
        if (!isRetryable(e)) throw e;
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
