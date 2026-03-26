import { Link } from "react-router-dom";
import { Plus, TrendingUp, Clock, DollarSign, Activity, CheckCircle2, ArrowUpRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, activities, tasks } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const budgetData = projects.filter(p => p.status !== "completed").map(p => ({
  name: p.name.split(" ")[0],
  budget: p.budget / 1000,
  spent: p.spent / 1000,
}));

const completionData = [
  { month: "Oct", value: 45 },
  { month: "Nov", value: 52 },
  { month: "Dec", value: 58 },
  { month: "Jan", value: 63 },
  { month: "Feb", value: 68 },
  { month: "Mar", value: 72 },
];

const statusData = [
  { name: "Active", value: projects.filter(p => p.status === "active").length, color: "hsl(230, 80%, 65%)" },
  { name: "Delayed", value: projects.filter(p => p.status === "delayed").length, color: "hsl(38, 92%, 50%)" },
  { name: "Completed", value: projects.filter(p => p.status === "completed").length, color: "hsl(152, 69%, 40%)" },
];

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary border border-primary/20",
  delayed: "bg-warning-light text-warning-foreground border border-warning/20",
  completed: "bg-success-light text-success-foreground border border-success/20",
};

const Dashboard = () => {
  const activeCount = projects.filter((p) => p.status === "active").length;
  const totalBudget = projects.reduce((s, p) => s + p.budget, 0);
  const totalSpent = projects.reduce((s, p) => s + p.spent, 0);
  const pendingTasks = tasks.filter(t => t.status !== "completed").length;

  const upcomingDeadlines = tasks
    .filter(t => t.status !== "completed")
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 4);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Welcome back, Sarah 👋</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening across your projects today.</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Projects", value: projects.length, icon: TrendingUp, change: "+2 this quarter", color: "text-primary" },
          { label: "Active Tasks", value: pendingTasks, icon: Clock, change: "3 due this week", color: "text-info" },
          { label: "Budget Usage", value: `${Math.round((totalSpent / totalBudget) * 100)}%`, icon: DollarSign, change: `$${(totalSpent / 1e6).toFixed(1)}M spent`, color: "text-warning" },
          { label: "Pending Approvals", value: tasks.filter(t => t.status === "review").length, icon: CheckCircle2, change: "2 need attention", color: "text-accent" },
        ].map((s, i) => (
          <div key={s.label} className="rounded-xl border border-border/50 bg-card p-5 byld-card-hover" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg bg-secondary flex items-center justify-center`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Chart */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Project Completion</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={completionData}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(230, 80%, 65%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(230, 80%, 65%)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} />
              <Area type="monotone" dataKey="value" stroke="hsl(230, 80%, 65%)" fillOpacity={1} fill="url(#colorProgress)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Chart */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Budget vs Expense</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={budgetData} barGap={4}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} />
              <Bar dataKey="budget" fill="hsl(220, 20%, 20%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spent" fill="hsl(230, 80%, 65%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status Pie */}
        <div className="rounded-xl border border-border/50 bg-card p-5">
          <h3 className="font-display font-semibold text-foreground text-sm mb-4">Project Status</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 -mt-2">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-muted-foreground">{s.name} ({s.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">Active Projects</h2>
            <Link to="/projects" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.filter(p => p.status !== "completed").map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="rounded-xl border border-border/50 bg-card p-5 byld-card-hover block group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{project.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[project.status]}`}>
                    {project.status}
                  </span>
                </div>
                <Progress value={project.progress} className="h-1.5 mb-2" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.progress}% complete</span>
                  <span className="text-xs text-muted-foreground">Due {project.deadline}</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {project.team.map((m) => (
                    <div
                      key={m.name}
                      className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-muted-foreground border border-border/50 -ml-1 first:ml-0"
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

        {/* Right column */}
        <div className="space-y-4">
          {/* Upcoming Deadlines */}
          <div>
            <h2 className="font-display font-semibold text-foreground mb-3">Upcoming Deadlines</h2>
            <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
              {upcomingDeadlines.map((t) => (
                <div key={t.id} className="p-3 flex items-center gap-3">
                  <div className={`w-1.5 h-8 rounded-full ${t.priority === "high" ? "bg-destructive" : t.priority === "medium" ? "bg-warning" : "bg-muted-foreground"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.deadline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <div>
            <h2 className="font-display font-semibold text-foreground mb-3">Recent Activity</h2>
            <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
              {activities.slice(0, 5).map((a) => (
                <div key={a.id} className="p-3">
                  <p className="text-sm text-foreground">
                    <span className="font-medium text-primary">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {new Date(a.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
