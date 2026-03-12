import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-xl text-foreground">BYLD</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The modern construction project management platform.
            </p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-foreground text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">© 2026 BYLD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
