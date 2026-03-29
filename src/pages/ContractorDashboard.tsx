import { Camera, ListTodo, AlertTriangle, CheckCircle2, Clock, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { tasks, siteUpdates, projects } from "@/data/mockData";
import { Link } from "react-router-dom";

const myTasks = tasks.filter(t => t.assignee === "Mike Johnson");
const pendingTasks = myTasks.filter(t => t.status !== "completed");
const completedTasks = myTasks.filter(t => t.status === "completed");

const statusColors: Record<string, string> = {
  todo: "bg-muted text-muted-foreground",
  "in-progress": "bg-info-light text-info-foreground border border-info/20",
  review: "bg-warning-light text-warning-foreground border border-warning/20",
  completed: "bg-success-light text-success-foreground border border-success/20",
};

const priorityColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning-light text-warning-foreground",
  low: "bg-muted text-muted-foreground",
};

const ContractorDashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Mike 👷</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's your task overview for today.</p>
        </div>
        <Link to="/updates">
          <Button className="byld-gradient text-primary-foreground border-0 shadow-md">
            <Upload className="mr-2 h-4 w-4" /> Upload Update
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Pending Tasks", value: pendingTasks.length, icon: ListTodo, color: "text-primary" },
          { label: "Completed", value: completedTasks.length, icon: CheckCircle2, color: "text-success" },
          { label: "In Review", value: myTasks.filter(t => t.status === "review").length, icon: Clock, color: "text-warning" },
          { label: "Updates Posted", value: siteUpdates.filter(s => s.uploadedBy === "Mike Johnson").length, icon: Camera, color: "text-info" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Tasks */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3">My Tasks</h2>
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {pendingTasks.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">All tasks completed! 🎉</p>
              </div>
            ) : (
              pendingTasks.map(t => (
                <div key={t.id} className="p-4 hover:bg-secondary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">{t.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${priorityColors[t.priority]}`}>{t.priority}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[t.status]}`}>{t.status.replace("-", " ")}</span>
                    <span className="text-xs text-muted-foreground">Due {t.deadline}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3">My Recent Updates</h2>
          <div className="rounded-xl border border-border bg-card divide-y divide-border">
            {siteUpdates.filter(s => s.uploadedBy === "Mike Johnson").slice(0, 4).map(u => (
              <div key={u.id} className="p-4 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${u.type === "photo" ? "bg-info-light" : u.type === "video" ? "bg-accent/10" : "bg-muted"}`}>
                    <Camera className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{u.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(u.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard;
