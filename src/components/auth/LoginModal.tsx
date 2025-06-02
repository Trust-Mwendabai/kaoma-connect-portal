
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: "admin" | "public") => void;
}

const LoginModal = ({ isOpen, onClose, onLogin }: LoginModalProps) => {
  const [loginType, setLoginType] = useState<"admin" | "public" | null>(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleLogin = (role: "admin" | "public") => {
    onLogin(role);
    onClose();
    setLoginType(null);
    setCredentials({ username: "", password: "" });
  };

  const handleQuickLogin = (role: "admin" | "public") => {
    setLoginType(role);
  };

  const handleBack = () => {
    setLoginType(null);
    setCredentials({ username: "", password: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login to KCDSP</DialogTitle>
          <DialogDescription>
            Choose your login type to access the portal
          </DialogDescription>
        </DialogHeader>

        {!loginType ? (
          <div className="space-y-4">
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-300"
              onClick={() => handleQuickLogin("public")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-blue-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <User className="h-6 w-6" />
                </div>
                <CardTitle>Public User</CardTitle>
                <CardDescription>
                  Access public services and submit applications
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow duration-300 border-2 hover:border-red-300"
              onClick={() => handleQuickLogin("admin")}
            >
              <CardHeader className="text-center">
                <div className="mx-auto bg-red-500 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle>Administrator</CardTitle>
                <CardDescription>
                  Manage applications and constituency data
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <div className={`mx-auto ${loginType === "admin" ? "bg-red-500" : "bg-blue-500"} text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2`}>
                {loginType === "admin" ? <Shield className="h-6 w-6" /> : <User className="h-6 w-6" />}
              </div>
              <h3 className="text-lg font-semibold">
                {loginType === "admin" ? "Administrator Login" : "Public User Login"}
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={() => handleLogin(loginType)} 
                className={`flex-1 ${loginType === "admin" ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                Login
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Demo Mode: Click Login with any credentials
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
