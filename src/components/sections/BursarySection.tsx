
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { FileText, Upload, Eye, Download } from "lucide-react";

interface BursarySectionProps {
  userRole: "admin" | "public" | null;
}

const BursarySection = ({ userRole }: BursarySectionProps) => {
  const { toast } = useToast();
  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    nrcNumber: "",
    phoneNumber: "",
    email: "",
    schoolName: "",
    program: "",
    yearOfStudy: "",
    reason: "",
    amountRequested: ""
  });

  const [applications] = useState([
    {
      id: "BUR001",
      name: "John Mukambo",
      school: "University of Zambia",
      program: "Computer Science",
      amount: "K15,000",
      status: "pending",
      dateSubmitted: "2024-01-15"
    },
    {
      id: "BUR002", 
      name: "Mary Sikazwe",
      school: "Copperbelt University",
      program: "Engineering",
      amount: "K12,000",
      status: "approved",
      dateSubmitted: "2024-01-10"
    },
    {
      id: "BUR003",
      name: "Peter Mwanza",
      school: "UNZA School of Medicine",
      program: "Medicine",
      amount: "K20,000",
      status: "under_review",
      dateSubmitted: "2024-01-12"
    }
  ]);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Submitted",
      description: "Your bursary application has been submitted successfully. You will receive an email confirmation shortly."
    });
    // Reset form
    setApplicationForm({
      fullName: "",
      nrcNumber: "",
      phoneNumber: "",
      email: "",
      schoolName: "",
      program: "",
      yearOfStudy: "",
      reason: "",
      amountRequested: ""
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      under_review: { label: "Under Review", variant: "default" as const },
      approved: { label: "Approved", variant: "default" as const },
      rejected: { label: "Rejected", variant: "destructive" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  if (!userRole) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Bursary Application Portal</h2>
        <p className="text-gray-600 mb-6">Please login to access bursary services</p>
        <Button>Login to Continue</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Bursary Application Portal</h1>
        <p className="text-gray-600">Apply for educational support from Kaoma Constituency</p>
      </div>

      <Tabs defaultValue={userRole === "admin" ? "manage" : "apply"} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="apply">Apply for Bursary</TabsTrigger>
          <TabsTrigger value="track">Track Application</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage Applications</TabsTrigger>}
        </TabsList>

        <TabsContent value="apply" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New Bursary Application</CardTitle>
              <CardDescription>
                Complete all fields to submit your bursary application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={applicationForm.fullName}
                      onChange={(e) => setApplicationForm({...applicationForm, fullName: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nrcNumber">NRC Number</Label>
                    <Input
                      id="nrcNumber"
                      value={applicationForm.nrcNumber}
                      onChange={(e) => setApplicationForm({...applicationForm, nrcNumber: e.target.value})}
                      placeholder="123456/78/9"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      value={applicationForm.phoneNumber}
                      onChange={(e) => setApplicationForm({...applicationForm, phoneNumber: e.target.value})}
                      placeholder="+260 97X XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm({...applicationForm, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolName">School/University</Label>
                    <Input
                      id="schoolName"
                      value={applicationForm.schoolName}
                      onChange={(e) => setApplicationForm({...applicationForm, schoolName: e.target.value})}
                      placeholder="University of Zambia"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="program">Program/Course</Label>
                    <Input
                      id="program"
                      value={applicationForm.program}
                      onChange={(e) => setApplicationForm({...applicationForm, program: e.target.value})}
                      placeholder="Computer Science"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="yearOfStudy">Year of Study</Label>
                    <Input
                      id="yearOfStudy"
                      value={applicationForm.yearOfStudy}
                      onChange={(e) => setApplicationForm({...applicationForm, yearOfStudy: e.target.value})}
                      placeholder="Year 2"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="amountRequested">Amount Requested (ZMW)</Label>
                    <Input
                      id="amountRequested"
                      type="number"
                      value={applicationForm.amountRequested}
                      onChange={(e) => setApplicationForm({...applicationForm, amountRequested: e.target.value})}
                      placeholder="15000"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reason">Reason for Application</Label>
                  <Textarea
                    id="reason"
                    value={applicationForm.reason}
                    onChange={(e) => setApplicationForm({...applicationForm, reason: e.target.value})}
                    placeholder="Explain why you need this bursary..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Required Documents</Label>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">NRC Copy</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Acceptance Letter</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Fee Structure</p>
                      <Button variant="outline" size="sm" className="mt-2">Upload</Button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Applications</CardTitle>
              <CardDescription>Track the status of your bursary applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.slice(0, 1).map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{app.id}</h3>
                        <p className="text-sm text-gray-600">{app.school} - {app.program}</p>
                      </div>
                      <Badge {...getStatusBadge(app.status)}>
                        {getStatusBadge(app.status).label}
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Amount Requested</p>
                        <p className="font-medium">{app.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Date Submitted</p>
                        <p className="font-medium">{app.dateSubmitted}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Applications</CardTitle>
                <CardDescription>Review and process bursary applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{app.name}</h3>
                          <p className="text-sm text-gray-600">{app.school} - {app.program}</p>
                        </div>
                        <Badge {...getStatusBadge(app.status)}>
                          {getStatusBadge(app.status).label}
                        </Badge>
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-600">Application ID</p>
                          <p className="font-medium">{app.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Amount</p>
                          <p className="font-medium">{app.amount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Date</p>
                          <p className="font-medium">{app.dateSubmitted}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="default" size="sm">Approve</Button>
                          <Button variant="destructive" size="sm">Reject</Button>
                        </div>
                      </div>
                    </div>
                  ))}
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
