import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { LogOut, Package, ShoppingCart, Plus, Loader2 } from "lucide-react";
import type { Json } from "@/integrations/supabase/types";

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);


  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAdmin) return;
  
    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("Order updated:", payload);
          queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, queryClient]);
  

  // Product form state
  const [productForm, setProductForm] = useState({
    name: "", price: "", category: "perfume", image_url: "", description: "", stock: "0", featured: false
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkAdminRole();

    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkAdminRole();

      else setIsAdmin(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
  
    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
        },
        (payload) => {
          console.log("🔄 Order updated:", payload);
  
          // refresh orders immediately
          queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
  
          // optional toast
          if (payload.new.status === "processing") {
            toast.success("💰 Payment received");
          }
        }
      )
      .subscribe();
  
    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);
  

  const checkAdminRole = async () => {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role");
  
    if (error) {
      console.error(error);
      setIsAdmin(false);
      return;
    }
  
    setIsAdmin(data?.some(r => r.role === "admin") ?? false);
  };
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) toast.error(error.message);
    else toast.success("Logged in successfully");
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    toast.success("Logged out");
  };

  const { data: orders } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin === true,

  });

  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin === true,
  });

  const saveProduct = useMutation({
    mutationFn: async () => {
      const payload = {
        name: productForm.name,
        price: parseFloat(productForm.price),
        category: productForm.category,
        image_url: productForm.image_url || null,
        description: productForm.description || null,
        stock: parseInt(productForm.stock),
        featured: productForm.featured,
      };
  
      if (editingProductId) {
        const { error } = await supabase
          .from("products")
          .update(payload)
          .eq("id", editingProductId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editingProductId ? "Product updated" : "Product added");
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setEditingProductId(null);
      setProductForm({
        name: "",
        price: "",
        category: "perfume",
        image_url: "",
        description: "",
        stock: "0",
        featured: false,
      });
    },
    onError: () => toast.error("Failed to save product"),
  });
  

  const updateOrderStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Order updated");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader><CardTitle className="text-center font-serif">Admin Login</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
              <Button type="submit" className="w-full bg-gradient-rose" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (session && isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  

  
    if (isAdmin === false) {

    return (
      <div className="min-h-screen bg-gradient-cream flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">You don't have admin access.</p>
            <Button onClick={handleLogout} variant="outline"><LogOut className="h-4 w-4 mr-2" />Logout</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cream">
      <header className="bg-card border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-serif font-bold text-gradient-rose">Admin Dashboard</h1>
        <Button onClick={handleLogout} variant="outline" size="sm"><LogOut className="h-4 w-4 mr-2" />Logout</Button>
      </header>
      <main className="container mx-auto p-4">
        <Tabs defaultValue="orders">
          <TabsList className="mb-4"><TabsTrigger value="orders"><ShoppingCart className="h-4 w-4 mr-2" />Orders</TabsTrigger><TabsTrigger value="products"><Package className="h-4 w-4 mr-2" />Products</TabsTrigger></TabsList>
          <TabsContent value="orders">
            <div className="space-y-4">
              {orders?.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start mb-2">
                      <div><p className="font-semibold">{order.customer_name}</p><p className="text-sm text-muted-foreground">{order.customer_email}</p></div>
                      <Badge variant={order.status === "completed" ? "default" : "secondary"}>{order.status}</Badge>
                    </div>
                    <p className="text-sm mb-2">Total: <strong>KSH{Number(order.total).toFixed(2)}</strong></p>
                    <div className="flex gap-2">
                      {["pending", "processing", "completed"].map((s) => (
                        <Button key={s} size="sm" variant={order.status === s ? "default" : "outline"} onClick={() => updateOrderStatus.mutate({ id: order.id, status: s })}>{s}</Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {!orders?.length && <p className="text-center text-muted-foreground py-8">No orders yet</p>}
            </div>
          </TabsContent>
          <TabsContent value="products">
            <Card className="mb-6">
              <CardHeader><CardTitle className="text-lg">Add Product</CardTitle></CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); saveProduct.mutate(); }} className="grid md:grid-cols-2 gap-4">
                  <div><Label>Name</Label><Input value={productForm.name} onChange={(e) => setProductForm(p => ({ ...p, name: e.target.value }))} required /></div>
                  <div><Label>Price</Label><Input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm(p => ({ ...p, price: e.target.value }))} required /></div>
                  <div><Label>Category</Label><select className="w-full h-10 border rounded-md px-3" value={productForm.category} onChange={(e) => setProductForm(p => ({ ...p, category: e.target.value }))}><option value="perfume">Perfume</option><option value="skincare">Skincare</option><option value="haircare">Haircare</option><option value="makeup">Makeup</option></select></div>
                  <div><Label>Stock</Label><Input type="number" value={productForm.stock} onChange={(e) => setProductForm(p => ({ ...p, stock: e.target.value }))} /></div>
                  <div className="md:col-span-2"><Label>Image URL</Label><Input value={productForm.image_url} onChange={(e) => setProductForm(p => ({ ...p, image_url: e.target.value }))} /></div>
                  <div className="md:col-span-2 flex items-center gap-2"><input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm(p => ({ ...p, featured: e.target.checked }))} /><Label>Featured</Label></div>
                  <Button type="submit" className="md:col-span-2 bg-gradient-rose"><Plus className="h-4 w-4 mr-2" />{editingProductId ? "Update Product" : "Add Product"}
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {products?.map((p) => {
    const outOfStock = p.stock <= 0;

    return (
      <Card
        key={p.id}
        className={`cursor-pointer hover:shadow-md ${
          outOfStock ? "opacity-60" : ""
        }`}
        onClick={() => {
          setEditingProductId(p.id);
          setProductForm({
            name: p.name,
            price: String(p.price),
            category: p.category,
            image_url: p.image_url || "",
            description: p.description || "",
            stock: String(p.stock),
            featured: p.featured,
          });
        }}
      >
        <CardContent className="pt-4">
          <p className="font-semibold">{p.name}</p>
          <p className="text-primary">KSH{Number(p.price).toFixed(2)}</p>

          <div className="flex gap-2 mt-2">
            <Badge variant="outline">{p.category}</Badge>
            {outOfStock && (
              <Badge variant="destructive">Out of stock</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  })}
</div>


           
            {editingProductId && (
  <Button
    type="button"
    variant="outline"
    className="md:col-span-2"
    onClick={() => {
      setEditingProductId(null);
      setProductForm({
        name: "",
        price: "",
        category: "perfume",
        image_url: "",
        description: "",
        stock: "0",
        featured: false,
      });
    }}
  >
    Cancel Edit
  </Button>
)}




          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
