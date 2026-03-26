import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { toast } = useToast();

  const handleSignup = (e: React.FormEvent) => {
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
          <h2 className="font-display text-3xl font-bold mb-4">Start building with BYLD</h2>
          <p className="opacity-80">Create your account and start managing construction projects with your team today.</p>
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

          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Create account</h1>
          <p className="text-sm text-muted-foreground mb-8">Get started with your free BYLD account</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10 bg-secondary/50 border-border/50" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@company.com" className="pl-10 bg-secondary/50 border-border/50" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>
            <div>
              <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-secondary/50 border-border/50" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="mt-1.5 bg-secondary/50 border-border/50">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  <SelectItem value="architect">Architect</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full byld-gradient text-primary-foreground border-0 h-11 shadow-lg shadow-primary/20">
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:text-primary/80">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
