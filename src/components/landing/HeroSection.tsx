import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent mb-6"
          >
            <Building2 className="h-4 w-4" />
            Construction Project Management
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
            <Button asChild size="lg" className="byld-gradient text-primary-foreground font-semibold px-8 h-12 text-base border-0">
              <Link to="/signup">
                Start Free Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 text-base px-8">
              <Link to="/login">Sign In</Link>
            </Button>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 rounded-xl border bg-card shadow-2xl shadow-primary/5 overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-warning/60" />
              <div className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">BYLD — Project Dashboard</span>
          </div>
          <div className="p-8 bg-gradient-to-br from-card to-muted/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: "Active Projects", value: "12", change: "+3 this month" },
                { label: "Tasks Completed", value: "284", change: "94% on time" },
                { label: "Budget Tracked", value: "$2.4M", change: "Under budget" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-lg border bg-card p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold font-display text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-success mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Riverside Tower Complex", "Metro Station Renovation"].map((name) => (
                <div key={name} className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-foreground text-sm">{name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success-light text-success-foreground">Active</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <div className="h-2 rounded-full byld-gradient" style={{ width: name.includes("River") ? "72%" : "45%" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{name.includes("River") ? "72" : "45"}% complete</p>
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
