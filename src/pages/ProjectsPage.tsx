import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, LayoutGrid, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { projects } from "@/data/mockData";

const statusColors: Record<string, string> = {
  active: "bg-primary/10 text-primary border border-primary/20",
  delayed: "bg-warning-light text-warning-foreground border border-warning/20",
  completed: "bg-success-light text-success-foreground border border-success/20",
};

const ProjectsPage = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = projects.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} projects total</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          {["all", "active", "delayed", "completed"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${statusFilter === s ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-auto">
          <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No projects found matching your filters.</p>
        </div>
      )}

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="rounded-xl border border-border/50 bg-card p-5 byld-card-hover block group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{project.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${statusColors[project.status]}`}>{project.status}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
              <Progress value={project.progress} className="h-1.5 mb-2" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{project.progress}%</span>
                <span className="text-xs text-muted-foreground">Due {project.deadline}</span>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1">
                  {project.team.slice(0, 3).map((m) => (
                    <div key={m.name} className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-muted-foreground border border-border/50 -ml-1 first:ml-0">{m.avatar}</div>
                  ))}
                  {project.team.length > 3 && <span className="text-[10px] text-muted-foreground ml-1">+{project.team.length - 3}</span>}
                </div>
                <span className="text-xs text-muted-foreground">${(project.budget / 1e6).toFixed(1)}M</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="rounded-xl border border-border/50 bg-card divide-y divide-border/30">
          {filtered.map((project) => (
            <Link key={project.id} to={`/project/${project.id}`} className="flex items-center gap-4 p-4 hover:bg-secondary/30 transition-colors group">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{project.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{project.description}</p>
              </div>
              <div className="w-32 hidden md:block">
                <Progress value={project.progress} className="h-1.5 mb-1" />
                <p className="text-[10px] text-muted-foreground">{project.progress}%</p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize hidden sm:block ${statusColors[project.status]}`}>{project.status}</span>
              <span className="text-xs text-muted-foreground hidden lg:block">{project.deadline}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
