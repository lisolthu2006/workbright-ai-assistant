import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PageHeader, ResultPanel } from "@/components/ResultPanel";
import { generateAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — WorkSmart" },
      { name: "description", content: "Turn long meeting notes into clear summaries with action items." },
    ],
  }),
  component: SummarizerPage,
});

function SummarizerPage() {
  const [notes, setNotes] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!notes.trim()) return toast.error("Paste your meeting notes first");
    setLoading(true);
    try {
      const r = await generateAI({ data: { feature: "summary", payload: { notes } } });
      setOutput(r.content);
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Meeting Notes Summarizer" description="Get a structured recap with decisions, owners and deadlines." />
      <div className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)] space-y-4">
        <div>
          <Label className="mb-1.5 block">Meeting notes or transcript</Label>
          <Textarea rows={10} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Paste your raw notes or transcript here…" />
        </div>
        <Button onClick={submit} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          Summarize
        </Button>
      </div>
      <div className="mt-5">
        <ResultPanel content={output} filename="meeting-summary.md" />
      </div>
    </>
  );
}
