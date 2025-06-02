
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, MapPin, Camera, Calendar, User, Wrench } from "lucide-react";

interface IssueReportingProps {
  userRole: "admin" | "public" | null;
}

const IssueReporting = ({ userRole }: IssueReportingProps) => {
  const { toast } = useToast();
  const [issueForm, setIssueForm] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    location: "",
    reporterName: "",
    reporterPhone: "",
    reporterEmail: ""
  });

  const [issues] = useState([
    {
      id: "ISS001",
      title: "Broken Borehole at Mayukwayukwa",
      description: "The community borehole has been broken for 2 weeks. Over 200 families affected.",
      category: "water",
      priority: "urgent",
      location: "Mayukwayukwa Village",
      status: "assigned",
      reportDate: "2024-01-15",
      reporterName: "Community Leader",
      assignedTo: "Water Department",
      estimatedResolution: "2024-01-25"
    },
    {
      id: "ISS002",
      title: "Road Washout on Main Highway",
      description: "Heavy rains have washed out a section of the main highway making it impassable.",
      category: "infrastructure",
      priority: "high",
      location: "Kaoma-Lukulu Highway, KM 15",
      status: "in_progress",
      reportDate: "2024-01-12",
      reporterName: "Transport Operators",
      assignedTo: "Roads Authority",
      estimatedResolution: "2024-02-01"
    },
    {
      id: "ISS003",
      title: "School Roof Leaking",
      description: "Classroom roofs at Nkoya Primary School are leaking during rainy season.",
      category: "education",
      priority: "medium",
      location: "Nkoya Primary School",
      status: "pending",
      reportDate: "2024-01-10",
      reporterName: "School Committee",
      assignedTo: "Education Office",
      estimatedResolution: "2024-03-01"
    },
    {
      id: "ISS004",
      title: "Health Center Medicine Shortage",
      description: "Local health center running low on essential medicines including malaria drugs.",
      category: "healthcare",
      priority: "high",
      location: "Kaoma Health Center",
      status: "resolved",
      reportDate: "2024-01-05",
      reporterName: "Health Worker",
      assignedTo: "Health Ministry",
      estimatedResolution: "2024-01-20"
    }
  ]);

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Issue Reported",
      description: "Your issue has been submitted successfully. You will receive updates on its progress."
    });
    setIssueForm({
      title: "",
      description: "",
      category: "",
      priority: "",
      location: "",
      reporterName: "",
      reporterPhone: "",
      reporterEmail: ""
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      assigned: { label: "Assigned", variant: "default" as const },
      in_progress: { label: "In Progress", variant: "default" as const },
      resolved: { label: "Resolved", variant: "default" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Low", variant: "secondary" as const },
      medium: { label: "Medium", variant: "default" as const },
      high: { label: "High", variant: "default" as const },
      urgent: { label: "Urgent", variant: "destructive" as const }
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      water: "💧",
      infrastructure: "🛣️", 
      education: "🏫",
      healthcare: "🏥",
      electricity: "⚡",
      security: "🛡️"
    };
    return icons[category as keyof typeof icons] || "❗";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Issue Reporting System</h1>
        <p className="text-gray-600">Report constituency issues and track their resolution</p>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="report">Report Issue</TabsTrigger>
          <TabsTrigger value="track">Track Issues</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage Issues</TabsTrigger>}
        </TabsList>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report a New Issue</CardTitle>
              <CardDescription>
                Help us identify and resolve problems in the constituency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitIssue} className="space-y-4">
                <div>
                  <Label htmlFor="title">Issue Title</Label>
                  <Input
                    id="title"
                    value={issueForm.title}
                    onChange={(e) => setIssueForm({...issueForm, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setIssueForm({...issueForm, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="water">Water & Sanitation</SelectItem>
                        <SelectItem value="infrastructure">Roads & Infrastructure</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="electricity">Electricity</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select onValueChange={(value) => setIssueForm({...issueForm, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={issueForm.location}
                    onChange={(e) => setIssueForm({...issueForm, location: e.target.value})}
                    placeholder="Specific location where the issue is occurring"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    value={issueForm.description}
                    onChange={(e) => setIssueForm({...issueForm, description: e.target.value})}
                    placeholder="Provide detailed information about the issue..."
                    rows={5}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="reporterName">Your Name</Label>
                    <Input
                      id="reporterName"
                      value={issueForm.reporterName}
                      onChange={(e) => setIssueForm({...issueForm, reporterName: e.target.value})}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterPhone">Phone Number</Label>
                    <Input
                      id="reporterPhone"
                      value={issueForm.reporterPhone}
                      onChange={(e) => setIssueForm({...issueForm, reporterPhone: e.target.value})}
                      placeholder="+260 97X XXX XXX"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterEmail">Email (Optional)</Label>
                    <Input
                      id="reporterEmail"
                      type="email"
                      value={issueForm.reporterEmail}
                      onChange={(e) => setIssueForm({...issueForm, reporterEmail: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Attach Photos (Optional)</Label>
                  <div className="border-2 border-dashed border-gray-300 p-6 text-center rounded-lg">
                    <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload photos of the issue</p>
                    <Button variant="outline" size="sm">Choose Files</Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">Submit Issue Report</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Issue Tracker</CardTitle>
              <CardDescription>View and track the status of reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {issues.map((issue) => (
                  <div key={issue.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getCategoryIcon(issue.category)}</span>
                        <h3 className="font-semibold">{issue.title}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Badge {...getStatusBadge(issue.status)}>
                          {getStatusBadge(issue.status).label}
                        </Badge>
                        <Badge {...getPriorityBadge(issue.priority)}>
                          {getPriorityBadge(issue.priority).label}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{issue.description}</p>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Location</p>
                          <p className="font-medium">{issue.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Reported</p>
                          <p className="font-medium">{issue.reportDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Assigned To</p>
                          <p className="font-medium">{issue.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Est. Resolution</p>
                          <p className="font-medium">{issue.estimatedResolution}</p>
                        </div>
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
                <CardTitle>Issue Management Dashboard</CardTitle>
                <CardDescription>Assign, track, and resolve constituency issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {issues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getCategoryIcon(issue.category)}</span>
                          <div>
                            <h3 className="font-semibold">{issue.title}</h3>
                            <p className="text-sm text-gray-600">ID: {issue.id} | Reporter: {issue.reporterName}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge {...getStatusBadge(issue.status)}>
                            {getStatusBadge(issue.status).label}
                          </Badge>
                          <Badge {...getPriorityBadge(issue.priority)}>
                            {getPriorityBadge(issue.priority).label}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{issue.description}</p>
                      
                      <div className="flex gap-2 mb-3">
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Select>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="Assign To" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="water_dept">Water Department</SelectItem>
                            <SelectItem value="roads_authority">Roads Authority</SelectItem>
                            <SelectItem value="education_office">Education Office</SelectItem>
                            <SelectItem value="health_ministry">Health Ministry</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button variant="outline" size="sm">Update</Button>
                        <Button variant="outline" size="sm">Contact Reporter</Button>
                        <Button variant="outline" size="sm">View Details</Button>
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

export default IssueReporting;
