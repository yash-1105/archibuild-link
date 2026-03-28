import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-10">Have questions? We'd love to hear from you.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label className="text-xs text-muted-foreground">Name</Label><Input className="mt-1.5 bg-secondary/50 border-border" placeholder="Your name" /></div>
            <div><Label className="text-xs text-muted-foreground">Email</Label><Input className="mt-1.5 bg-secondary/50 border-border" placeholder="you@company.com" /></div>
          </div>
          <div><Label className="text-xs text-muted-foreground">Message</Label><Textarea className="mt-1.5 bg-secondary/50 border-border min-h-[120px]" placeholder="How can we help?" /></div>
          <Button className="byld-gradient text-primary-foreground border-0 shadow-md">Send Message</Button>
        </div>
        <div className="space-y-6">
          {[
            { icon: Mail, label: "Email", value: "hello@byld.com" },
            { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
            { icon: MapPin, label: "Office", value: "San Francisco, CA" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ContactPage;
