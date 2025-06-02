
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MapPin, Calendar, Camera, Plus, CheckCircle } from "lucide-react";

interface IssueReportingProps {
  userRole: "admin" | "public" | null;
}

const IssueReporting = ({ userRole }: IssueReportingProps) => {
  const [issueType, setIssueType] = useState("infrastructure");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const issues = [
    {
      id: "ISS001",
      title: "Broken Street Light on Main Road",
      description: "Street light pole is broken and has been causing darkness in the area for over a week.",
      location: "Main Road, Kaoma Central",
      type: "infrastructure",
      status: "in_progress",
      priority: "high",
      dateReported: "2024-01-20",
      reportedBy: "Community Member"
    },
    {
      id: "ISS002",
      title: "Blocked Drainage System",
      description: "Drainage blocked causing flooding during rains near the market area.",
      location: "Kaoma Market Area",
      type: "infrastructure",
      status: "resolved",
      priority: "medium",
      dateReported: "2024-01-18",
      reportedBy: "Local Trader"
    },
    {
      id: "ISS003",
      title: "Pothole on School Road",
      description: "Large pothole making it difficult for school children to pass safely.",
      location: "School Road, Ward 5",
      type: "road",
      status: "pending",
      priority: "high",
      dateReported: "2024-01-15",
      reportedBy: "Parent"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const, color: "bg-gray-500" },
      in_progress: { label: "In Progress", variant: "default" as const, color: "bg-blue-500" },
      resolved: { label: "Resolved", variant: "default" as const, color: "bg-green-500" },
      rejected: { label: "Rejected", variant: "destructive" as const, color: "bg-red-500" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Low", color: "bg-green-500" },
      medium: { label: "Medium", color: "bg-yellow-500" },
      high: { label: "High", color: "bg-red-500" },
      urgent: { label: "Urgent", color: "bg-purple-500" }
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Issue Reporting</h1>
          <p className="text-gray-600">Report infrastructure and community issues for quick resolution</p>
        </div>
      </div>

      <Tabs defaultValue="report" className="w-full">
        <TabsList>
          <TabsTrigger value="report">Report Issue</TabsTrigger>
          <TabsTrigger value="track">Track Issues</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage</TabsTrigger>}
        </TabsList>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report a New Issue</CardTitle>
              <CardDescription>Help us identify and resolve community problems quickly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Issue Type</label>
                <select 
                  value={issueType} 
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="infrastructure">Infrastructure</option>
                  <option value="road">Road/Transport</option>
                  <option value="water">Water & Sanitation</option>
                  <option value="electricity">Electricity</option>
                  <option value="health">Health Services</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="Enter the location of the issue"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  placeholder="Describe the issue in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Photos (Optional)</label>
                <Button variant="outline" className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
              <Button className="w-full">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Submit Issue Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track" className="space-y-4">
          <div className="grid gap-6">
            {issues.map((issue) => (
              <Card key={issue.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {issue.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {issue.location}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getPriorityBadge(issue.priority).color} text-white`}>
                        {getPriorityBadge(issue.priority).label}
                      </Badge>
                      <Badge {...getStatusBadge(issue.status)}>
                        {getStatusBadge(issue.status).label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{issue.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Date Reported</p>
                        <p className="font-medium">{issue.dateReported}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Issue Type</p>
                        <p className="font-medium capitalize">{issue.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-gray-600">Reported By</p>
                        <p className="font-medium">{issue.reportedBy}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">View Photos</Button>
                    {userRole === "admin" && (
                      <Button variant="outline" size="sm">Update Status</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {userRole === "admin" && (
          <TabsContent value="manage" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{issues.length}</div>
                    <div className="text-sm text-gray-600">Total Issues</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {issues.filter(i => i.status === "resolved").length}
                    </div>
                    <div className="text-sm text-gray-600">Resolved</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {issues.filter(i => i.status === "pending").length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {issues.filter(i => i.priority === "high").length}
                    </div>
                    <div className="text-sm text-gray-600">High Priority</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default IssueReporting;
