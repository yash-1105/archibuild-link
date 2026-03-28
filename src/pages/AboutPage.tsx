import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Users, Globe, Award } from "lucide-react";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-4">About BYLD</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">We're building the future of construction project management — one tool that brings architects, contractors, and clients together.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Building2, title: "Our Mission", desc: "To simplify construction project management and help teams deliver projects on time and on budget." },
          { icon: Users, title: "Our Team", desc: "A passionate group of engineers, designers, and construction professionals building tools that matter." },
          { icon: Globe, title: "Global Reach", desc: "Used by construction teams across 30+ countries, from small renovations to large-scale developments." },
          { icon: Award, title: "Our Values", desc: "Transparency, simplicity, and reliability guide everything we build and every decision we make." },
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

export default AboutPage;
