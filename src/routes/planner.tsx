import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, ListChecks } from "lucide-react";
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

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Task Planner — WorkSmart" },
      { name: "description", content: "Generate prioritized daily or weekly plans with smart scheduling." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const [range, setRange] = useState("daily");
  const [tasks, setTasks] = useState("");
  const [constraints, setConstraints] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!tasks.trim()) return toast.error("List a few tasks first");
    setLoading(true);
    try {
      const r = await generateAI({ data: { feature: "planner", payload: { range, tasks, constraints } } });
      setOutput(r.content);
    } catch (e: any) {
      toast.error(e.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="AI Task Planner" description="Prioritized plans powered by urgency × importance." />
      <div className="rounded-xl border bg-card p-5 shadow-[var(--shadow-soft)] space-y-4">
        <div>
          <Label className="mb-1.5 block">Plan range</Label>
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-1.5 block">Tasks (one per line)</Label>
          <Textarea rows={8} value={tasks} onChange={(e) => setTasks(e.target.value)} placeholder={"Finish Q3 report (due Fri)\nReview 3 PRs\nCall supplier about invoice\n45-min workout"} />
        </div>
        <div>
          <Label className="mb-1.5 block">Constraints (optional)</Label>
          <Input value={constraints} onChange={(e) => setConstraints(e.target.value)} placeholder="e.g. meetings 10–11 and 2–3, no work after 6pm" />
        </div>
        <Button onClick={submit} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ListChecks className="h-4 w-4" />}
          Build Plan
        </Button>
      </div>
      <div className="mt-5">
        <ResultPanel content={output} filename="plan.md" />
      </div>
    </>
  );
}
