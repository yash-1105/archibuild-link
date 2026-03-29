import { useState } from "react";
import { CheckCircle2, XCircle, Clock, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const approvals = [
  { id: "ap1", title: "Foundation inspection sign-off", project: "Riverside Tower", requestedBy: "Mike Johnson", date: "2026-03-25", type: "inspection", status: "pending" },
  { id: "ap2", title: "Budget increase — Metro Station (+$120K)", project: "Metro Station", requestedBy: "Alex Rivera", date: "2026-03-24", type: "budget", status: "pending" },
  { id: "ap3", title: "Design change — Level 15 floor plan", project: "Riverside Tower", requestedBy: "Sarah Chen", date: "2026-03-23", type: "design", status: "pending" },
  { id: "ap4", title: "Material substitution — recycled steel", project: "Green Valley School", requestedBy: "Tom Harris", date: "2026-03-22", type: "material", status: "approved" },
  { id: "ap5", title: "Overtime authorization — weekend crew", project: "Skyline Office Park", requestedBy: "James Wu", date: "2026-03-21", type: "labor", status: "rejected" },
];

const typeIcons: Record<string, any> = {
  inspection: CheckCircle2,
  budget: AlertTriangle,
  design: FileText,
  material: FileText,
  labor: Clock,
};

const ApprovalsPage = () => {
  const [items, setItems] = useState(approvals);
  const { toast } = useToast();

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: action } : i));
    toast({ title: action === "approved" ? "Approved ✅" : "Rejected ❌", description: `Decision recorded.` });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Approvals</h1>
        <p className="text-sm text-muted-foreground mt-1">{items.filter(i => i.status === "pending").length} pending decisions</p>
      </div>

      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {items.map(item => {
          const Icon = typeIcons[item.type] || FileText;
          return (
            <div key={item.id} className="p-4 hover:bg-secondary/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.project} · {item.requestedBy} · {item.date}</p>
                </div>
                {item.status === "pending" ? (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="text-xs h-7 text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleAction(item.id, "rejected")}>
                      <XCircle className="h-3 w-3 mr-1" /> Reject
                    </Button>
                    <Button size="sm" className="text-xs h-7 byld-gradient text-primary-foreground border-0" onClick={() => handleAction(item.id, "approved")}>
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Approve
                    </Button>
                  </div>
                ) : (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${item.status === "approved" ? "bg-success-light text-success-foreground" : "bg-destructive/10 text-destructive"}`}>
                    {item.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalsPage;
