import { useState } from "react";
import { Briefcase, Send, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRole } from "@/contexts/RoleContext";

const requests = [
  { id: "cr1", project: "Riverside Tower Complex", from: "Sarah Chen", subject: "Structural assessment for level 19-20", description: "We need a structural review of the cantilevered sections on levels 19 and 20 before proceeding with the steel framework.", date: "2026-03-25", status: "pending", priority: "high" },
  { id: "cr2", project: "Green Valley School", from: "Lisa Park", subject: "Solar panel integration review", description: "Need expert opinion on optimal solar panel placement on the south-facing roof sections.", date: "2026-03-24", status: "pending", priority: "medium" },
  { id: "cr3", project: "Metro Station Renovation", from: "Alex Rivera", subject: "Accessibility compliance review", description: "Review of all ramp gradients and elevator placements for ADA compliance.", date: "2026-03-22", status: "responded", priority: "high", response: "All ramp gradients meet ADA standards. Recommend adding tactile indicators at platform edges." },
];

const ConsultationRequestsPage = () => {
  const [items, setItems] = useState(requests);
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { role } = useRole();

  const handleRespond = (id: string) => {
    const text = responseText[id];
    if (!text?.trim()) return;
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: "responded", response: text } : i));
    setResponseText(prev => ({ ...prev, [id]: "" }));
    toast({ title: "Response sent ✅", description: "Your consultation response has been delivered." });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          {role === "consultant" ? "Consultation Requests" : "Consultant Requests"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {role === "consultant" ? "Review and respond to architect inquiries." : "Manage your consultation requests."}
        </p>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.subject}</h3>
                  <p className="text-xs text-muted-foreground">{item.project} · From {item.from} · {item.date}</p>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${item.status === "pending" ? "bg-warning-light text-warning-foreground" : "bg-success-light text-success-foreground"}`}>
                {item.status === "pending" ? <Clock className="inline h-3 w-3 mr-1" /> : <CheckCircle2 className="inline h-3 w-3 mr-1" />}
                {item.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>

            {item.response && (
              <div className="bg-success-light/50 border border-success/10 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-success-foreground mb-1">Response:</p>
                <p className="text-sm text-foreground">{item.response}</p>
              </div>
            )}

            {item.status === "pending" && role === "consultant" && (
              <div className="flex gap-2">
                <Textarea
                  placeholder="Write your consultation response..."
                  className="text-sm min-h-[60px]"
                  value={responseText[item.id] || ""}
                  onChange={e => setResponseText(prev => ({ ...prev, [item.id]: e.target.value }))}
                />
                <Button className="byld-gradient text-primary-foreground border-0 shrink-0 self-end" onClick={() => handleRespond(item.id)}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationRequestsPage;
