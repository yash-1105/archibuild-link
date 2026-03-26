import { useState } from "react";
import { Plus, Search, Mail, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { teamMembers } from "@/data/mockData";

const roleColors: Record<string, string> = {
  Architect: "bg-primary/10 text-primary border border-primary/20",
  Contractor: "bg-warning-light text-warning-foreground border border-warning/20",
  Client: "bg-success-light text-success-foreground border border-success/20",
};

const statusDots: Record<string, string> = {
  online: "bg-success",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
};

const TeamPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = teamMembers.filter(m => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && m.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Team</h1>
          <p className="text-sm text-muted-foreground mt-1">{teamMembers.length} members across all projects</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search members..." className="pl-9 h-9 bg-secondary/50 border-border/50 text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["all", "Architect", "Contractor", "Client"].map(r => (
          <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${roleFilter === r ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
            {r}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(member => (
          <div key={member.name} className="rounded-xl border border-border/50 bg-card p-5 byld-card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl byld-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {member.avatar}
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${statusDots[member.status || "offline"]}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${roleColors[member.role]}`}>{member.role}</span>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span>{member.email}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground capitalize flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${statusDots[member.status || "offline"]}`} />
                {member.status}
              </span>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground hover:text-foreground">
                Message
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No team members found.</p>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
