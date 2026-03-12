import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { projects, tasks, siteUpdates, activities, expenses, documents } from "@/data/mockData";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Calendar,
  DollarSign,
  Camera,
  Video,
  MessageSquare,
  FileText,
  Download,
  FolderOpen,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const statusColumns = [
  { key: "todo" as const, label: "To Do", color: "border-t-muted-foreground" },
  { key: "in-progress" as const, label: "In Progress", color: "border-t-info" },
  { key: "review" as const, label: "Review", color: "border-t-warning" },
  { key: "completed" as const, label: "Completed", color: "border-t-success" },
];

const priorityColors: Record<string, string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-warning-light text-warning-foreground",
  low: "bg-muted text-muted-foreground",
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

  const folders = [...new Set(documents.map((d) => d.folder))];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon" className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground truncate">{project.name}</h1>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="updates">Site Updates</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* OVERVIEW */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Progress</h3>
              <Progress value={project.progress} className="h-3" />
              <p className="text-2xl font-bold font-display text-foreground">{project.progress}%</p>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" /> Deadline
              </h3>
              <p className="text-2xl font-bold font-display text-foreground">{project.deadline}</p>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" /> Budget
              </h3>
              <p className="text-2xl font-bold font-display text-foreground">
                ${(project.spent / 1e6).toFixed(1)}M <span className="text-base font-normal text-muted-foreground">/ ${(project.budget / 1e6).toFixed(1)}M</span>
              </p>
              <Progress value={budgetPercent} className="h-2" />
            </div>
          </div>

          {/* Team */}
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Team</h3>
            <div className="flex flex-wrap gap-4">
              {project.team.map((m) => (
                <div key={m.name} className="flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3">
                  <div className="w-9 h-9 rounded-full byld-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {m.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-6 rounded-xl border bg-card p-6">
            <h3 className="font-semibold text-foreground mb-4">Key Milestones</h3>
            <div className="space-y-3">
              {["Foundation Complete", "Structural Framework", "Exterior Finishing", "Interior Fit-out", "Final Inspection"].map((m, i) => (
                <div key={m} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${i < Math.ceil(project.progress / 20) ? "byld-gradient" : "bg-muted"}`} />
                  <span className={`text-sm ${i < Math.ceil(project.progress / 20) ? "text-foreground" : "text-muted-foreground"}`}>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* TASKS */}
        <TabsContent value="tasks">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Task Board</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0">
              <Plus className="mr-1 h-3 w-3" /> Add Task
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statusColumns.map((col) => (
              <div key={col.key} className={`rounded-xl border bg-muted/30 p-3 border-t-4 ${col.color}`}>
                <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                  {col.label}
                  <span className="text-xs text-muted-foreground font-normal">
                    {tasks.filter((t) => t.status === col.key).length}
                  </span>
                </h4>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === col.key)
                    .map((task) => (
                      <div key={task.id} className="rounded-lg border bg-card p-3 byld-card-hover cursor-pointer">
                        <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium capitalize ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{task.assignee.split(" ")[0]}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* SITE UPDATES */}
        <TabsContent value="updates">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Site Updates</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0">
              <Plus className="mr-1 h-3 w-3" /> Add Update
            </Button>
          </div>
          <div className="space-y-4">
            {siteUpdates.map((update) => {
              const Icon = updateIcons[update.type];
              return (
                <div key={update.id} className="rounded-xl border bg-card p-5 flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{update.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-muted-foreground">{update.uploadedBy}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(update.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </span>
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
            <Button size="sm" className="byld-gradient text-primary-foreground border-0">
              <Plus className="mr-1 h-3 w-3" /> Upload
            </Button>
          </div>
          {/* Folder tabs */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {folders.map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-muted text-muted-foreground cursor-pointer hover:bg-accent/10 hover:text-foreground transition-colors">
                <FolderOpen className="h-3.5 w-3.5" /> {f}
              </span>
            ))}
          </div>
          <div className="rounded-xl border bg-card divide-y">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-info-light flex items-center justify-center shrink-0">
                  <FileText className="h-4 w-4 text-info" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadedBy} · {doc.date}</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Download className="h-4 w-4" />
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
              <div key={s.label} className="rounded-xl border bg-card p-5">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <p className={`text-2xl font-bold font-display mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
          <Progress value={budgetPercent} className="h-3 mb-6" />

          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">Expenses</h2>
            <Button size="sm" className="byld-gradient text-primary-foreground border-0">
              <Plus className="mr-1 h-3 w-3" /> Add Expense
            </Button>
          </div>
          <div className="rounded-xl border bg-card divide-y">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-4">
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
                  {i < activities.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                <div className="pb-6">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{a.user}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
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
