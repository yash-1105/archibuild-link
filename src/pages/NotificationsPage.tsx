import { useState } from "react";
import { Bell, Check, CheckCheck, Clock, DollarSign, FileText, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifications } from "@/data/mockData";

const typeIcons: Record<string, React.ElementType> = { task: ListTodo, deadline: Clock, update: FileText, budget: DollarSign };
const typeColors: Record<string, string> = { task: "bg-primary/10 text-primary", deadline: "bg-warning-light text-warning", update: "bg-info-light text-info", budget: "bg-success-light text-success" };

const NotificationsPage = () => {
  const [readIds, setReadIds] = useState<string[]>(notifications.filter(n => n.read).map(n => n.id));
  const markAllRead = () => setReadIds(notifications.map(n => n.id));
  const markRead = (id: string) => setReadIds(prev => [...prev, id]);
  const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread notifications</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs border-border"><CheckCheck className="mr-1.5 h-3 w-3" /> Mark all read</Button>
      </div>

      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {notifications.map(n => {
          const isRead = readIds.includes(n.id);
          const Icon = typeIcons[n.type] || Bell;
          return (
            <div key={n.id} onClick={() => markRead(n.id)} className={`flex items-start gap-4 p-4 cursor-pointer transition-colors hover:bg-secondary/20 ${!isRead ? "bg-primary/5" : ""}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${typeColors[n.type] || "bg-secondary text-muted-foreground"}`}><Icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!isRead ? "text-foreground font-medium" : "text-foreground/80"}`}>{n.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
              {!isRead && <div className="w-2 h-2 rounded-full byld-gradient shrink-0 mt-2" />}
            </div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-20">
          <Bell className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-foreground font-medium mb-1">All caught up!</p>
          <p className="text-sm text-muted-foreground">No new notifications.</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
