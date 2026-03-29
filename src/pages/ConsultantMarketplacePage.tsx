import { Briefcase, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const consultants = [
  { id: "c1", name: "Dr. Alan Foster", specialty: "Structural Engineering", rating: 4.9, reviews: 47, location: "New York, NY", avatar: "AF", available: true },
  { id: "c2", name: "Maria Santos", specialty: "Environmental Assessment", rating: 4.8, reviews: 32, location: "Los Angeles, CA", avatar: "MS", available: true },
  { id: "c3", name: "James Mitchell", specialty: "LEED Certification", rating: 4.7, reviews: 28, location: "Chicago, IL", avatar: "JM", available: false },
  { id: "c4", name: "Dr. Rachel Kim", specialty: "Seismic Analysis", rating: 4.9, reviews: 55, location: "San Francisco, CA", avatar: "RK", available: true },
  { id: "c5", name: "Robert Chen", specialty: "MEP Systems", rating: 4.6, reviews: 19, location: "Houston, TX", avatar: "RC", available: true },
];

const ConsultantMarketplacePage = () => {
  const { toast } = useToast();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Consultant Network</h1>
        <p className="text-sm text-muted-foreground mt-1">Find and request expert consultations for your projects.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {consultants.map(c => (
          <div key={c.id} className="rounded-xl border border-border bg-card p-5 byld-card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full byld-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">{c.avatar}</div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground">{c.specialty}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" />{c.rating} ({c.reviews})</span>
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{c.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.available ? "bg-success-light text-success-foreground" : "bg-muted text-muted-foreground"}`}>
                {c.available ? "Available" : "Busy"}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7"
                disabled={!c.available}
                onClick={() => toast({ title: "Request Sent", description: `Consultation request sent to ${c.name}.` })}
              >
                Request <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsultantMarketplacePage;
