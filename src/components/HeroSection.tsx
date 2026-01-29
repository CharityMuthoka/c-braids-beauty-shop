import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import shoes from '../../public/adidas 3.jpeg'

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-cream min-h-[85vh] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-light/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-light/50 rounded-full text-sm font-medium text-accent">
              <Sparkles className="h-4 w-4" />
              Premium Beauty Essentials
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold leading-tight">
              <span className="text-foreground">Discover Your</span>
              <br />
              <span className="text-gradient-rose">Signature Style</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Curated beauty and lifestyle essentials designed to elevate your look, 
            confidence, and everyday experience, all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button size="lg" className="bg-gradient-rose hover:opacity-90 text-primary-foreground px-8 h-12 text-base gap-2 shadow-glow">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 px-8 h-12 text-base">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">200+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">1K+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-2xl font-serif font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Authentic</p>
              </div>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-rose rounded-full opacity-20 blur-3xl animate-float" />
              <div className="relative bg-gradient-to-br from-rose-light to-cream rounded-3xl p-8 shadow-glow">
                <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
                  <div className="text-center p-8">
                    <img src={shoes} className="h-auto max-w-full object-contain text-primary mb-4" />
                    <p className="text-lg font-serif text-muted-foreground">
                      Premium Beauty Collection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
