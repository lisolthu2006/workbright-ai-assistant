import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ResultPanel({ content, filename = "worksmart-output.md" }: { content: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const copy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  const download = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border bg-card shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Result</span>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={copy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="ml-1.5 text-xs">Copy</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={download}>
            <Download className="h-3.5 w-3.5" />
            <span className="ml-1.5 text-xs">Export</span>
          </Button>
        </div>
      </div>
      <div className="prose prose-sm max-w-none p-5 prose-headings:font-semibold prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-a:text-primary">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <div className="border-t px-4 py-2 text-[11px] text-muted-foreground">
        ⚠️ AI-generated content. Please review before use.
      </div>
    </div>
  );
}

export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
