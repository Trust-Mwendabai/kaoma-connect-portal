
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, MessageSquare, AlertTriangle, Map, Calendar, ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import LoginModal from "@/components/auth/LoginModal";
import BursarySection from "@/components/sections/BursarySection";
import ProjectTracker from "@/components/sections/ProjectTracker";
import FeedbackSection from "@/components/sections/FeedbackSection";
import IssueReporting from "@/components/sections/IssueReporting";
import NewsSection from "@/components/sections/NewsSection";

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
      case "news":
        return <NewsSection userRole={userRole} />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
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
  const recentNews = [
    {
      id: 1,
      title: "New Borehole Project Launched in Kaoma Central",
      excerpt: "MP announces the commencement of a new borehole drilling project to improve water access in Kaoma Central ward.",
      date: "2024-01-15",
      category: "Development"
    },
    {
      id: 2,
      title: "Bursary Applications Now Open for 2024",
      excerpt: "Students can now apply for educational bursaries through our digital portal. Applications close on March 31st.",
      date: "2024-01-10",
      category: "Education"
    },
    {
      id: 3,
      title: "Road Rehabilitation Project Update",
      excerpt: "Progress update on the Kaoma-Lukulu road rehabilitation project showing 60% completion.",
      date: "2024-01-08",
      category: "Infrastructure"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white rounded-2xl p-12 shadow-xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Kaoma Constituency Digital Service Portal
          </h1>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Your gateway to constituency services, development projects, and direct communication 
            with your elected representative in Western Province, Zambia.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
              Serving Kaoma Constituency
            </Badge>
            <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30">
              Western Province, Zambia
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Portal Impact</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">156</div>
            <div className="text-gray-600 font-medium">Bursary Applications</div>
          </div>
          <div className="p-6 rounded-xl bg-green-50 border border-green-100">
            <div className="text-4xl font-bold text-green-600 mb-2">23</div>
            <div className="text-gray-600 font-medium">Active Projects</div>
          </div>
          <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
            <div className="text-4xl font-bold text-purple-600 mb-2">89</div>
            <div className="text-gray-600 font-medium">Feedback Received</div>
          </div>
          <div className="p-6 rounded-xl bg-orange-50 border border-orange-100">
            <div className="text-4xl font-bold text-orange-600 mb-2">45</div>
            <div className="text-gray-600 font-medium">Issues Resolved</div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest News & Updates</h2>
          <Button variant="outline" className="flex items-center gap-2">
            View All News
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {recentNews.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {article.excerpt}
                </CardDescription>
                <Button variant="link" className="p-0 h-auto mt-3 text-blue-600">
                  Read more →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
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
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className={`w-14 h-14 ${color} text-white rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Index;
