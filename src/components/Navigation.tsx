
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Home, FileText, Building2, MessageSquare, AlertTriangle, Settings, LogOut } from "lucide-react";

interface NavigationProps {
  isLoggedIn: boolean;
  userRole: "admin" | "public" | null;
  activeSection: string;
  setActiveSection: (section: string) => void;
  onLogin: () => void;
  onLogout: () => void;
}

const Navigation = ({ 
  isLoggedIn, 
  userRole, 
  activeSection, 
  setActiveSection, 
  onLogin, 
  onLogout 
}: NavigationProps) => {
  const menuItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" />, public: true },
    { id: "bursary", label: "Bursary Applications", icon: <FileText className="h-4 w-4" />, public: true },
    { id: "projects", label: "Development Projects", icon: <Building2 className="h-4 w-4" />, public: true },
    { id: "feedback", label: "Feedback", icon: <MessageSquare className="h-4 w-4" />, public: true },
    { id: "issues", label: "Report Issues", icon: <AlertTriangle className="h-4 w-4" />, public: true },
    { id: "admin", label: "Admin Dashboard", icon: <Settings className="h-4 w-4" />, public: false },
  ];

  const visibleMenuItems = menuItems.filter(item => 
    item.public || (userRole === "admin" && !item.public)
  );

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900">KCDSP</h1>
              <p className="text-xs text-gray-500">Kaoma Constituency</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {visibleMenuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                className="flex items-center space-x-2"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Badge variant={userRole === "admin" ? "destructive" : "secondary"}>
                  {userRole === "admin" ? "Admin" : "Public User"}
                </Badge>
                <Button variant="outline" onClick={onLogout} className="hidden md:flex">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={onLogin}>Login</Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3 mt-6">
                  {visibleMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      onClick={() => setActiveSection(item.id)}
                      className="justify-start"
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </Button>
                  ))}
                  {isLoggedIn && (
                    <Button variant="outline" onClick={onLogout} className="justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
