import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:block">
          <div className="rounded-2xl p-8 bg-gradient-to-br from-teal-600 to-emerald-500 text-white shadow-lg">
            <div className="text-2xl font-bold mb-2">Create your account</div>
            <p className="opacity-90 mb-6">Join AquaWatch to monitor water levels and get alerts.</p>
            <ul className="space-y-2 text-sm opacity-95">
              <li>• Save favorite regions</li>
              <li>• Receive notifications</li>
              <li>• Access the Knowledge Hub</li>
            </ul>
          </div>
        </div>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground flex items-center gap-2">
            <span>Already have an account?</span>
            <Button variant="link" className="px-0" onClick={() => navigate("/login")}>Sign in</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
