import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const entries = [
  { version: "v2.4.0", date: "Mar 20, 2026", changes: ["AI Assistant with context-aware prompts", "Improved budget charts with gradient fills", "Calendar view for tasks and deadlines"] },
  { version: "v2.3.0", date: "Feb 28, 2026", changes: ["Project-based chat channels", "Drag-and-drop document uploads", "Team management improvements"] },
  { version: "v2.2.0", date: "Feb 10, 2026", changes: ["Role-based access controls", "Enhanced notification system", "Mobile responsive sidebar"] },
  { version: "v2.1.0", date: "Jan 25, 2026", changes: ["Budget tracking per project", "Expense categorization", "Budget alert system"] },
];

const ChangelogPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Changelog</h1>
      <p className="text-lg text-muted-foreground mb-10">What's new in BYLD.</p>
      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.version} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full byld-gradient text-primary-foreground">{entry.version}</span>
              <span className="text-xs text-muted-foreground">{entry.date}</span>
            </div>
            <ul className="space-y-2">
              {entry.changes.map((c) => (
                <li key={c} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ChangelogPage;
