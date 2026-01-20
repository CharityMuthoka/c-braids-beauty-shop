import { Sparkles, Heart, Shield, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "We source only the finest ingredients and products to ensure you get the best.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to make you feel beautiful.",
  },
  {
    icon: Shield,
    title: "100% Authentic",
    description: "Every product we sell is genuine and comes with our quality guarantee.",
  },
  {
    icon: Award,
    title: "Affordable Luxury",
    description: "Experience premium beauty without breaking the bank.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-gradient-cream">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              About <span className="text-gradient-rose">C BRAIDS & BEAUTY</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe everyone deserves to feel beautiful and confident. 
              That's why we've made it our mission to bring you premium beauty 
              products at prices you'll love.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-8">
                Our Story
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-6">
                  C BRAIDS & BEAUTY was born from a simple idea: luxury beauty 
                  should be accessible to everyone. We started with a passion for 
                  perfumes and a dream to share the world's finest fragrances 
                  without the premium price tag.
                </p>
                <p className="mb-6">
                  Our refill perfume collection allows you to enjoy your favorite 
                  scents at a fraction of the cost, while being kinder to the 
                  environment. We've since expanded to include a curated selection 
                  of skincare, haircare, and makeup products.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers who trust us 
                  for their beauty essentials. Every product in our collection has 
                  been carefully selected to ensure quality, authenticity, and value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground text-center mb-12">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="bg-card rounded-xl p-6 text-center shadow-card animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-rose text-primary-foreground mb-4">
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
