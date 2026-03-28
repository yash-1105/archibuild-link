import { useState } from "react";
import { User, Bell, Palette, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const [name, setName] = useState("Sarah Chen");
  const [email, setEmail] = useState("sarah@byld.com");
  const [role, setRole] = useState("architect");
  const { toast } = useToast();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2"><User className="h-4 w-4 text-primary" /><h2 className="font-display font-semibold text-foreground">Profile</h2></div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl byld-gradient flex items-center justify-center text-lg font-bold text-primary-foreground">SC</div>
          <div>
            <p className="text-sm font-medium text-foreground">Sarah Chen</p>
            <p className="text-xs text-muted-foreground">Lead Architect</p>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-primary mt-1 px-0 hover:bg-transparent">Change avatar</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label className="text-xs text-muted-foreground">Full Name</Label><Input value={name} onChange={e => setName(e.target.value)} className="mt-1.5 bg-secondary/50 border-border" /></div>
          <div><Label className="text-xs text-muted-foreground">Email</Label><Input value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 bg-secondary/50 border-border" /></div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="mt-1.5 bg-secondary/50 border-border w-full sm:w-48"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="architect">Architect</SelectItem>
              <SelectItem value="contractor">Contractor</SelectItem>
              <SelectItem value="client">Client</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2"><Bell className="h-4 w-4 text-primary" /><h2 className="font-display font-semibold text-foreground">Notifications</h2></div>
        {[
          { label: "Task assignments", desc: "Get notified when you're assigned a task", defaultChecked: true },
          { label: "Deadline reminders", desc: "Receive alerts before task deadlines", defaultChecked: true },
          { label: "Site updates", desc: "New uploads and progress reports", defaultChecked: true },
          { label: "Budget alerts", desc: "Expense tracking and budget warnings", defaultChecked: false },
          { label: "Email digest", desc: "Daily summary of project activity", defaultChecked: false },
        ].map(item => (
          <div key={item.label} className="flex items-center justify-between py-1">
            <div><p className="text-sm text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
            <Switch defaultChecked={item.defaultChecked} />
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2"><Palette className="h-4 w-4 text-primary" /><h2 className="font-display font-semibold text-foreground">Appearance</h2></div>
        <div className="flex items-center justify-between">
          <div><p className="text-sm text-foreground">Light Mode</p><p className="text-xs text-muted-foreground">Use light theme across the application</p></div>
          <Switch defaultChecked />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div className="flex items-center gap-2 mb-2"><Shield className="h-4 w-4 text-primary" /><h2 className="font-display font-semibold text-foreground">Security</h2></div>
        <Button variant="outline" size="sm" className="border-border text-sm">Change Password</Button>
      </div>

      <Button onClick={() => toast({ title: "Settings saved", description: "Your preferences have been updated." })} className="byld-gradient text-primary-foreground border-0 shadow-md">
        <Save className="mr-2 h-4 w-4" /> Save Changes
      </Button>
    </div>
  );
};

export default SettingsPage;
