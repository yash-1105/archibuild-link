import { Eye, DollarSign, Camera, CheckSquare, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { projects, siteUpdates, tasks } from "@/data/mockData";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
const totalSpent = projects.reduce((s, p) => s + p.spent, 0);

const statusData = [
  { name: "Active", value: projects.filter(p => p.status === "active").length, color: "hsl(217, 91%, 60%)" },
  { name: "Delayed", value: projects.filter(p => p.status === "delayed").length, color: "hsl(38, 92%, 50%)" },
  { name: "Completed", value: projects.filter(p => p.status === "completed").length, color: "hsl(152, 69%, 40%)" },
];

const tooltipStyle = { background: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 13%, 91%)', borderRadius: '8px', color: 'hsl(220, 20%, 10%)' };

const ClientDashboard = () => {
  const approvalCount = tasks.filter(t => t.status === "review").length;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Welcome, Emily 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's a summary of your project investments.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, icon: Eye, color: "text-primary" },
          { label: "Budget Spent", value: `${Math.round((totalSpent / totalBudget) * 100)}%`, icon: DollarSign, color: "text-warning" },
          { label: "Site Updates", value: siteUpdates.length, icon: Camera, color: "text-info" },
          { label: "Pending Approvals", value: approvalCount, icon: CheckSquare, color: "text-accent" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">Project Progress</h2>
            <Link to="/projects" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          {projects.filter(p => p.status !== "completed").map(p => (
            <div key={p.id} className="rounded-xl border border-border bg-card p-5 byld-card-hover">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                <span className="text-xs text-muted-foreground">{p.progress}%</span>
              </div>
              <Progress value={p.progress} className="h-2 mb-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Due {p.deadline}</span>
                <span>${(p.spent / 1e6).toFixed(1)}M / ${(p.budget / 1e6).toFixed(1)}M</span>
              </div>
            </div>
          ))}
        </div>

        {/* Status chart + recent updates */}
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-display font-semibold text-foreground text-sm mb-3">Project Status</h3>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={4} dataKey="value">
                  {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-foreground text-sm mb-3">Latest Updates</h3>
            <div className="rounded-xl border border-border bg-card divide-y divide-border">
              {siteUpdates.slice(0, 3).map(u => (
                <div key={u.id} className="p-3">
                  <p className="text-sm text-foreground line-clamp-2">{u.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{u.uploadedBy} · {new Date(u.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
