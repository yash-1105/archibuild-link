import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
      <h1 className="font-display text-4xl font-bold text-foreground mb-3">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 1, 2026</p>
      <div className="prose prose-sm max-w-none space-y-6 text-foreground/80">
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-lg">1. Information We Collect</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We collect information you provide directly, such as your name, email, and project data. We also automatically collect usage data to improve our services.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">2. How We Use Your Information</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Your data is used to provide and improve BYLD services, communicate with you, and ensure platform security.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">3. Data Security</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We implement industry-standard security measures including encryption, access controls, and regular security audits to protect your data.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">4. Data Retention</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">We retain your data for as long as your account is active. You may request deletion of your data at any time by contacting support.</p>
          <h2 className="font-display font-semibold text-foreground text-lg">5. Contact Us</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">For privacy-related questions, contact us at privacy@byld.com.</p>
        </div>
      </div>
    </div>
  </div>
);

export default PrivacyPage;
