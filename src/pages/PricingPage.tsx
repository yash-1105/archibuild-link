import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", price: "Free", description: "For small teams getting started", features: ["1 active project", "3 team members", "Basic task management", "1GB storage"], highlighted: false },
  { name: "Professional", price: "$49", period: "/mo", description: "For growing construction teams", features: ["Unlimited projects", "25 team members", "Kanban boards", "Budget tracking", "Site updates", "25GB storage"], highlighted: true },
  { name: "Enterprise", price: "Custom", description: "For large organizations", features: ["Everything in Pro", "Unlimited members", "Priority support", "Custom integrations", "AI analytics", "Unlimited storage"], highlighted: false },
];

const PricingPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold text-foreground mb-3">Pricing</h1>
        <p className="text-lg text-muted-foreground">Simple, transparent pricing for every team size.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-2xl border p-8 flex flex-col bg-card ${plan.highlighted ? "border-primary/30 byld-glow relative" : "border-border"}`}>
            {plan.highlighted && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold px-3 py-1 rounded-full byld-gradient text-primary-foreground">Most Popular</span>}
            <h3 className="font-display font-semibold text-lg text-foreground">{plan.name}</h3>
            <div className="mt-4 mb-2">
              <span className="text-4xl font-bold font-display text-foreground">{plan.price}</span>
              {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success" /> {f}
                </li>
              ))}
            </ul>
            <Button asChild className={plan.highlighted ? "byld-gradient text-primary-foreground border-0 shadow-md" : "border-border"} variant={plan.highlighted ? "default" : "outline"}>
              <Link to="/signup">{plan.highlighted ? "Start Free Trial" : plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PricingPage;
