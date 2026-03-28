import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Cloud, Cog, Zap } from "lucide-react";

const integrations = [
  { icon: FileText, name: "Autodesk BIM 360", desc: "Sync BIM models and drawings directly into your BYLD projects.", category: "Design" },
  { icon: Cloud, name: "Google Drive", desc: "Connect your Google Drive for seamless document access and storage.", category: "Storage" },
  { icon: Cog, name: "Procore", desc: "Import projects, RFIs, and submittals from Procore into BYLD.", category: "Management" },
  { icon: Zap, name: "Zapier", desc: "Automate workflows by connecting BYLD with 5,000+ other apps.", category: "Automation" },
  { icon: Cloud, name: "Dropbox", desc: "Sync construction documents and blueprints from Dropbox.", category: "Storage" },
  { icon: FileText, name: "PlanGrid", desc: "Access plan sheets and field reports within your project workspace.", category: "Field" },
];

const IntegrationsPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Integrations</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">Connect BYLD with the tools your team already uses.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="rounded-xl border border-border bg-card p-6 byld-card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <span className="text-[10px] text-muted-foreground">{item.category}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default IntegrationsPage;
