
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, User, Calendar, Plus, Star } from "lucide-react";

interface FeedbackSectionProps {
  userRole: "admin" | "public" | null;
}

const FeedbackSection = ({ userRole }: FeedbackSectionProps) => {
  const [newFeedback, setNewFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("general");

  const feedbacks = [
    {
      id: "FB001",
      user: "Anonymous User",
      message: "The road to Mayukwayukwa needs urgent attention. It becomes impassable during rainy season.",
      type: "infrastructure",
      date: "2024-01-20",
      status: "reviewed",
      rating: 4
    },
    {
      id: "FB002",
      user: "Community Member",
      message: "Very pleased with the new borehole project. Water access has improved significantly.",
      type: "appreciation",
      date: "2024-01-18",
      status: "acknowledged",
      rating: 5
    },
    {
      id: "FB003",
      user: "Local Resident",
      message: "Would like to see more youth employment programs in the constituency.",
      type: "suggestion",
      date: "2024-01-15",
      status: "pending",
      rating: 3
    }
  ];

  const getTypeBadge = (type: string) => {
    const typeConfig = {
      general: { label: "General", color: "bg-blue-500" },
      infrastructure: { label: "Infrastructure", color: "bg-orange-500" },
      suggestion: { label: "Suggestion", color: "bg-green-500" },
      appreciation: { label: "Appreciation", color: "bg-purple-500" },
      complaint: { label: "Complaint", color: "bg-red-500" }
    };
    return typeConfig[type as keyof typeof typeConfig] || typeConfig.general;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", variant: "secondary" as const },
      reviewed: { label: "Reviewed", variant: "default" as const },
      acknowledged: { label: "Acknowledged", variant: "default" as const },
      resolved: { label: "Resolved", variant: "default" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Feedback</h1>
          <p className="text-gray-600">Share your thoughts and help improve our constituency</p>
        </div>
      </div>

      <Tabs defaultValue="submit" className="w-full">
        <TabsList>
          <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
          <TabsTrigger value="view">View Feedback</TabsTrigger>
          {userRole === "admin" && <TabsTrigger value="manage">Manage</TabsTrigger>}
        </TabsList>

        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Feedback</CardTitle>
              <CardDescription>Your voice matters. Help us serve you better.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Feedback Type</label>
                <select 
                  value={feedbackType} 
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="general">General Feedback</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="appreciation">Appreciation</option>
                  <option value="complaint">Complaint</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Your Message</label>
                <Textarea
                  placeholder="Please share your feedback, suggestions, or concerns..."
                  value={newFeedback}
                  onChange={(e) => setNewFeedback(e.target.value)}
                  rows={5}
                />
              </div>
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view" className="space-y-4">
          <div className="grid gap-6">
            {feedbacks.map((feedback) => (
              <Card key={feedback.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        {feedback.user}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {feedback.date}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        className={`${getTypeBadge(feedback.type).color} text-white`}
                      >
                        {getTypeBadge(feedback.type).label}
                      </Badge>
                      <Badge {...getStatusBadge(feedback.status)}>
                        {getStatusBadge(feedback.status).label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{feedback.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">({feedback.rating}/5)</span>
                    </div>
                    {userRole === "admin" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reply</Button>
                        <Button variant="outline" size="sm">Mark Resolved</Button>
                      </div>
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
                    <div className="text-2xl font-bold text-blue-600">{feedbacks.length}</div>
                    <div className="text-sm text-gray-600">Total Feedback</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {feedbacks.filter(f => f.status === "resolved").length}
                    </div>
                    <div className="text-sm text-gray-600">Resolved</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {feedbacks.filter(f => f.status === "pending").length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {(feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Avg Rating</div>
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

export default FeedbackSection;
