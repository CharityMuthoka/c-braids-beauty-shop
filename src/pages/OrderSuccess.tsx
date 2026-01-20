import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gradient-cream">
        <div className="text-center px-4 py-16">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-rose mb-8 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-primary-foreground" />
          </div>

          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 animate-fade-in">
            Order Placed Successfully!
          </h1>

          <p className="text-muted-foreground max-w-md mx-auto mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Thank you for your order! We've received your order and will process it shortly. 
            You'll receive a confirmation email with your order details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link to="/products">
              <Button className="bg-gradient-rose hover:opacity-90 gap-2">
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="gap-2">
                Back to Home
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
