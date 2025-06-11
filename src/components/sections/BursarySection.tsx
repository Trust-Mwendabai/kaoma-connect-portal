
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Search, Plus, Edit, Clock, CheckCircle, User, GraduationCap, DollarSign, Calendar, Star, Filter, BookOpen, TrendingUp } from "lucide-react";

interface BursaryApplication {
  id: string;
  studentName: string;
  course: string;
  institution: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "under-review";
  submissionDate: string;
  academicYear: string;
  gpa: number;
  category: string;
}

interface BursarySectionProps {
  userRole: "admin" | "public" | null;
}

const BursarySection = ({ userRole }: BursarySectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isApplying, setIsApplying] = useState(false);

  const [applications, setApplications] = useState<BursaryApplication[]>([
    {
      id: "BURS001",
      studentName: "Alice Mwanza",
      course: "Bachelor of Medicine",
      institution: "University of Zambia",
      amount: 25000,
      status: "approved",
      submissionDate: "2024-01-15",
      academicYear: "2024",
      gpa: 3.8,
      category: "Medical Sciences"
    },
    {
      id: "BURS002",
      studentName: "John Sikanyika",
      course: "Diploma in Information Technology",
      institution: "Lusaka Apex Medical University",
      amount: 15000,
      status: "pending",
      submissionDate: "2024-01-20",
      academicYear: "2024",
      gpa: 3.5,
      category: "Technology"
    },
    {
      id: "BURS003",
      studentName: "Grace Mutale",
      course: "Bachelor of Engineering",
      institution: "Copperbelt University",
      amount: 30000,
      status: "under-review",
      submissionDate: "2024-01-25",
      academicYear: "2024",
      gpa: 3.9,
      category: "Engineering"
    },
    {
      id: "BURS004",
      studentName: "Peter Banda",
      course: "Certificate in Agriculture",
      institution: "Natural Resources Development College",
      amount: 8000,
      status: "rejected",
      submissionDate: "2024-01-10",
      academicYear: "2024",
      gpa: 2.8,
      category: "Agriculture"
    }
  ]);

  const statusConfig = {
    pending: { label: "Pending Review", color: "bg-yellow-500", icon: Clock },
    approved: { label: "Approved", color: "bg-green-500", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-500", icon: FileText },
    "under-review": { label: "Under Review", color: "bg-blue-500", icon: Search }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.institution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    approved: applications.filter(app => app.status === "approved").length,
    pending: applications.filter(app => app.status === "pending").length,
    totalAmount: applications.filter(app => app.status === "approved").reduce((sum, app) => sum + app.amount, 0)
  };

  if (isApplying) {
    return <BursaryApplicationForm onSave={() => setIsApplying(false)} onCancel={() => setIsApplying(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <GraduationCap className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Bursary Management</h1>
              <p className="text-green-100 text-lg">Supporting education through financial assistance</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsApplying(true)} 
            className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
              <FileText className="h-6 w-6" />
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

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.pending}</div>
            <div className="text-gray-600 font-medium">Pending Review</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">K{stats.totalAmount.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Total Disbursed</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1">
          <TabsTrigger value="applications" className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="guidelines" className="flex items-center gap-2 text-sm font-medium">
            <BookOpen className="h-4 w-4" />
            Guidelines
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search by student name, course, or institution..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex gap-2 flex-wrap">
                  {["all", "pending", "approved", "under-review", "rejected"].map((status) => (
                    <Button
                      key={status}
                      variant={selectedStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedStatus(status)}
                      className={`capitalize transition-all duration-300 hover:scale-105 ${
                        selectedStatus === status ? "bg-green-500 text-white shadow-lg" : "hover:shadow-md"
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
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                          {application.studentName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1 group-hover:text-green-600 transition-colors duration-300">
                            {application.studentName}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {application.id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(application.submissionDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${statusConfig[application.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[application.status].label}
                        </Badge>
                        {application.gpa >= 3.5 && (
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">High Achiever</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Course & Institution</p>
                        <p className="font-semibold text-gray-800">{application.course}</p>
                        <p className="text-sm text-gray-600">{application.institution}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Amount Requested</p>
                        <p className="text-2xl font-bold text-green-600">K{application.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Academic Year {application.academicYear}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500">Academic Performance</p>
                        <div className="flex items-center gap-2">
                          <p className="text-lg font-bold text-gray-800">GPA: {application.gpa}</p>
                          <div className="flex-1">
                            <Progress value={(application.gpa / 4) * 100} className="h-2" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{application.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="hover:bg-green-50 hover:text-green-600 transition-all duration-300">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                          Download Documents
                        </Button>
                      </div>
                      {userRole === "admin" && (
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="hover:bg-red-50 hover:text-red-600">
                            Review
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

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Bursary Analytics Dashboard
              </CardTitle>
              <CardDescription>Comprehensive analysis of bursary distribution and impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500">Detailed charts and insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Bursary Application Guidelines
              </CardTitle>
              <CardDescription>Everything you need to know about applying for a bursary</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Eligibility Criteria</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Resident of Kaoma Constituency</li>
                    <li>• Enrolled in accredited institution</li>
                    <li>• Minimum GPA of 2.5</li>
                    <li>• Financial need demonstration</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Required Documents</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Academic transcripts</li>
                    <li>• Admission letter</li>
                    <li>• Financial statement</li>
                    <li>• Recommendation letters</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const BursaryApplicationForm = ({ onSave, onCancel }: {
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    studentName: "",
    course: "",
    institution: "",
    amount: "",
    academicYear: "2024",
    gpa: "",
    category: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl">
            <Plus className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Apply for Bursary</h1>
            <p className="text-gray-600">Complete the form below to submit your application</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                  placeholder="Enter your full name"
                  className="h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Course/Program</label>
                <Input
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  placeholder="e.g., Bachelor of Medicine"
                  className="h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Institution</label>
                <Input
                  value={formData.institution}
                  onChange={(e) => setFormData({...formData, institution: e.target.value})}
                  placeholder="Name of your educational institution"
                  className="h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Amount Requested (K)</label>
                <Input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="e.g., 25000"
                  className="h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Academic Year</label>
                <select
                  value={formData.academicYear}
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-green-500 transition-all duration-300"
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Current GPA</label>
                <Input
                  type="number"
                  step="0.1"
                  max="4.0"
                  value={formData.gpa}
                  onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                  placeholder="e.g., 3.5"
                  className="h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="h-5 w-5 mr-2" />
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

export default BursarySection;
