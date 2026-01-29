import { Link } from "react-router-dom";
import { Sparkles, Droplet, Scissors, Palette } from "lucide-react";

const categories = [
  {
    name: "Refill Perfumes",
    slug: "perfume",
    icon: Droplet,
    description: "Premium fragrances at affordable prices",
    gradient: "from-rose to-primary",
  },
  {
    name: "Shoes",
    slug: "shoes",
    icon: Sparkles,
    description: "High quality shoes",
    gradient: "from-gold to-gold-light",
  },
  {
    name: "Hair Care",
    slug: "haircare",
    icon: Scissors,
    description: "Professional hair treatments",
    gradient: "from-burgundy to-accent",
  },
  {
    name: "Makeup",
    slug: "makeup",
    icon: Palette,
    description: "Express your unique beauty",
    gradient: "from-primary to-rose",
  },
];

const Categories = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our curated collections
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                to={`/products?category=${category.slug}`}
                className="group relative bg-card rounded-2xl p-6 lg:p-8 text-center shadow-card hover:shadow-glow transition-all duration-300 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br ${category.gradient} text-primary-foreground mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-7 w-7 lg:h-8 lg:w-8" />
                  </div>
                  
                  <h3 className="font-serif text-lg lg:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
