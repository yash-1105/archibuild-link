import { useState } from "react";
import { ClipboardList, Cloud, Users, Package, AlertTriangle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const logEntries = [
  { id: "l1", date: "2026-03-25", weather: "Sunny, 72°F", laborCount: 45, materialsDelivered: ["Steel beams (12 tons)", "Concrete mix (8 trucks)"], delays: [], notes: "Productive day. Level 18 pour completed." },
  { id: "l2", date: "2026-03-24", weather: "Partly Cloudy, 68°F", laborCount: 42, materialsDelivered: ["Rebar (6 tons)"], delays: ["Crane maintenance — 2hr downtime"], notes: "Minor crane issue resolved by noon." },
  { id: "l3", date: "2026-03-23", weather: "Overcast, 65°F", laborCount: 38, materialsDelivered: [], delays: ["Safety inspection hold"], notes: "Scaffolding adjustments required per safety report." },
  { id: "l4", date: "2026-03-22", weather: "Sunny, 74°F", laborCount: 50, materialsDelivered: ["Glass panels (200 units)", "Insulation (300 sqm)"], delays: [], notes: "All deliveries on schedule. Drone footage captured." },
];

const SiteLogbookPage = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Site Logbook</h1>
          <p className="text-sm text-muted-foreground mt-1">Daily site records: labor, weather, materials, delays.</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0" onClick={() => toast({ title: "New Entry", description: "Log entry form coming soon." })}>
          <Plus className="mr-2 h-4 w-4" /> New Entry
        </Button>
      </div>

      <div className="space-y-4">
        {logEntries.map(entry => (
          <div key={entry.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">{new Date(entry.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</h3>
              {entry.delays.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-warning-light text-warning-foreground border border-warning/20 font-medium">
                  <AlertTriangle className="inline h-3 w-3 mr-1" />{entry.delays.length} delay{entry.delays.length > 1 ? "s" : ""}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Cloud className="h-4 w-4 text-info" />
                <span className="text-muted-foreground">{entry.weather}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{entry.laborCount} workers</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Package className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">{entry.materialsDelivered.length} deliveries</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Logged</span>
              </div>
            </div>

            {entry.materialsDelivered.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Materials Delivered:</p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.materialsDelivered.map((m, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {entry.delays.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-warning-foreground mb-1">Delays:</p>
                {entry.delays.map((d, i) => (
                  <p key={i} className="text-xs text-muted-foreground">• {d}</p>
                ))}
              </div>
            )}

            <p className="text-sm text-muted-foreground italic">{entry.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteLogbookPage;
