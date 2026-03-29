import { Briefcase, MessageSquare, FileText, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const consultationRequests = [
  { id: "cr1", project: "Riverside Tower Complex", from: "Sarah Chen", subject: "Structural assessment for level 19-20", date: "2026-03-25", status: "pending", priority: "high" },
  { id: "cr2", project: "Green Valley School", from: "Lisa Park", subject: "Solar panel integration review", date: "2026-03-24", status: "pending", priority: "medium" },
  { id: "cr3", project: "Metro Station Renovation", from: "Alex Rivera", subject: "Accessibility compliance review", date: "2026-03-22", status: "responded", priority: "high" },
  { id: "cr4", project: "Skyline Office Park", from: "Sarah Chen", subject: "LEED certification consultation", date: "2026-03-20", status: "responded", priority: "low" },
];

const statusColors: Record<string, string> = {
  pending: "bg-warning-light text-warning-foreground border border-warning/20",
  responded: "bg-success-light text-success-foreground border border-success/20",
};

const priorityColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning-light text-warning-foreground",
  low: "bg-muted text-muted-foreground",
};

const ConsultantDashboard = () => {
  const pending = consultationRequests.filter(r => r.status === "pending").length;
  const responded = consultationRequests.filter(r => r.status === "responded").length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome, Dr. Foster 🧑‍💼</h1>
        <p className="text-sm text-muted-foreground mt-1">You have {pending} pending consultation request{pending !== 1 ? "s" : ""}.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Pending Requests", value: pending, icon: Clock, color: "text-warning" },
          { label: "Responded", value: responded, icon: CheckCircle2, color: "text-success" },
          { label: "Total Requests", value: consultationRequests.length, icon: Briefcase, color: "text-primary" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 byld-card-hover">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-3xl font-bold font-display text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-foreground">Consultation Requests</h2>
          <Link to="/consultation-requests">
            <Button variant="outline" size="sm" className="text-xs">View All <ArrowRight className="ml-1 h-3 w-3" /></Button>
          </Link>
        </div>
        <div className="rounded-xl border border-border bg-card divide-y divide-border">
          {consultationRequests.map(r => (
            <div key={r.id} className="p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-foreground">{r.subject}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.project} · From {r.from}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${priorityColors[r.priority]}`}>{r.priority}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[r.status]}`}>{r.status}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
