
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, MessageSquare, AlertTriangle, Map } from "lucide-react";
import Navigation from "@/components/Navigation";
import LoginModal from "@/components/auth/LoginModal";
import BursarySection from "@/components/sections/BursarySection";
import ProjectTracker from "@/components/sections/ProjectTracker";
import FeedbackSection from "@/components/sections/FeedbackSection";
import IssueReporting from "@/components/sections/IssueReporting";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "public" | null>(null);

  const handleLogin = (role: "admin" | "public") => {
    setIsLoggedIn(true);
    setUserRole(role);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setActiveSection("home");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "bursary":
        return <BursarySection userRole={userRole} />;
      case "projects":
        return <ProjectTracker userRole={userRole} />;
      case "feedback":
        return <FeedbackSection userRole={userRole} />;
      case "issues":
        return <IssueReporting userRole={userRole} />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        isLoggedIn={isLoggedIn}
        userRole={userRole}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

const HomeSection = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12">
        <h1 className="text-4xl font-bold mb-4">
          Kaoma Constituency Digital Service Portal
        </h1>
        <p className="text-xl mb-6 max-w-3xl mx-auto">
          Your gateway to constituency services, development projects, and direct communication 
          with your elected representative in Western Province, Zambia.
        </p>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Serving Kaoma Constituency
        </Badge>
      </section>

      {/* Services Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            icon={<FileText className="h-8 w-8" />}
            title="Bursary Applications"
            description="Apply for educational bursaries and track your application status online."
            color="bg-blue-500"
          />
          <ServiceCard
            icon={<Building2 className="h-8 w-8" />}
            title="Development Projects"
            description="Track constituency development projects and their progress."
            color="bg-green-500"
          />
          <ServiceCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Feedback & Suggestions"
            description="Share your thoughts and suggestions for constituency improvement."
            color="bg-purple-500"
          />
          <ServiceCard
            icon={<AlertTriangle className="h-8 w-8" />}
            title="Issue Reporting"
            description="Report infrastructure problems and community issues."
            color="bg-orange-500"
          />
          <ServiceCard
            icon={<Map className="h-8 w-8" />}
            title="Project Map"
            description="View development projects on an interactive map."
            color="bg-teal-500"
          />
          <ServiceCard
            icon={<Users className="h-8 w-8" />}
            title="Community Forum"
            description="Engage with fellow constituents and community leaders."
            color="bg-indigo-500"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Portal Statistics</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">156</div>
            <div className="text-gray-600">Bursary Applications</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">23</div>
            <div className="text-gray-600">Active Projects</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">89</div>
            <div className="text-gray-600">Feedback Received</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">45</div>
            <div className="text-gray-600">Issues Resolved</div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 ${color} text-white rounded-lg flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Index;
