import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { PageHeader, ResultPanel } from "@/components/ResultPanel";
import { generateAI } from "@/server/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Email Generator — WorkSmart" },
      { name: "description", content: "Generate professional emails with the right tone and audience." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [tone, setTone] = useState("formal");
  const [audience, setAudience] = useState("manager");
  const [context, setContext] = useState("");
  const [points, setPoints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!context.trim()) return toast.error("Describe what the email is about");
    setLoading(true);
    try {
      const r = await generateAI({
        data: { feature: "email", payload: { tone, audience, context, points } },
      });
      setOutput(r.content);
    } catch (e: any) {
      toast.error(e.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Smart Email Generator" description="Craft professional emails in seconds — pick a tone and audience." />
      <div className="grid gap-4 rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)]">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="mb-1.5 block">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="informal">Informal</SelectItem>
                <SelectItem value="persuasive">Persuasive</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="concise">Concise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 block">Audience</Label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="colleague">Colleague</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="external partner">External partner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Label className="mb-1.5 block">What's the email about?</Label>
          <Textarea rows={4} value={context} onChange={(e) => setContext(e.target.value)} placeholder="e.g. Reschedule Friday's design review to next Monday because the prototype isn't ready." />
        </div>
        <div>
          <Label className="mb-1.5 block">Key points (optional)</Label>
          <Input value={points} onChange={(e) => setPoints(e.target.value)} placeholder="Comma-separated bullets" />
        </div>
        <Button onClick={submit} disabled={loading} className="w-full sm:w-auto">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          Generate Email
        </Button>
      </div>
      <div className="mt-5">
        <ResultPanel content={output} filename="email.md" />
      </div>
    </>
  );
}
