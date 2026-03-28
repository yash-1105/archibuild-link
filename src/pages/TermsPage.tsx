import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 1, 2026</p>
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-display font-semibold text-foreground text-lg">1. Acceptance of Terms</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">By accessing BYLD, you agree to be bound by these Terms of Service and all applicable laws.</p>
        <h2 className="font-display font-semibold text-foreground text-lg">2. Use of Service</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">You may use BYLD for lawful construction project management purposes. You are responsible for maintaining the confidentiality of your account.</p>
        <h2 className="font-display font-semibold text-foreground text-lg">3. Intellectual Property</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">All content, features, and functionality of BYLD are owned by BYLD Inc. and protected by international copyright laws.</p>
        <h2 className="font-display font-semibold text-foreground text-lg">4. Limitation of Liability</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">BYLD shall not be liable for any indirect, incidental, or consequential damages resulting from the use of the platform.</p>
      </div>
    </div>
  </div>
);

export default TermsPage;
