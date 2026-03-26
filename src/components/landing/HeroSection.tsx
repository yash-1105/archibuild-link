import { motion } from "framer-motion";
import { ArrowRight, Building2, Zap, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute bottom-20 left-20 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6"
          >
            <Zap className="h-3.5 w-3.5" />
            AI-Powered Construction Management
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Build Better Projects,{" "}
            <span className="byld-gradient-text">Together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl"
          >
            BYLD helps architects, contractors, and clients manage projects, tasks,
            finances, and site updates — all in one centralized platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="byld-gradient text-primary-foreground font-semibold px-8 h-12 text-base border-0 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              <Link to="/signup">
                Start Free Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 text-base px-8 border-border/50 hover:bg-secondary">
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-6 mt-12"
          >
            {[
              { icon: Shield, text: "Enterprise Grade" },
              { icon: BarChart3, text: "Real-time Analytics" },
              { icon: Zap, text: "AI Powered" },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-2 text-muted-foreground">
                <b.icon className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">{b.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/5 overflow-hidden byld-glow"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-secondary/30">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">BYLD — Project Dashboard</span>
          </div>
          <div className="p-8 bg-gradient-to-br from-card to-secondary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Active Projects", value: "12", change: "+3 this month" },
                { label: "Tasks Completed", value: "284", change: "94% on time" },
                { label: "Budget Tracked", value: "$2.4M", change: "Under budget" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold font-display text-foreground mt-1">{stat.value}</p>
                  <p className="text-[10px] text-success mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[{ name: "Riverside Tower Complex", pct: 72 }, { name: "Metro Station Renovation", pct: 45 }].map((p) => (
                <div key={p.name} className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground text-sm">{p.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Active</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-secondary">
                    <div className="h-1.5 rounded-full byld-gradient" style={{ width: `${p.pct}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{p.pct}% complete</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
