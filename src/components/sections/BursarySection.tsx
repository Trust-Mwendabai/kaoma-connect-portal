
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, User, Calendar, DollarSign, Plus, Search } from "lucide-react";

interface BursarySectionProps {
  userRole: "admin" | "public" | null;
}

const BursarySection = ({ userRole }: BursarySectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const applications = [
    {
      id: "BUR001",
      studentName: "John Mukambo",
      course: "Bachelor of Engineering",
      university: "University of Zambia",
      amount: "K15,000",
      status: "approved",
      dateApplied: "2024-01-15",
      academicYear: "2024/2025"
    },
    {
      id: "BUR002", 
      studentName: "Mary Sitwala",
      course: "Diploma in Nursing",
      university: "Zambia Institute of Health Sciences",
      amount: "K8,500",
      status: "pending",
      dateApplied: "2024-01-20",
      academicYear: "2024/2025"
    },
    {
      id: "BUR003",
      studentName: "Peter Mwanza",
      course: "Bachelor of Education",
      university: "Copperbelt University",
      amount: "K12,000",
      status: "under_review",
      dateApplied: "2024-01-18",
      academicYear: "2024/2025"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      approved: { label: "Approved", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bursary Management</h1>
          <p className="text-gray-600">Educational support for Kaoma constituency students</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Application
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search applications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-md"
        />
      </div>

      <Tabs defaultValue="applications" className="w-full">
        <TabsList>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage</TabsTrigger>}
        </TabsList>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-6">
            {applications.map((application) => (
              <Card key={application.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {application.studentName}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Application ID: {application.id}
                      </CardDescription>
                    </div>
                    <Badge {...getStatusBadge(application.status)}>
                      {getStatusBadge(application.status).label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Course</p>
                        <p className="font-medium">{application.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Amount</p>
                        <p className="font-medium">{application.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Date Applied</p>
                        <p className="font-medium">{application.dateApplied}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Academic Year</p>
                        <p className="font-medium">{application.academicYear}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                    {userRole === "admin" && (
                      <>
                        <Button variant="outline" size="sm">Approve</Button>
                        <Button variant="outline" size="sm">Reject</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{applications.length}</div>
                  <div className="text-sm text-gray-600">Total Applications</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === "approved").length}
                  </div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {applications.filter(app => app.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    K{applications.reduce((sum, app) => sum + parseInt(app.amount.replace(/[K,]/g, "")), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="manage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Bulk actions and application settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button>Approve Selected</Button>
                    <Button variant="outline">Export Data</Button>
                    <Button variant="outline">Send Notifications</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default BursarySection;
