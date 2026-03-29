import { useState, useEffect } from "react";
import { AlertTriangle, CheckSquare, DollarSign, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickAlert {
  id: string;
  title: string;
  description: string;
  type: "approval" | "delay" | "budget";
  icon: any;
}

const alerts: QuickAlert[] = [
  { id: "qa1", title: "3 Approvals Pending", description: "Foundation inspection, budget increase, and design change need your review.", type: "approval", icon: CheckSquare },
  { id: "qa2", title: "Project Delayed", description: "Green Valley School delayed by 5 days due to material shipment.", type: "delay", icon: AlertTriangle },
  { id: "qa3", title: "Budget Alert", description: "Riverside Tower is at 72% budget utilization.", type: "budget", icon: DollarSign },
];

const typeStyles: Record<string, string> = {
  approval: "border-l-4 border-l-primary",
  delay: "border-l-4 border-l-warning",
  budget: "border-l-4 border-l-destructive",
};

export function QuickActionCards() {
  const [visible, setVisible] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    const timers = alerts.map((alert, i) =>
      setTimeout(() => {
        setVisible(prev => [...prev, alert.id]);
      }, 1000 + i * 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: string) => {
    setDismissed(prev => [...prev, id]);
  };

  const visibleAlerts = alerts.filter(a => visible.includes(a.id) && !dismissed.includes(a.id));

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {visibleAlerts.map(alert => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`bg-card border border-border rounded-xl p-4 shadow-lg ${typeStyles[alert.type]}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <alert.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
              </div>
              <button onClick={() => dismiss(alert.id)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
