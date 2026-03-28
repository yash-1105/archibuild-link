import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  { name: "Starter", price: "Free", description: "For small teams getting started", features: ["1 active project", "3 team members", "Basic task management", "1GB storage"], cta: "Get Started", highlighted: false },
  { name: "Professional", price: "$49", period: "/mo", description: "For growing construction teams", features: ["Unlimited projects", "25 team members", "Kanban boards", "Budget tracking", "Site updates", "25GB storage"], cta: "Start Free Trial", highlighted: true },
  { name: "Enterprise", price: "Custom", description: "For large organizations", features: ["Everything in Pro", "Unlimited members", "Priority support", "Custom integrations", "AI analytics", "Unlimited storage"], cta: "Contact Sales", highlighted: false },
];

const PricingSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Pricing</p>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Simple, transparent pricing</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-2xl border p-8 flex flex-col bg-card ${plan.highlighted ? "border-primary/30 byld-glow relative" : "border-border"}`}>
            {plan.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full byld-gradient text-primary-foreground">Most Popular</span>}
            <h3 className="font-display font-semibold text-lg text-foreground">{plan.name}</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (<li key={f} className="flex items-center gap-2 text-sm text-foreground"><Check className="h-4 w-4 text-success" />{f}</li>))}
            </ul>
            <Button asChild className={plan.highlighted ? "byld-gradient text-primary-foreground border-0 shadow-md" : "border-border"} variant={plan.highlighted ? "default" : "outline"}>
              <Link to="/signup">{plan.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
