
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
import { MessageSquare, ThumbsUp, AlertCircle, Lightbulb, Eye } from "lucide-react";

interface FeedbackSectionProps {
  userRole: "admin" | "public" | null;
}

const FeedbackSection = ({ userRole }: FeedbackSectionProps) => {
  const { toast } = useToast();
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
    anonymous: false
  });

  const [feedback] = useState([
    {
      id: "FB001",
      name: "Anonymous",
      category: "suggestion",
      subject: "Improve Road Infrastructure",
      message: "The road from Kaoma to Lukulu needs urgent attention. Many potholes make it difficult for vehicles.",
      date: "2024-01-15",
      status: "pending",
      priority: "high"
    },
    {
      id: "FB002",
      name: "Sarah Mubanga",
      category: "complaint",
      subject: "Water Supply Issues",
      message: "Our area has been without clean water for 3 weeks. Please look into this urgent matter.",
      date: "2024-01-12",
      status: "responded",
      priority: "urgent"
    },
    {
      id: "FB003",
      name: "Joseph Kazimba",
      category: "appreciation",
      subject: "Thank You for School Project",
      message: "The new classroom block at our local school is excellent. Thank you for this development.",
      date: "2024-01-10",
      status: "acknowledged",
      priority: "low"
    }
  ]);

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We will review it and respond accordingly."
    });
    setFeedbackForm({
      name: "",
      email: "",
      category: "",
      subject: "",
      message: "",
      anonymous: false
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      suggestion: <Lightbulb className="h-4 w-4" />,
      complaint: <AlertCircle className="h-4 w-4" />,
      appreciation: <ThumbsUp className="h-4 w-4" />,
      inquiry: <MessageSquare className="h-4 w-4" />
    };
    return icons[category as keyof typeof icons] || <MessageSquare className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      responded: { label: "Responded", variant: "default" as const },
      acknowledged: { label: "Acknowledged", variant: "default" as const }
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Feedback & Suggestions</h1>
        <p className="text-gray-600">Share your thoughts and help us improve constituency services</p>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="public">Public Feedback</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage Feedback</TabsTrigger>}
        </TabsList>

        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Feedback</CardTitle>
              <CardDescription>
                Your input helps us serve the constituency better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name (Optional)</Label>
                    <Input
                      id="name"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({...feedbackForm, name: e.target.value})}
                      placeholder="Enter your name or leave blank for anonymous"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={feedbackForm.email}
                      onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setFeedbackForm({...feedbackForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                      <SelectItem value="appreciation">Appreciation</SelectItem>
                      <SelectItem value="inquiry">General Inquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={feedbackForm.subject}
                    onChange={(e) => setFeedbackForm({...feedbackForm, subject: e.target.value})}
                    placeholder="Brief subject of your feedback"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={feedbackForm.message}
                    onChange={(e) => setFeedbackForm({...feedbackForm, message: e.target.value})}
                    placeholder="Please provide detailed feedback..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">Submit Feedback</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="public" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Community Feedback</CardTitle>
              <CardDescription>Public feedback and responses from the constituency office</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.filter(f => f.name !== "Anonymous" || f.category === "appreciation").map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(item.category)}
                        <h3 className="font-semibold">{item.subject}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Badge {...getStatusBadge(item.status)}>
                          {getStatusBadge(item.status).label}
                        </Badge>
                        <Badge {...getPriorityBadge(item.priority)}>
                          {getPriorityBadge(item.priority).label}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{item.message}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>By: {item.name}</span>
                      <span>{item.date}</span>
                    </div>
                    {item.status === "responded" && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">Official Response:</p>
                        <p className="text-sm text-blue-700">
                          Thank you for bringing this to our attention. We are working with relevant authorities to address this issue.
                        </p>
                      </div>
                    )}
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
                <CardTitle>Manage All Feedback</CardTitle>
                <CardDescription>Review and respond to constituency feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <h3 className="font-semibold">{item.subject}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Badge {...getStatusBadge(item.status)}>
                            {getStatusBadge(item.status).label}
                          </Badge>
                          <Badge {...getPriorityBadge(item.priority)}>
                            {getPriorityBadge(item.priority).label}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{item.message}</p>
                      <div className="flex justify-between items-center mb-3 text-sm text-gray-600">
                        <span>By: {item.name} | ID: {item.id}</span>
                        <span>{item.date}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">Respond</Button>
                        <Button variant="outline" size="sm">Mark Resolved</Button>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Priority" />
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

export default FeedbackSection;
