import { Camera, Video, MessageSquare, Heart, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteUpdates, projects } from "@/data/mockData";

const updateIcons: Record<string, React.ElementType> = { photo: Camera, video: Video, text: MessageSquare };
const tagColors: Record<string, string> = {
  progress: "bg-success-light text-success-foreground border border-success/20",
  delay: "bg-destructive/10 text-destructive border border-destructive/20",
  issue: "bg-warning-light text-warning-foreground border border-warning/20",
};

const SiteUpdatesPage = () => (
  <div className="p-6 max-w-3xl mx-auto space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Site Updates</h1>
        <p className="text-sm text-muted-foreground mt-1">Latest progress from all construction sites</p>
      </div>
      <Button className="byld-gradient text-primary-foreground border-0 shadow-md"><Plus className="mr-2 h-4 w-4" /> Post Update</Button>
    </div>

    <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
      <Camera className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
      <p className="text-sm text-muted-foreground">Drop photos or videos here, or click to upload</p>
      <p className="text-xs text-muted-foreground/60 mt-1">Supports JPG, PNG, MP4 up to 50MB</p>
    </div>

    <div className="space-y-4">
      {siteUpdates.map((update) => {
        const Icon = updateIcons[update.type];
        const project = projects.find(p => p.id === update.projectId);
        return (
          <div key={update.id} className="rounded-xl border border-border bg-card p-5 byld-card-hover">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">{update.uploadedBy.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-foreground">{update.uploadedBy}</span>
                  {project && <span className="text-xs text-muted-foreground">in {project.name}</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-3">{new Date(update.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                <p className="text-sm text-foreground/90 mb-3">{update.description}</p>
                {(update.type === "photo" || update.type === "video") && (
                  <div className="rounded-lg bg-secondary/50 border border-border h-48 flex items-center justify-center mb-3"><Icon className="h-8 w-8 text-muted-foreground/30" /></div>
                )}
                {update.tags && (
                  <div className="flex items-center gap-1.5 mb-3">
                    {update.tags.map(tag => (<span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${tagColors[tag] || "bg-secondary text-muted-foreground"}`}>{tag}</span>))}
                  </div>
                )}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary text-xs transition-colors"><Heart className="h-3.5 w-3.5" /> {update.likes || 0}</button>
                  <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary text-xs transition-colors"><MessageCircle className="h-3.5 w-3.5" /> {update.comments?.length || 0}</button>
                </div>
                {update.comments && update.comments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {update.comments.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 pl-2 border-l-2 border-border">
                        <div className="flex-1">
                          <span className="text-xs font-medium text-foreground">{c.user}</span>
                          <span className="text-xs text-muted-foreground ml-2">{c.time}</span>
                          <p className="text-xs text-foreground/80 mt-0.5">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default SiteUpdatesPage;
