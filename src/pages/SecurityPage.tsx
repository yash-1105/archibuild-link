import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Server, Eye } from "lucide-react";

const SecurityPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Security</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">Your data security is our top priority. Here's how we keep your projects safe.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: Lock, title: "End-to-End Encryption", desc: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Your project information never travels unprotected." },
          { icon: Shield, title: "SOC 2 Compliant", desc: "We undergo regular third-party audits to ensure our security practices meet the highest industry standards." },
          { icon: Server, title: "99.99% Uptime", desc: "Our infrastructure is hosted on enterprise-grade cloud providers with redundant backups and disaster recovery." },
          { icon: Eye, title: "Access Controls", desc: "Role-based permissions ensure team members only see what they need. Full audit logs track all activity." },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-6">
            <item.icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-display font-semibold text-foreground text-lg mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SecurityPage;
