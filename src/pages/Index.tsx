
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, FileText, MessageSquare, AlertTriangle, Map, Calendar, ArrowRight, TrendingUp, CheckCircle, Clock, Star } from "lucide-react";
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
      case "admin":
        return <AdminDashboard />;
      default:
        return <HomeSection setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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

const HomeSection = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const recentNews = [
    {
      id: 1,
      title: "New Borehole Project Launched in Kaoma Central",
      excerpt: "MP announces the commencement of a new borehole drilling project to improve water access in Kaoma Central ward.",
      date: "2024-01-15",
      category: "Development",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      priority: "high"
    },
    {
      id: 2,
      title: "Bursary Applications Now Open for 2024",
      excerpt: "Students can now apply for educational bursaries through our digital portal. Applications close on March 31st.",
      date: "2024-01-10",
      category: "Education",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      priority: "medium"
    },
    {
      id: 3,
      title: "Road Rehabilitation Project Update",
      excerpt: "Progress update on the Kaoma-Lukulu road rehabilitation project showing 60% completion.",
      date: "2024-01-08",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop",
      priority: "low"
    }
  ];

  const achievements = [
    { metric: "156", label: "Bursary Applications", icon: FileText, color: "blue", trend: "+12%" },
    { metric: "23", label: "Active Projects", icon: Building2, color: "green", trend: "+5%" },
    { metric: "89", label: "Feedback Received", icon: MessageSquare, color: "purple", trend: "+23%" },
    { metric: "45", label: "Issues Resolved", icon: CheckCircle, color: "orange", trend: "+18%" }
  ];

  return (
    <div className="space-y-16">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] rounded-3xl"></div>
        <div className="relative text-center text-white p-16 rounded-3xl shadow-2xl">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Building2 className="h-6 w-6" />
              <span className="font-semibold">Official Government Portal</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text">
              Kaoma Constituency
              <br />
              Digital Service Portal
            </h1>
            <p className="text-xl mb-10 opacity-90 leading-relaxed max-w-3xl mx-auto">
              Bridging communities through digital innovation. Access constituency services, 
              track development projects, and engage directly with your elected representative 
              in Western Province, Zambia.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setActiveSection("bursary")}
              >
                Apply for Bursary
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 text-lg font-semibold backdrop-blur-sm"
                onClick={() => setActiveSection("projects")}
              >
                View Projects
                <Map className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🏛️ Serving Kaoma Constituency
              </Badge>
              <Badge variant="secondary" className="text-lg px-6 py-3 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                🌍 Western Province, Zambia
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Portal Impact & Analytics</h2>
          <p className="text-xl text-gray-600">Real-time metrics showcasing our community engagement</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 bg-${achievement.color}-500 text-white rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{achievement.metric}</div>
                <div className="text-gray-600 font-medium mb-3">{achievement.label}</div>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-semibold text-sm">{achievement.trend}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced News Section */}
      <section className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Latest News & Updates</h2>
            <p className="text-xl text-gray-600">Stay informed about constituency developments</p>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 px-6 py-3 text-lg hover:shadow-lg transition-all duration-300"
            onClick={() => setActiveSection("news")}
          >
            View All News
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {recentNews.map((article) => (
            <Card key={article.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs font-semibold ${
                      article.priority === 'high' ? 'bg-red-500 text-white' :
                      article.priority === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}
                  >
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  {article.priority === 'high' && (
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  )}
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-blue-600 transition-colors duration-300">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  {article.excerpt}
                </CardDescription>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-800 font-semibold"
                  onClick={() => setActiveSection("news")}
                >
                  Read full article →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Enhanced Services Grid */}
      <section>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Digital Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital solutions designed to serve the Kaoma community efficiently and transparently
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<FileText className="h-8 w-8" />}
            title="Bursary Applications"
            description="Apply for educational bursaries online with real-time status tracking and automated notifications."
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            onClick={() => setActiveSection("bursary")}
          />
          <ServiceCard
            icon={<Building2 className="h-8 w-8" />}
            title="Development Projects"
            description="Monitor constituency development projects with detailed progress reports and interactive maps."
            color="bg-gradient-to-br from-green-500 to-green-600"
            onClick={() => setActiveSection("projects")}
          />
          <ServiceCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Feedback & Suggestions"
            description="Share your ideas and feedback to help improve constituency services and community development."
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            onClick={() => setActiveSection("feedback")}
          />
          <ServiceCard
            icon={<AlertTriangle className="h-8 w-8" />}
            title="Issue Reporting"
            description="Report infrastructure problems and community issues with photo documentation and GPS tracking."
            color="bg-gradient-to-br from-orange-500 to-orange-600"
            onClick={() => setActiveSection("issues")}
          />
          <ServiceCard
            icon={<Map className="h-8 w-8" />}
            title="Interactive Project Map"
            description="Explore development projects across the constituency using our interactive geographical interface."
            color="bg-gradient-to-br from-teal-500 to-teal-600"
            onClick={() => setActiveSection("projects")}
          />
          <ServiceCard
            icon={<Users className="h-8 w-8" />}
            title="Community Engagement"
            description="Connect with fellow constituents, participate in discussions, and stay updated on community events."
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
            onClick={() => setActiveSection("feedback")}
          />
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Quick Actions</h2>
          <p className="text-xl text-gray-300">Fast access to frequently used services</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 p-8 h-auto flex-col gap-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => setActiveSection("bursary")}
          >
            <FileText className="h-8 w-8" />
            Apply for Bursary
          </Button>
          <Button 
            size="lg" 
            className="bg-green-600 hover:bg-green-700 p-8 h-auto flex-col gap-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => setActiveSection("issues")}
          >
            <AlertTriangle className="h-8 w-8" />
            Report an Issue
          </Button>
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 p-8 h-auto flex-col gap-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            onClick={() => setActiveSection("feedback")}
          >
            <MessageSquare className="h-8 w-8" />
            Give Feedback
          </Button>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, description, color, onClick }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg cursor-pointer bg-gradient-to-br from-white to-gray-50" onClick={onClick}>
      <CardHeader className="pb-4">
        <div className={`w-16 h-16 ${color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed mb-4">{description}</CardDescription>
        <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors duration-300">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-red-100">Manage constituency services and monitor platform activity</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-700">1,234</div>
              <div className="text-blue-600">Total Users</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white p-3 rounded-xl">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-700">156</div>
              <div className="text-green-600">Pending Applications</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 text-white p-3 rounded-xl">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-700">89</div>
              <div className="text-purple-600">New Feedback</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 text-white p-3 rounded-xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-700">23</div>
              <div className="text-orange-600">Open Issues</div>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-8">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
          <CardDescription>Latest actions and updates across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New bursary application submitted", time: "2 minutes ago", type: "application" },
              { action: "Project status updated: Kaoma Central Borehole", time: "15 minutes ago", type: "project" },
              { action: "Issue resolved: Broken street light on Main Road", time: "1 hour ago", type: "issue" },
              { action: "Feedback received: Road improvement suggestion", time: "2 hours ago", type: "feedback" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'application' ? 'bg-blue-500' :
                    activity.type === 'project' ? 'bg-green-500' :
                    activity.type === 'issue' ? 'bg-orange-500' :
                    'bg-purple-500'
                  }`}></div>
                  <span className="font-medium">{activity.action}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
