import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateAI } from "@/server/ai.functions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chat — WorkSmart AI Assistant" },
      { name: "description", content: "Conversational AI assistant for any work task." },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await generateAI({ data: { feature: "chat", payload: { messages: next } } });
      setMessages([...next, { role: "assistant", content: res.content }]);
    } catch (e: any) {
      toast.error(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "Draft a follow-up email to a client about a delayed deliverable",
    "Summarize this meeting note: ...",
    "Plan my day: prep for 10am demo, write Q3 report, gym",
    "Explain OKRs in simple terms",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          WorkSmart Chat
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ask anything — drafting, summarizing, planning, research.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto rounded-xl border bg-card shadow-[var(--shadow-soft)] p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div
              className="h-14 w-14 rounded-2xl flex items-center justify-center text-white mb-4"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Sparkles className="h-7 w-7" />
            </div>
            <h2 className="text-lg font-medium">How can I help today?</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-6">Try one of these prompts</p>
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="text-left text-sm rounded-lg border bg-background px-3 py-2.5 hover:bg-accent hover:border-primary/30 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                m.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm",
              )}
            >
              {m.role === "assistant" ? (
                <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-headings:my-2">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">{m.content}</div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Thinking…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Message WorkSmart…"
          rows={2}
          className="resize-none"
        />
        <Button onClick={send} disabled={loading || !input.trim()} size="lg">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
