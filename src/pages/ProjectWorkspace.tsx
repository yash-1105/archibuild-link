import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, tasks, siteUpdates, activities, expenses, documents } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Plus, Calendar, DollarSign, Camera, Video, MessageSquare, FileText,
  Download, FolderOpen, ArrowLeft, Heart, MessageCircle, Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const statusColumns = [
  { key: "todo" as const, label: "To Do", color: "border-t-muted-foreground" },
  { key: "in-progress" as const, label: "In Progress", color: "border-t-primary" },
  { key: "review" as const, label: "Review", color: "border-t-warning" },
  { key: "completed" as const, label: "Completed", color: "border-t-success" },
];

const priorityColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border border-destructive/20",
  medium: "bg-warning-light text-warning-foreground border border-warning/20",
  low: "bg-secondary text-muted-foreground border border-border/50",
};

const updateIcons: Record<string, React.ElementType> = {
  photo: Camera,
  video: Video,
  text: MessageSquare,
};

const ProjectWorkspace = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const remaining = project.budget - project.spent;
  const budgetPercent = Math.round((project.spent / project.budget) * 100);
  const projectTasks = tasks.filter(t => t.projectId === id || !t.projectId);
  const projectUpdates = siteUpdates.filter(u => u.projectId === id || !u.projectId);
  const folders = [...new Set(documents.map((d) => d.folder))];

  const budgetData = [
    { name: "Budget", value: project.budget / 1000 },
    { name: "Spent", value: project.spent / 1000 },
    { name: "Remaining", value: remaining / 1000 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/projects">
          <Button variant="ghost" size="icon" className="shrink-0 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground truncate">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {project.team.map(m => (
            <div key={m.name} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground border border-border/50 -ml-1 first:ml-0" title={m.name}>
              {m.avatar}
            </div>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-secondary/50 border border-border/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-card">Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-card">Tasks</TabsTrigger>
          <TabsTrigger value="updates" className="data-[state=active]:bg-card">Updates</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-card">Files</TabsTrigger>
          <TabsTrigger value="budget" className="data-[state=active]:bg-card">Budget</TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-card">Activity</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground text-sm">Progress</h3>
              <Progress value={project.progress} className="h-2" />
              <p className="text-3xl font-bold font-display text-foreground">{project.progress}%</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" /> Deadline
              </h3>
              <p className="text-3xl font-bold font-display text-foreground">{project.deadline}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" /> Budget
              </h3>
              <p className="text-3xl font-bold font-display text-foreground">
                ${(project.spent / 1e6).toFixed(1)}M <span className="text-base font-normal text-muted-foreground">/ ${(project.budget / 1e6).toFixed(1)}M</span>
              </p>
              <Progress value={budgetPercent} className="h-1.5" />
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border/50 bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Team</h3>
            <div className="flex flex-wrap gap-3">
              {project.team.map((m) => (
                <div key={m.name} className="flex items-center gap-3 rounded-xl bg-secondary/50 border border-border/30 px-4 py-3">
                  <div className="w-9 h-9 rounded-lg byld-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">{m.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border/50 bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Key Milestones</h3>
            <div className="space-y-3">
              {["Foundation Complete", "Structural Framework", "Exterior Finishing", "Interior Fit-out", "Final Inspection"].map((m, i) => {
                const done = i < Math.ceil(project.progress / 20);
                return (
                  <div key={m} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${done ? "byld-gradient" : "bg-secondary border border-border/50"}`} />
                    <span className={`text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>{m}</span>
                    {done && <span className="text-[10px] text-success ml-auto">✓ Complete</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        {/* TASKS */}
        <TabsContent value="tasks">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Task Board</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
              <Plus className="mr-1 h-3 w-3" /> Add Task
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusColumns.map((col) => {
              const colTasks = projectTasks.filter(t => t.status === col.key);
              return (
                <div key={col.key} className={`rounded-xl border border-border/50 bg-secondary/20 p-3 border-t-2 ${col.color}`}>
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                    {col.label}
                    <span className="text-xs text-muted-foreground font-normal bg-secondary px-2 py-0.5 rounded-full">{colTasks.length}</span>
                  </h4>
                  <div className="space-y-2">
                    {colTasks.map((task) => (
                      <div key={task.id} className="rounded-lg border border-border/50 bg-card p-3 byld-card-hover cursor-pointer group">
                        <p className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium capitalize ${priorityColors[task.priority]}`}>{task.priority}</span>
                          <span className="text-[10px] text-muted-foreground">{task.assignee.split(" ")[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* SITE UPDATES */}
        <TabsContent value="updates">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Site Updates</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
              <Plus className="mr-1 h-3 w-3" /> Add Update
            </Button>
          </div>
          <div className="space-y-4">
            {projectUpdates.map((update) => {
              const Icon = updateIcons[update.type];
              return (
                <div key={update.id} className="rounded-xl border border-border/50 bg-card p-5 byld-card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      {update.uploadedBy.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-foreground">{update.uploadedBy}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(update.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/90 mb-3">{update.description}</p>
                      {(update.type === "photo" || update.type === "video") && (
                        <div className="rounded-lg bg-secondary/50 border border-border/30 h-40 flex items-center justify-center mb-3">
                          <Icon className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                      <div className="flex items-center gap-4 pt-2 border-t border-border/30">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary text-xs transition-colors">
                          <Heart className="h-3.5 w-3.5" /> {update.likes || 0}
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-primary text-xs transition-colors">
                          <MessageCircle className="h-3.5 w-3.5" /> {update.comments?.length || 0}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* DOCUMENTS */}
        <TabsContent value="documents">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Documents</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
              <Plus className="mr-1 h-3 w-3" /> Upload
            </Button>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            {folders.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-secondary/50 border border-border/50 text-muted-foreground cursor-pointer hover:border-primary/30 hover:text-foreground transition-all">
                <FolderOpen className="h-3 w-3" /> {f}
              </span>
            ))}
          </div>
          <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadedBy} · {doc.date}</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-muted-foreground hover:text-foreground">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* BUDGET */}
        <TabsContent value="budget">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Budget", value: `$${(project.budget / 1e6).toFixed(1)}M`, color: "text-foreground" },
              { label: "Total Spent", value: `$${(project.spent / 1e6).toFixed(1)}M`, color: "text-warning" },
              { label: "Remaining", value: `$${(remaining / 1e6).toFixed(1)}M`, color: "text-success" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/50 bg-card p-5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                <p className={`text-3xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <Progress value={budgetPercent} className="h-2 mb-6" />

          <div className="rounded-xl border border-border/50 bg-card p-5 mb-6">
            <h3 className="font-display font-semibold text-foreground text-sm mb-4">Budget Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={budgetData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: 'hsl(220, 25%, 7%)', border: '1px solid hsl(220, 20%, 14%)', borderRadius: '8px', color: 'hsl(210, 20%, 92%)' }} />
                <Bar dataKey="value" fill="hsl(230, 80%, 65%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Expenses</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
              <Plus className="mr-1 h-3 w-3" /> Add Expense
            </Button>
          </div>
          <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4 hover:bg-secondary/20 transition-colors">
                <div>
                  <p className="text-sm font-medium text-foreground">{exp.description}</p>
                  <p className="text-xs text-muted-foreground">{exp.category} · {exp.date}</p>
                </div>
                <span className="text-sm font-semibold text-foreground">${exp.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ACTIVITY */}
        <TabsContent value="activity">
          <h2 className="font-display font-semibold text-foreground mb-4">Project Activity</h2>
          <div className="space-y-0">
            {activities.map((a, i) => (
              <div key={a.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full byld-gradient shrink-0 mt-1.5" />
                  {i < activities.length - 1 && <div className="w-px flex-1 bg-border/50" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm text-foreground">
                    <span className="font-medium text-primary">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {new Date(a.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectWorkspace;
