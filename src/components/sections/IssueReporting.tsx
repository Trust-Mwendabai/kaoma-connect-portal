
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Search, Plus, Clock, CheckCircle, MapPin, Camera, Filter, TrendingUp, Calendar, Eye, Users, Star } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  reporter: string;
  date: string;
  status: "reported" | "investigating" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  images?: string[];
  assignedTo?: string;
  estimatedCompletion?: string;
}

interface IssueReportingProps {
  userRole: "admin" | "public" | null;
}

const IssueReporting = ({ userRole }: IssueReportingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isReporting, setIsReporting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "ISS001",
      title: "Broken Street Light on Main Road",
      description: "The street light near the market has been out for over a week, making it dangerous for evening commuters and vendors.",
      category: "Infrastructure",
      location: "Main Road, Near Central Market",
      reporter: "Local Vendor",
      date: "2024-01-15",
      status: "in-progress",
      priority: "high",
      assignedTo: "Public Works Department",
      estimatedCompletion: "2024-01-25",
      images: ["https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop"]
    },
    {
      id: "ISS002",
      title: "Water Pipe Leak in Mayukwayukwa",
      description: "Major water pipe burst causing flooding in residential area. Multiple households affected without water supply.",
      category: "Water & Sanitation",
      location: "Mayukwayukwa Village, Block A",
      reporter: "Community Chairman",
      date: "2024-01-18",
      status: "urgent",
      priority: "urgent",
      assignedTo: "Water Utilities",
      estimatedCompletion: "2024-01-20",
      images: ["https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"]
    },
    {
      id: "ISS003",
      title: "Pothole on Lukulu Road",
      description: "Large pothole causing vehicle damage and safety concerns for road users traveling to Lukulu.",
      category: "Roads",
      location: "Lukulu Road, KM 15",
      reporter: "Transport Driver",
      date: "2024-01-10",
      status: "resolved",
      priority: "medium",
      assignedTo: "Road Development Agency",
      estimatedCompletion: "2024-01-22",
      images: ["https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop"]
    },
    {
      id: "ISS004",
      title: "Damaged School Roof",
      description: "School roof damaged by recent storms, affecting classes during rainy weather. Urgent repair needed before next semester.",
      category: "Education",
      location: "Kaoma Primary School",
      reporter: "Head Teacher",
      date: "2024-01-12",
      status: "investigating",
      priority: "high",
      assignedTo: "Ministry of Education",
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"]
    }
  ]);

  const statusConfig = {
    reported: { label: "Reported", color: "bg-blue-500", icon: AlertTriangle },
    investigating: { label: "Investigating", color: "bg-yellow-500", icon: Search },
    "in-progress": { label: "In Progress", color: "bg-orange-500", icon: Clock },
    resolved: { label: "Resolved", color: "bg-green-500", icon: CheckCircle },
    closed: { label: "Closed", color: "bg-gray-500", icon: CheckCircle }
  };

  const priorityConfig = {
    low: { color: "bg-green-500", label: "Low" },
    medium: { color: "bg-yellow-500", label: "Medium" },
    high: { color: "bg-orange-500", label: "High" },
    urgent: { color: "bg-red-500", label: "Urgent" }
  };

  const categories = [
    { name: "all", icon: AlertTriangle, color: "bg-gray-500" },
    { name: "Infrastructure", icon: TrendingUp, color: "bg-blue-500" },
    { name: "Roads", icon: MapPin, color: "bg-orange-500" },
    { name: "Water & Sanitation", icon: Clock, color: "bg-cyan-500" },
    { name: "Education", icon: Star, color: "bg-green-500" },
  ];

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === "resolved").length,
    inProgress: issues.filter(i => i.status === "in-progress").length,
    urgent: issues.filter(i => i.priority === "urgent").length
  };

  if (selectedIssue) {
    return <IssueDetailView issue={selectedIssue} onBack={() => setSelectedIssue(null)} userRole={userRole} />;
  }

  if (isReporting) {
    return <IssueReportForm onSave={() => setIsReporting(false)} onCancel={() => setIsReporting(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl p-8 text-white">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Issue Reporting</h1>
              <p className="text-orange-100 text-lg">Report and track community issues for resolution</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsReporting(true)} 
            className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Issues</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.resolved}</div>
            <div className="text-gray-600 font-medium">Resolved</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">{stats.inProgress}</div>
            <div className="text-gray-600 font-medium">In Progress</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.urgent}</div>
            <div className="text-gray-600 font-medium">Urgent</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1">
          <TabsTrigger value="issues" className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            Reported Issues
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" />
            Issue Map
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search issues by title, location, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex gap-2 flex-wrap">
                  {["all", "reported", "investigating", "in-progress", "resolved"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className={`capitalize transition-all duration-300 hover:scale-105 ${
                        selectedStatus === status ? "bg-orange-500 text-white shadow-lg" : "hover:shadow-md"
                      }`}
                    >
                      {status === "all" ? "All Status" : statusConfig[status as keyof typeof statusConfig]?.label || status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Issues List */}
          <div className="grid gap-6">
            {filteredIssues.map((issue, index) => {
              const StatusIcon = statusConfig[issue.status].icon;
              return (
                <Card 
                  key={issue.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                          {issue.id.slice(-2)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                            {issue.title}
                          </h3>
                          <p className="text-gray-700 mb-3 line-clamp-2">{issue.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {issue.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {issue.reporter}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(issue.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex gap-2">
                          <Badge className={`${statusConfig[issue.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[issue.status].label}
                          </Badge>
                          <Badge className={`${priorityConfig[issue.priority].color} text-white border-0 px-3 py-1 font-semibold`}>
                            {priorityConfig[issue.priority].label}
                          </Badge>
                        </div>
                        {issue.images && issue.images.length > 0 && (
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Camera className="h-3 w-3" />
                            {issue.images.length} photo{issue.images.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Category</p>
                        <p className="font-semibold text-gray-800">{issue.category}</p>
                      </div>
                      {issue.assignedTo && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Assigned To</p>
                          <p className="font-semibold text-gray-800">{issue.assignedTo}</p>
                        </div>
                      )}
                      {issue.estimatedCompletion && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Est. Completion</p>
                          <p className="font-semibold text-gray-800">{new Date(issue.estimatedCompletion).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:text-orange-600"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {userRole === "admin" && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Update Status
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                            Assign
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredIssues.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No issues found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Issue Map
              </CardTitle>
              <CardDescription>Visual representation of reported issues across the constituency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Map integration would show issue locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Issue Analytics Dashboard
              </CardTitle>
              <CardDescription>Insights into issue reporting trends and resolution rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500">Detailed charts and insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const IssueDetailView = ({ issue, onBack, userRole }: {
  issue: Issue;
  onBack: () => void;
  userRole: "admin" | "public" | null;
}) => {
  const StatusIcon = statusConfig[issue.status].icon;
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6 hover:scale-105 transition-all duration-300"
      >
        ← Back to Issues
      </Button>
      
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        {issue.images && issue.images.length > 0 && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img 
              src={issue.images[0]} 
              alt={issue.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 flex gap-2">
              <Badge className={`${statusConfig[issue.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {statusConfig[issue.status].label}
              </Badge>
              <Badge className={`${priorityConfig[issue.priority].color} text-white border-0 px-3 py-1 font-semibold`}>
                {priorityConfig[issue.priority].label} Priority
              </Badge>
            </div>
          </div>
        )}
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl mb-3">{issue.title}</CardTitle>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {issue.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Reported by {issue.reporter}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(issue.date).toLocaleDateString()}
            </span>
          </div>
          <Badge variant="secondary" className="w-fit">{issue.category}</Badge>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-700">{issue.description}</p>
          </div>
          
          {(issue.assignedTo || issue.estimatedCompletion) && (
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-6">
              {issue.assignedTo && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Assigned To</p>
                  <p className="font-semibold text-gray-800">{issue.assignedTo}</p>
                </div>
              )}
              {issue.estimatedCompletion && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Estimated Completion</p>
                  <p className="font-semibold text-gray-800">{new Date(issue.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 pt-6 border-t">
            <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
              <Eye className="h-4 w-4" />
              Track Updates
            </Button>
            {userRole === "admin" && (
              <div className="flex gap-2 ml-auto">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Update Status
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                  Assign Team
                </Button>
                <Button variant="outline" className="hover:bg-orange-50 hover:text-orange-600">
                  Add Comment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const IssueReportForm = ({ onSave, onCancel }: {
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Infrastructure",
    location: "",
    priority: "medium"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-xl">
            <Plus className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Report an Issue</h1>
            <p className="text-gray-600">Help us identify and resolve community issues</p>
          </div>
        </div>
        <Button variant="outline" onClick={onCancel} className="hover:scale-105 transition-all duration-300">
          Cancel
        </Button>
      </div>

      <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Issue Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief description of the issue"
                  className="h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Where is this issue located?"
                  className="h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-orange-500 transition-all duration-300"
                >
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Roads">Roads</option>
                  <option value="Water & Sanitation">Water & Sanitation</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Priority Level</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-orange-500 transition-all duration-300"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Detailed Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Provide detailed information about the issue, including any safety concerns or impact on the community..."
                rows={8}
                className="text-lg border-2 focus:border-orange-500 transition-all duration-300"
                required
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Photo Upload (Optional)
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Adding photos helps us understand and prioritize the issue better.
              </p>
              <Button type="button" variant="outline" className="w-full border-dashed border-2 border-blue-300 text-blue-600 hover:bg-blue-50">
                <Camera className="h-4 w-4 mr-2" />
                Add Photos
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <AlertTriangle className="h-5 w-5 mr-2" />
                Submit Issue Report
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="px-8 h-12 text-lg hover:scale-105 transition-all duration-300"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const statusConfig = {
  reported: { label: "Reported", color: "bg-blue-500", icon: AlertTriangle },
  investigating: { label: "Investigating", color: "bg-yellow-500", icon: Search },
  "in-progress": { label: "In Progress", color: "bg-orange-500", icon: Clock },
  resolved: { label: "Resolved", color: "bg-green-500", icon: CheckCircle },
  closed: { label: "Closed", color: "bg-gray-500", icon: CheckCircle }
};

const priorityConfig = {
  low: { color: "bg-green-500", label: "Low" },
  medium: { color: "bg-yellow-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  urgent: { color: "bg-red-500", label: "Urgent" }
};

export default IssueReporting;
