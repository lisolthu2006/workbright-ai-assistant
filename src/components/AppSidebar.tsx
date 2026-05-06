import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, FileText, ListChecks, BookOpen, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Chat", icon: MessageSquare },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/summarizer", label: "Notes Summarizer", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: BookOpen },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground">
      <div className="px-5 py-5 flex items-center gap-2 border-b">
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold leading-tight">WorkSmart</div>
          <div className="text-xs text-muted-foreground">AI Assistant</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = path === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/60",
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-3 text-[11px] text-muted-foreground border-t">
        AI-generated content should be reviewed before use.
      </div>
    </aside>
  );
}

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="md:hidden flex overflow-x-auto gap-1 border-b bg-sidebar px-2 py-2">
      {items.map((it) => {
        const active = path === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-xs whitespace-nowrap",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-muted-foreground",
            )}
          >
            <it.icon className="h-3.5 w-3.5" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
