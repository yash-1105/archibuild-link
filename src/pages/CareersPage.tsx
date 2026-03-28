import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const openings = [
  { title: "Senior Frontend Engineer", location: "Remote", type: "Full-time", dept: "Engineering" },
  { title: "Product Designer", location: "San Francisco, CA", type: "Full-time", dept: "Design" },
  { title: "Backend Engineer", location: "Remote", type: "Full-time", dept: "Engineering" },
  { title: "Customer Success Manager", location: "New York, NY", type: "Full-time", dept: "Operations" },
];

const CareersPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Careers</h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl">Join our team and help shape the future of construction technology.</p>
      <div className="space-y-4">
        {openings.map((job) => (
          <div key={job.title} className="rounded-xl border border-border bg-card p-6 flex items-center justify-between byld-card-hover">
            <div>
              <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {job.type}</span>
                <span>{job.dept}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-border text-sm">Apply</Button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CareersPage;
