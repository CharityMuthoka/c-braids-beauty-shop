import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name,
          },
        },
      });
      

    

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-cream px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center font-serif text-2xl">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
            </div>


            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 6 characters
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-rose"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
