import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LandingNav = () => {
  return (
    <nav className="sticky top-0 z-50 byld-glass">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-accent" />
          <span className="font-display font-bold text-xl text-foreground">BYLD</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="byld-gradient text-primary-foreground border-0">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
