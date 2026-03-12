import { Link } from "react-router-dom";
import { Plus, TrendingUp, Clock, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, activities } from "@/data/mockData";

const statusColors: Record<string, string> = {
  active: "bg-success-light text-success-foreground",
  delayed: "bg-warning-light text-warning-foreground",
  completed: "bg-muted text-muted-foreground",
};

const Dashboard = () => {
  const activeCount = projects.filter((p) => p.status === "active").length;
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back, Sarah. Here's your project overview.</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Projects", value: activeCount, icon: TrendingUp, color: "text-success" },
          { label: "Total Projects", value: projects.length, icon: Clock, color: "text-info" },
          { label: "Total Budget", value: `$${(totalBudget / 1e6).toFixed(1)}M`, icon: DollarSign, color: "text-accent" },
          { label: "Total Spent", value: `$${(totalSpent / 1e6).toFixed(1)}M`, icon: Activity, color: "text-warning" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project cards */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-display font-semibold text-foreground">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="rounded-xl border bg-card p-5 byld-card-hover block"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">{project.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <Progress value={project.progress} className="h-2 mb-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.progress}% complete</span>
                  <span className="text-xs text-muted-foreground">Due {project.deadline}</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {project.team.map((m) => (
                    <div
                      key={m.name}
                      className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium text-muted-foreground border-2 border-card -ml-1 first:ml-0"
                      title={m.name}
                    >
                      {m.avatar}
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-foreground">Recent Activity</h2>
          <div className="rounded-xl border bg-card divide-y">
            {activities.slice(0, 5).map((a) => (
              <div key={a.id} className="p-4">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{a.user}</span>{" "}
                  <span className="text-muted-foreground">{a.action}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(a.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
