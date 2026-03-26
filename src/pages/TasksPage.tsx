import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { tasks, projects } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Task } from "@/data/mockData";

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

const TasksPage = () => {
  const [filterProject, setFilterProject] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filtered = tasks.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterProject !== "all" && t.projectId !== filterProject) return false;
    if (filterPriority !== "all" && t.priority !== filterPriority) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{tasks.length} tasks across all projects</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select
          value={filterProject}
          onChange={e => setFilterProject(e.target.value)}
          className="h-9 px-3 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground"
        >
          <option value="all">All Projects</option>
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <div className="flex items-center gap-1.5">
          {["all", "high", "medium", "low"].map(p => (
            <button key={p} onClick={() => setFilterPriority(p)} className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-all ${filterPriority === p ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusColumns.map((col) => {
          const colTasks = filtered.filter(t => t.status === col.key);
          return (
            <div key={col.key} className={`rounded-xl border border-border/50 bg-secondary/20 p-3 border-t-2 ${col.color}`}>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center justify-between">
                {col.label}
                <span className="text-xs text-muted-foreground font-normal bg-secondary px-2 py-0.5 rounded-full">{colTasks.length}</span>
              </h4>
              <div className="space-y-2">
                {colTasks.map((task) => (
                  <div key={task.id} onClick={() => setSelectedTask(task)} className="rounded-lg border border-border/50 bg-card p-3 byld-card-hover cursor-pointer group">
                    <p className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium capitalize ${priorityColors[task.priority]}`}>{task.priority}</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[9px] font-medium text-muted-foreground">{task.assignee.split(" ").map(n => n[0]).join("")}</div>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-2">{task.deadline}</p>
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground text-xs">No tasks</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      <Dialog open={!!selectedTask} onOpenChange={() => setSelectedTask(null)}>
        <DialogContent className="bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-foreground">{selectedTask?.title}</DialogTitle>
          </DialogHeader>
          {selectedTask && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assignee</p>
                  <p className="text-sm text-foreground">{selectedTask.assignee}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Priority</p>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${priorityColors[selectedTask.priority]}`}>{selectedTask.priority}</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className="text-sm text-foreground">{selectedTask.deadline}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm text-foreground capitalize">{selectedTask.status.replace("-", " ")}</p>
                </div>
              </div>
              {selectedTask.description && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground/80">{selectedTask.description}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Comments</p>
                <div className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">No comments yet</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TasksPage;
