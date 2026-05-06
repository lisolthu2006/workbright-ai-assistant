import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  feature: z.enum(["email", "summary", "planner", "research", "chat"]),
  payload: z.record(z.string(), z.any()),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  email: `You write professional emails. Output ONLY the email (Subject + body), no preamble.
Use clear structure: Subject line, greeting, concise body in short paragraphs, sign-off.
Match the requested tone and audience. Keep it actionable.`,
  summary: `You summarize meeting notes. Return Markdown with these exact sections:
## Summary
(2-4 sentence overview)
## Key Decisions
- bullet list
## Action Items
- [Owner] Task — Deadline
## Deadlines
- bullet list
If a section has no content, write "_None_".`,
  planner: `You are a productivity coach. Build a prioritized plan as Markdown.
Use the Eisenhower matrix logic (urgent/important). For each task: estimated time, priority (P1/P2/P3), and a suggested time block.
Sections: ## Today's Focus, ## Schedule, ## Tips. Be concise.`,
  research: `You are a research assistant. Output Markdown:
## TL;DR
(3 bullets max)
## Key Insights
- structured bullets
## Recommendations
- actionable bullets
## Simplified Explanation
(plain language, ~3 sentences)`,
  chat: `You are WorkSmart, a professional productivity assistant. Be concise, structured, use markdown and bullets.
Ask a clarifying question if input is ambiguous. Maintain a professional tone.`,
};

function buildUserPrompt(feature: string, p: Record<string, any>): string {
  switch (feature) {
    case "email":
      return `Write a ${p.tone || "formal"} email to a ${p.audience || "colleague"}.
Goal / Context:
${p.context || ""}
${p.points ? `Key points to include:\n${p.points}` : ""}`;
    case "summary":
      return `Summarize these meeting notes:\n\n${p.notes || ""}`;
    case "planner":
      return `Create a ${p.range || "daily"} plan.
Tasks (one per line, may include rough deadlines):
${p.tasks || ""}
${p.constraints ? `Constraints: ${p.constraints}` : ""}`;
    case "research":
      return `Research topic / article:\n${p.topic || ""}`;
    default:
      return p.message || "";
  }
}

export const generateAI = createServerFn({ method: "POST" })
  .inputValidator((d) => inputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const messages = data.feature === "chat" && Array.isArray(data.payload.messages)
      ? [{ role: "system", content: SYSTEM_PROMPTS.chat }, ...data.payload.messages]
      : [
          { role: "system", content: SYSTEM_PROMPTS[data.feature] },
          { role: "user", content: buildUserPrompt(data.feature, data.payload) },
        ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in Workspace Settings.");
      const t = await res.text();
      throw new Error(`AI gateway error: ${res.status} ${t}`);
    }

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
