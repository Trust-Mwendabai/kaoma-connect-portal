
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: "admin" | "public") => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [adminForm, setAdminForm] = useState({ username: "", password: "" });
  const [publicForm, setPublicForm] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials
    if (adminForm.username === "admin" && adminForm.password === "admin123") {
      onLogin("admin");
      toast({ title: "Welcome Admin", description: "You have successfully logged in." });
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid credentials. Use admin/admin123 for demo.",
        variant: "destructive"
      });
    }
  };

  const handlePublicAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo - accept any email/password
    if (publicForm.email && publicForm.password) {
      onLogin("public");
      toast({ 
        title: isSignUp ? "Account Created" : "Welcome", 
        description: isSignUp ? "Your account has been created successfully." : "You have successfully logged in."
      });
    } else {
      toast({ 
        title: "Error", 
        description: "Please fill in all fields.",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to KCDSP</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="public">Public Access</TabsTrigger>
            <TabsTrigger value="admin">Admin Access</TabsTrigger>
          </TabsList>
          
          <TabsContent value="public">
            <Card>
              <CardHeader>
                <CardTitle>{isSignUp ? "Create Account" : "Public Login"}</CardTitle>
                <CardDescription>
                  {isSignUp ? "Sign up for constituency services" : "Access your constituency account"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePublicAuth} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={publicForm.email}
                      onChange={(e) => setPublicForm({...publicForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={publicForm.password}
                      onChange={(e) => setPublicForm({...publicForm, password: e.target.value})}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    {isSignUp ? "Create Account" : "Login"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="link" 
                    className="w-full"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign up"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Administrative Access</CardTitle>
                <CardDescription>For MP office and constituency staff only</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={adminForm.username}
                      onChange={(e) => setAdminForm({...adminForm, username: e.target.value})}
                      placeholder="admin"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={adminForm.password}
                      onChange={(e) => setAdminForm({...adminForm, password: e.target.value})}
                      placeholder="admin123"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Admin Login
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Demo: admin / admin123
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
