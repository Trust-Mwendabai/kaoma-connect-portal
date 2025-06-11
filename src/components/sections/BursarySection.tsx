import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Search, Plus, Clock, CheckCircle, Users, Calendar, Eye, Star, Filter, TrendingUp } from "lucide-react";

interface BursaryApplication {
  id: string;
  studentName: string;
  institution: string;
  course: string;
  level: "primary" | "secondary" | "tertiary";
  amount: number;
  status: "pending" | "approved" | "rejected" | "disbursed";
  dateApplied: string;
  gpa?: number;
  needsAssessment: number;
  documents: string[];
  priority: "low" | "medium" | "high" | "urgent";
}

interface BursarySectionProps {
  userRole: "admin" | "public" | null;
}

const BursarySection = ({ userRole }: BursarySectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isApplying, setIsApplying] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<BursaryApplication | null>(null);

  const [applications, setApplications] = useState<BursaryApplication[]>([
    {
      id: "BUR001",
      studentName: "Mary Mwanza",
      institution: "University of Zambia",
      course: "Bachelor of Medicine",
      level: "tertiary",
      amount: 15000,
      status: "approved",
      dateApplied: "2024-01-15",
      gpa: 3.8,
      needsAssessment: 8.5,
      documents: ["transcript", "letter_of_admission", "financial_statement"],
      priority: "high"
    },
    {
      id: "BUR002",
      studentName: "John Mulenga",
      institution: "Kaoma Secondary School",
      course: "Grade 12",
      level: "secondary",
      amount: 3500,
      status: "pending",
      dateApplied: "2024-01-12",
      gpa: 3.2,
      needsAssessment: 9.2,
      documents: ["report_card", "recommendation_letter"],
      priority: "urgent"
    },
    {
      id: "BUR003",
      studentName: "Grace Sitali",
      institution: "Copperbelt University",
      course: "Bachelor of Engineering",
      level: "tertiary",
      amount: 12000,
      status: "disbursed",
      dateApplied: "2024-01-08",
      gpa: 3.9,
      needsAssessment: 7.8,
      documents: ["transcript", "project_proposal", "financial_statement"],
      priority: "high"
    },
    {
      id: "BUR004",
      studentName: "Peter Banda",
      institution: "Mayukwayukwa Primary School",
      course: "Grade 7",
      level: "primary",
      amount: 800,
      status: "approved",
      dateApplied: "2024-01-10",
      needsAssessment: 8.9,
      documents: ["progress_report", "family_income_statement"],
      priority: "medium"
    }
  ]);

  const statusConfig = {
    pending: { label: "Pending Review", color: "bg-yellow-500", icon: Clock },
    approved: { label: "Approved", color: "bg-green-500", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-500", icon: Search },
    disbursed: { label: "Disbursed", color: "bg-blue-500", icon: CheckCircle }
  };

  const levelConfig = {
    primary: { label: "Primary", color: "bg-green-500" },
    secondary: { label: "Secondary", color: "bg-blue-500" },
    tertiary: { label: "Tertiary", color: "bg-purple-500" }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter(a => a.status === "approved").length,
    disbursed: applications.filter(a => a.status === "disbursed").length,
    totalAmount: applications.filter(a => a.status === "disbursed").reduce((sum, a) => sum + a.amount, 0)
  };

  if (selectedApplication) {
    return <ApplicationDetailView application={selectedApplication} onBack={() => setSelectedApplication(null)} userRole={userRole} />;
  }

  if (isApplying) {
    return <BursaryApplicationForm onSave={() => setIsApplying(false)} onCancel={() => setIsApplying(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Education Bursary Program</h1>
              <p className="text-blue-100 text-lg">Supporting students through quality education funding</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsApplying(true)} 
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Apply for Bursary
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Applications</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.approved}</div>
            <div className="text-gray-600 font-medium">Approved</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Star className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.disbursed}</div>
            <div className="text-gray-600 font-medium">Disbursed</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-indigo-600 mb-1">K{stats.totalAmount.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Total Disbursed</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1">
          <TabsTrigger value="applications" className="flex items-center gap-2 text-sm font-medium">
            <GraduationCap className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="eligibility" className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle className="h-4 w-4" />
            Eligibility
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by student name, institution, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex gap-2 flex-wrap">
                  {["all", "pending", "approved", "rejected", "disbursed"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className={`capitalize transition-all duration-300 hover:scale-105 ${
                        selectedStatus === status ? "bg-blue-500 text-white shadow-lg" : "hover:shadow-md"
                      }`}
                    >
                      {status === "all" ? "All Status" : statusConfig[status as keyof typeof statusConfig]?.label || status}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Applications List */}
          <div className="grid gap-6">
            {filteredApplications.map((application, index) => {
              const StatusIcon = statusConfig[application.status].icon;
              return (
                <Card 
                  key={application.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedApplication(application)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                          {application.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {application.studentName}
                          </h3>
                          <p className="text-gray-700 mb-3">{application.course} at {application.institution}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="h-3 w-3" />
                              {application.level}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.dateApplied).toLocaleDateString()}
                            </span>
                            <span className="font-semibold text-green-600">
                              K{application.amount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex gap-2">
                          <Badge className={`${statusConfig[application.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusConfig[application.status].label}
                          </Badge>
                          <Badge className={`${levelConfig[application.level].color} text-white border-0 px-3 py-1 font-semibold`}>
                            {levelConfig[application.level].label}
                          </Badge>
                        </div>
                        {application.gpa && (
                          <div className="text-sm text-gray-600">
                            GPA: <span className="font-semibold">{application.gpa}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Needs Assessment</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${application.needsAssessment * 10}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold">{application.needsAssessment}/10</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Documents</p>
                        <p className="font-semibold text-gray-800">{application.documents.length} submitted</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <Badge 
                          variant="outline" 
                          className={`${
                            application.priority === 'urgent' ? 'border-red-300 text-red-600' :
                            application.priority === 'high' ? 'border-orange-300 text-orange-600' :
                            application.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-green-300 text-green-600'
                          } capitalize`}
                        >
                          {application.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      {userRole === "admin" && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Review
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                            Contact
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No applications found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Bursary Eligibility Criteria
              </CardTitle>
              <CardDescription>Requirements and guidelines for bursary applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Primary Level</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Family income below K2,000/month</li>
                    <li>• Academic performance above 60%</li>
                    <li>• Resident of Kaoma constituency</li>
                    <li>• Up to K1,000 per year</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Secondary Level</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Family income below K3,000/month</li>
                    <li>• Academic performance above 70%</li>
                    <li>• Resident of Kaoma constituency</li>
                    <li>• Up to K5,000 per year</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Tertiary Level</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Family income below K5,000/month</li>
                    <li>• GPA above 3.0 or equivalent</li>
                    <li>• Resident of Kaoma constituency</li>
                    <li>• Up to K20,000 per year</li>
                  </ul>
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
                Bursary Analytics Dashboard
              </CardTitle>
              <CardDescription>Performance metrics and funding distribution insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500">Detailed charts and funding insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApplicationDetailView = ({ application, onBack, userRole }: {
  application: BursaryApplication;
  onBack: () => void;
  userRole: "admin" | "public" | null;
}) => {
  const StatusIcon = statusConfig[application.status].icon;
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6 hover:scale-105 transition-all duration-300"
      >
        ← Back to Applications
      </Button>
      
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl mb-3">{application.studentName}</CardTitle>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-4 w-4" />
                  {application.course}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {application.institution}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Applied: {new Date(application.dateApplied).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-2">
                <Badge className={`${levelConfig[application.level].color} text-white border-0 px-3 py-1 font-semibold`}>
                  {levelConfig[application.level].label} Education
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-0 px-3 py-1 font-semibold">
                  K{application.amount.toLocaleString()} Requested
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <Badge className={`${statusConfig[application.status].color} text-white border-0 px-4 py-2 font-semibold flex items-center gap-2 text-lg`}>
                <StatusIcon className="h-4 w-4" />
                {statusConfig[application.status].label}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">Academic Performance</h4>
                {application.gpa && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-blue-700">GPA</span>
                      <span className="font-bold text-blue-800">{application.gpa}/4.0</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(application.gpa / 4) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-blue-700">Needs Assessment</span>
                    <span className="font-bold text-blue-800">{application.needsAssessment}/10</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${application.needsAssessment * 10}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Documents Submitted</h4>
                <div className="space-y-2">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="capitalize">{doc.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Financial Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-green-700">Requested Amount:</span>
                    <span className="font-bold text-green-800">K{application.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Education Level:</span>
                    <span className="font-bold text-green-800 capitalize">{application.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Priority Level:</span>
                    <Badge 
                      variant="outline" 
                      className={`${
                        application.priority === 'urgent' ? 'border-red-300 text-red-600' :
                        application.priority === 'high' ? 'border-orange-300 text-orange-600' :
                        application.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                        'border-green-300 text-green-600'
                      } capitalize`}
                    >
                      {application.priority}
                    </Badge>
                  </div>
                </div>
              </div>

              {userRole === "admin" && (
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">Admin Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Approve Application
                    </Button>
                    <Button variant="outline" className="w-full hover:bg-blue-50 hover:text-blue-600">
                      Request More Documents
                    </Button>
                    <Button variant="outline" className="w-full hover:bg-red-50 hover:text-red-600">
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BursaryApplicationForm = ({ onSave, onCancel }: {
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    studentName: "",
    institution: "",
    course: "",
    level: "secondary",
    amount: "",
    gpa: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Apply for Bursary</h1>
            <p className="text-gray-600">Submit your application for education funding</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">Student Name</label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  placeholder="Full name of the student"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Institution</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  placeholder="School/University name"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Course/Program</label>
                <Input
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  placeholder="Course or program of study"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Education Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-blue-500 transition-all duration-300"
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="tertiary">Tertiary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Requested Amount (Kwacha)</label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="Amount needed for education"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">GPA/Academic Score</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.gpa}
                  onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                  placeholder="Current GPA or average score"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Required Documents
              </h4>
              <p className="text-sm text-blue-700 mb-3">
                Please ensure you have the following documents ready to upload:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Academic transcripts or report cards</li>
                <li>• Letter of admission or enrollment</li>
                <li>• Family financial statement</li>
                <li>• Recommendation letter</li>
                <li>• National Registration Card copy</li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <GraduationCap className="h-5 w-5 mr-2" />
                Submit Application
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
  pending: { label: "Pending Review", color: "bg-yellow-500", icon: Clock },
  approved: { label: "Approved", color: "bg-green-500", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-500", icon: Search },
  disbursed: { label: "Disbursed", color: "bg-blue-500", icon: CheckCircle }
};

const levelConfig = {
  primary: { label: "Primary", color: "bg-green-500" },
  secondary: { label: "Secondary", color: "bg-blue-500" },
  tertiary: { label: "Tertiary", color: "bg-purple-500" }
};

export default BursarySection;
