import { useState } from "react";
import { FileText, Download, FolderOpen, Search, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { documents } from "@/data/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const tagColors: Record<string, string> = {
  drawing: "bg-primary/10 text-primary",
  invoice: "bg-warning-light text-warning-foreground",
  contract: "bg-success-light text-success-foreground",
};

const DocumentsPage = () => {
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All");
  const [previewDoc, setPreviewDoc] = useState<typeof documents[0] | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "date">("date");
  const folders = ["All", ...new Set(documents.map(d => d.folder))];

  const filtered = documents
    .filter(d => {
      if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeFolder !== "All" && d.folder !== activeFolder) return false;
      return true;
    })
    .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : b.date.localeCompare(a.date));

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">{documents.length} files across {folders.length - 1} folders</p>
        </div>
        <Button className="byld-gradient text-primary-foreground border-0 shadow-md"><Upload className="mr-2 h-4 w-4" /> Upload Files</Button>
      </div>

      <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
        <Upload className="h-8 w-8 text-muted-foreground/50 mx-auto mb-3" />
        <p className="text-sm text-muted-foreground">Drag and drop files here, or click to browse</p>
        <p className="text-xs text-muted-foreground/60 mt-1">PDF, DWG, XLSX, images up to 100MB</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-9 h-9 bg-secondary/50 border-border text-sm" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {folders.map(f => (
            <button key={f} onClick={() => setActiveFolder(f)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeFolder === f ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}><FolderOpen className="h-3 w-3" /> {f}</button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <button onClick={() => setSortBy("date")} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${sortBy === "date" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>Date</button>
          <button onClick={() => setSortBy("name")} className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${sortBy === "name" ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>Name</button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card divide-y divide-border">
        {filtered.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4 hover:bg-secondary/20 transition-colors group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0"><FileText className="h-4 w-4 text-primary" /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.size} · {doc.uploadedBy} · {doc.date}</p>
            </div>
            {doc.tags && (
              <div className="hidden md:flex items-center gap-1">
                {doc.tags.map(tag => (<span key={tag} className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${tagColors[tag] || "bg-secondary text-muted-foreground"}`}>{tag}</span>))}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => setPreviewDoc(doc)}><Eye className="h-3.5 w-3.5" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><Download className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">No documents found</p>
            <p className="text-sm text-muted-foreground">Try a different search or folder.</p>
          </div>
        )}
      </div>

      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader><DialogTitle className="text-foreground">{previewDoc?.name}</DialogTitle></DialogHeader>
          {previewDoc && (
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/50 border border-border h-64 flex items-center justify-center"><FileText className="h-16 w-16 text-muted-foreground/20" /></div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground text-xs">Type</span><p className="text-foreground">{previewDoc.type}</p></div>
                <div><span className="text-muted-foreground text-xs">Size</span><p className="text-foreground">{previewDoc.size}</p></div>
                <div><span className="text-muted-foreground text-xs">Uploaded by</span><p className="text-foreground">{previewDoc.uploadedBy}</p></div>
                <div><span className="text-muted-foreground text-xs">Date</span><p className="text-foreground">{previewDoc.date}</p></div>
              </div>
              <Button className="w-full byld-gradient text-primary-foreground border-0 shadow-md"><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DocumentsPage;
