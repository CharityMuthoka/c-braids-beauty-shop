import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-gradient-rose">
              C BRAIDS & BEAUTY
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your premium destination for refill perfumes and luxury beauty essentials. 
              Affordable elegance for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/products" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Shop All
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Categories</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/products?category=perfume" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Refill Perfumes
              </Link>
              <Link to="/products?category=skincare" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Skincare
              </Link>
              <Link to="/products?category=haircare" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Hair Care
              </Link>
              <Link to="/products?category=makeup" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Makeup
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:info@cbraidsbeauty.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Mail className="h-4 w-4" />
                info@cbraidsbeauty.com
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <p className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                123 Beauty Lane, Style City
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} C BRAIDS & BEAUTY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
