import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ListTodo,
  Camera,
  FileText,
  DollarSign,
  Bell,
  Shield,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Project Dashboard",
    description: "Get a bird's-eye view of all your projects with real-time progress tracking and status indicators.",
  },
  {
    icon: ListTodo,
    title: "Task Management",
    description: "Kanban boards with drag-and-drop, task assignments, deadlines, and team collaboration.",
  },
  {
    icon: Camera,
    title: "Site Updates",
    description: "Upload photos, videos, and progress notes from the construction site in real time.",
  },
  {
    icon: FileText,
    title: "Document Management",
    description: "Store and organize blueprints, contracts, permits, and reports in one secure place.",
  },
  {
    icon: DollarSign,
    title: "Budget Tracking",
    description: "Monitor expenses, track budgets, and keep your construction projects financially on track.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Stay updated with alerts for task assignments, deadlines, uploads, and project milestones.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Architects, contractors, and clients each get tailored access to what they need.",
  },
  {
    icon: BarChart3,
    title: "Activity Timeline",
    description: "A chronological log of every action taken across your projects for full transparency.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-accent uppercase tracking-widest mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-foreground"
          >
            Everything you need to manage construction
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border bg-card p-6 byld-card-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
