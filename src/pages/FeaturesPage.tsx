import { Link } from "react-router-dom";
import { ArrowLeft, LayoutDashboard, ListTodo, Camera, FileText, DollarSign, Bell, Shield, BarChart3, Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: LayoutDashboard, title: "Project Dashboard", desc: "Get a bird's-eye view of all your projects with real-time progress tracking, status indicators, and budget summaries in one clean interface." },
  { icon: ListTodo, title: "Task Management", desc: "Organize work with Kanban boards, assign tasks to team members, set priorities and deadlines, and track progress across all projects." },
  { icon: Camera, title: "Site Updates", desc: "Contractors can upload photos, videos, and text updates from the field. Track progress visually with a timeline feed." },
  { icon: FileText, title: "Document Management", desc: "Store blueprints, contracts, permits, and reports securely. Organize by folders, preview files, and share with your team." },
  { icon: DollarSign, title: "Budget Tracking", desc: "Monitor expenses by category, track budget utilization per project, and receive alerts when spending approaches limits." },
  { icon: Users, title: "Team Collaboration", desc: "Manage team members, assign roles (Architect, Contractor, Client), and control access permissions across projects." },
  { icon: MessageSquare, title: "Project Chat", desc: "Communicate in real-time with project-based chat channels. Share updates, discuss issues, and keep conversations organized." },
  { icon: Bell, title: "Smart Notifications", desc: "Never miss a beat with alerts for task assignments, approaching deadlines, new uploads, and budget warnings." },
  { icon: Shield, title: "Role-Based Access", desc: "Architects, contractors, and clients each get tailored dashboards and permissions appropriate to their role." },
  { icon: BarChart3, title: "Analytics & Reports", desc: "Visualize project health with interactive charts, track completion rates, and identify potential delays before they happen." },
];

const FeaturesPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Features</h1>
      <p className="text-lg text-muted-foreground mb-12 max-w-2xl">Everything your construction team needs to manage projects efficiently, from planning to completion.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-6 byld-card-hover">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-16">
        <Button asChild className="byld-gradient text-primary-foreground border-0 h-11 px-8 shadow-md">
          <Link to="/signup">Get Started Free</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default FeaturesPage;
