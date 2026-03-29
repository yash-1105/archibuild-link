import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Building2, Mail, Lock, ArrowRight, Ruler, HardHat, Eye, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRole, UserRole } from "@/contexts/RoleContext";

const roles = [
  { id: "architect" as UserRole, label: "Architect", icon: Ruler, desc: "Full project control & design management" },
  { id: "contractor" as UserRole, label: "Contractor", icon: HardHat, desc: "Update site progress & complete tasks" },
  { id: "client" as UserRole, label: "Client", icon: Eye, desc: "View progress, updates & documents" },
  { id: "consultant" as UserRole, label: "Consultant", icon: Briefcase, desc: "Review requests & share expertise" },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>("architect");
  const { toast } = useToast();
  const { setRole } = useRole();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(selectedRole);
    toast({ title: "Welcome back!", description: `Signed in as ${selectedRole}.` });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 byld-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsla(0,0%,100%,0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsla(0,0%,100%,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="relative max-w-md text-primary-foreground">
          <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center mb-8">
            <Building2 className="h-6 w-6" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">Welcome back to BYLD</h2>
          <p className="opacity-80">Manage your construction projects, track progress, and collaborate with your team.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg byld-gradient flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">BYLD</span>
          </Link>

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Sign in</h1>
          <p className="text-sm text-muted-foreground mb-6">Choose your role and sign in to continue</p>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all duration-200 ${
                  selectedRole === role.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/30 hover:bg-secondary/50"
                }`}
              >
                <role.icon className={`h-5 w-5 ${selectedRole === role.id ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${selectedRole === role.id ? "text-primary" : "text-foreground"}`}>{role.label}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mb-6 text-center">
            {roles.find(r => r.id === selectedRole)?.desc}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@company.com" className="pl-10 bg-secondary/50 border-border" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80">Forgot password?</Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-secondary/50 border-border" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full byld-gradient text-primary-foreground border-0 h-11 shadow-md hover:shadow-lg transition-shadow">
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:text-primary/80">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
