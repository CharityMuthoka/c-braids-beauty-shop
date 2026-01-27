import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";
import { Loader2, CheckCircle } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };




  const initiateMpesaPayment = async (phone: string, amount:number, orderId:string) =>{
    const response = await fetch(
      "https://cbraids-mpesa-backend.onrender.com/api/mpesa/stkpush",
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          amount,
          orderId,

        }),

      }
    );
    if (!response.ok){
      throw new Error("Failed to initiate M-Pesa payment");
    }
    return response.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
  
    setIsLoading(true);
  
    try {
      // 1. Save order as PENDING
      const { data, error } = await supabase
        .from("orders")
        .insert([{
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_address: formData.address,
          items: items as unknown as import("@/integrations/supabase/types").Json,
          total: totalPrice(),
          status: "pending",
        }])
        .select()
        .single();
  
      if (error) throw error;
  
      // 2. Trigger M-Pesa STK Push
      await initiateMpesaPayment(
        formData.phone,
        Math.round(totalPrice()), 
        data.id
      );

  
      toast.success("Check your phone to complete payment");

      clearCart();

  
      // 3. Navigate to waiting / success page
      navigate("/order-success");
  
      // DO NOT clear cart yet
    } catch (error) {
      console.error(error);
      toast.error("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-cream py-8 lg:py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card rounded-xl p-6 shadow-card">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    rows={3}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-rose hover:opacity-90 h-12 text-base mt-6"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Place Order - KSH{totalPrice().toFixed(2)}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-card rounded-xl p-6 shadow-card h-fit">
              <h2 className="text-xl font-serif font-bold text-foreground mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-foreground">
                      KSH{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>KSH{totalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-foreground pt-2 border-t border-border">
                  <span>Total</span>
                  <span>KSH{totalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
