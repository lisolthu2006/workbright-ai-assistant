import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader, ResultPanel } from "@/components/ResultPanel";
import { generateAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research Assistant — WorkSmart" },
      { name: "description", content: "Summarize topics and articles with key insights and recommendations." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!topic.trim()) return toast.error("Enter a topic or paste an article");
    setLoading(true);
    try {
      const r = await generateAI({ data: { feature: "research", payload: { topic } } });
      setOutput(r.content);
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="AI Research Assistant" description="TL;DR, insights, recommendations and a plain-language explanation." />
      <div className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)] space-y-4">
        <div>
          <Label className="mb-1.5 block">Topic, question or article text</Label>
          <Textarea rows={10} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. What is RAG, and when should a startup use it? — or paste an article…" />
        </div>
        <Button onClick={submit} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <BookOpen className="h-4 w-4" />}
          Research
        </Button>
      </div>
      <div className="mt-5">
        <ResultPanel content={output} filename="research.md" />
      </div>
    </>
  );
}
