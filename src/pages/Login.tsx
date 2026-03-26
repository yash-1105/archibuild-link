import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Demo Mode", description: "Redirecting to dashboard." });
    window.location.href = "/dashboard";
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
          <p className="text-sm text-muted-foreground mb-8">Enter your credentials to access your account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@company.com" className="pl-10 bg-secondary/50 border-border/50" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                <Link to="/forgot-password" className="text-xs text-primary hover:text-primary/80">Forgot password?</Link>
              </div>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-secondary/50 border-border/50" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <Button type="submit" className="w-full byld-gradient text-primary-foreground border-0 h-11 shadow-lg shadow-primary/20">
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
