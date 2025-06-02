
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Home, FileText, Building2, MessageSquare, AlertTriangle, Settings, LogOut, Newspaper, Shield } from "lucide-react";

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
    { id: "news", label: "News & Updates", icon: <Newspaper className="h-4 w-4" />, public: true },
    { id: "bursary", label: "Bursary Applications", icon: <FileText className="h-4 w-4" />, public: true },
    { id: "projects", label: "Development Projects", icon: <Building2 className="h-4 w-4" />, public: true },
    { id: "feedback", label: "Feedback", icon: <MessageSquare className="h-4 w-4" />, public: true },
    { id: "issues", label: "Report Issues", icon: <AlertTriangle className="h-4 w-4" />, public: true },
    { id: "admin", label: "Admin Dashboard", icon: <Shield className="h-4 w-4" />, public: false },
  ];

  const visibleMenuItems = menuItems.filter(item => 
    item.public || (userRole === "admin" && !item.public)
  );

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <div className="flex items-center space-x-4" onClick={() => setActiveSection("home")} role="button">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white p-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Building2 className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900 hover:text-blue-700 transition-colors duration-300">KCDSP</h1>
              <p className="text-sm text-gray-500 font-medium">Kaoma Constituency</p>
            </div>
          </div>

          {/* Enhanced Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {visibleMenuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 transition-all duration-300 px-4 py-2 rounded-xl ${
                  activeSection === item.id 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl" 
                    : "hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Button>
            ))}
          </div>

          {/* Enhanced User Actions */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Badge 
                  variant={userRole === "admin" ? "destructive" : "secondary"} 
                  className={`px-4 py-2 font-semibold shadow-lg ${
                    userRole === "admin" 
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white border-0" 
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white border-0"
                  }`}
                >
                  {userRole === "admin" ? (
                    <>
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </>
                  ) : (
                    "Public User"
                  )}
                </Badge>
                <Button 
                  variant="outline" 
                  onClick={onLogout} 
                  className="hidden md:flex items-center gap-2 px-4 py-2 border-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onLogin} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Login
              </Button>
            )}

            {/* Enhanced Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden border-2 hover:bg-blue-50 hover:border-blue-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-gradient-to-b from-white to-gray-50">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-xl font-bold text-gray-800">Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-3">
                  {visibleMenuItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      onClick={() => setActiveSection(item.id)}
                      className={`justify-start h-12 px-4 rounded-xl transition-all duration-300 ${
                        activeSection === item.id 
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg" 
                          : "hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3 font-medium">{item.label}</span>
                    </Button>
                  ))}
                  {isLoggedIn && (
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <Button 
                        variant="outline" 
                        onClick={onLogout} 
                        className="justify-start w-full h-12 px-4 rounded-xl border-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-300"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                      </Button>
                    </div>
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
