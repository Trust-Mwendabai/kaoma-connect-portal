
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, Plus, ThumbsUp, ThumbsDown, Star, Filter, TrendingUp, Users, Calendar, Eye, Heart, Reply } from "lucide-react";

interface Feedback {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  rating: number;
  status: "new" | "reviewed" | "implemented" | "declined";
  likes: number;
  replies: number;
  priority: "low" | "medium" | "high";
}

interface FeedbackSectionProps {
  userRole: "admin" | "public" | null;
}

const FeedbackSection = ({ userRole }: FeedbackSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "FB001",
      title: "Improve Road Conditions in Mayukwayukwa",
      content: "The roads in Mayukwayukwa village are in poor condition, especially during rainy season. We need urgent intervention to improve accessibility for emergency services and daily commute.",
      category: "Infrastructure",
      author: "Community Leader",
      date: "2024-01-15",
      rating: 5,
      status: "reviewed",
      likes: 23,
      replies: 5,
      priority: "high"
    },
    {
      id: "FB002",
      title: "Extend Library Hours at Community Center",
      content: "Many students would benefit from extended library hours, especially during exam periods. Current hours don't accommodate working students who can only study in the evenings.",
      category: "Education",
      author: "Student Representative",
      date: "2024-01-12",
      rating: 4,
      status: "new",
      likes: 18,
      replies: 3,
      priority: "medium"
    },
    {
      id: "FB003",
      title: "Mobile Clinic Schedule Improvement",
      content: "The mobile clinic visits are irregular and unpredictable. A fixed schedule would help residents plan their medical appointments better.",
      category: "Health",
      author: "Health Committee",
      date: "2024-01-10",
      rating: 4,
      status: "implemented",
      likes: 31,
      replies: 8,
      priority: "high"
    },
    {
      id: "FB004",
      title: "Youth Sports Program Initiative",
      content: "We propose starting a youth sports program to engage young people in constructive activities and promote healthy lifestyle.",
      category: "Youth",
      author: "Youth Representative",
      date: "2024-01-08",
      rating: 5,
      status: "reviewed",
      likes: 42,
      replies: 12,
      priority: "medium"
    }
  ]);

  const categories = [
    { name: "all", icon: MessageSquare, color: "bg-gray-500" },
    { name: "Infrastructure", icon: TrendingUp, color: "bg-blue-500" },
    { name: "Education", icon: Star, color: "bg-green-500" },
    { name: "Health", icon: Heart, color: "bg-red-500" },
    { name: "Youth", icon: Users, color: "bg-purple-500" },
  ];

  const statusConfig = {
    new: { label: "New", color: "bg-blue-500", icon: Plus },
    reviewed: { label: "Under Review", color: "bg-yellow-500", icon: Eye },
    implemented: { label: "Implemented", color: "bg-green-500", icon: ThumbsUp },
    declined: { label: "Declined", color: "bg-red-500", icon: ThumbsDown }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || feedback.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: feedbacks.length,
    implemented: feedbacks.filter(f => f.status === "implemented").length,
    underReview: feedbacks.filter(f => f.status === "reviewed").length,
    avgRating: feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
  };

  if (selectedFeedback) {
    return <FeedbackDetailView feedback={selectedFeedback} onBack={() => setSelectedFeedback(null)} userRole={userRole} />;
  }

  if (isCreating) {
    return <FeedbackForm onSave={() => setIsCreating(false)} onCancel={() => setIsCreating(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl p-8 text-white">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <MessageSquare className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Community Feedback</h1>
              <p className="text-purple-100 text-lg">Your voice matters - share ideas and suggestions</p>
            </div>
          </div>
          <Button 
            onClick={() => setIsCreating(true)} 
            className="bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Submit Feedback
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Feedback</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <ThumbsUp className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.implemented}</div>
            <div className="text-gray-600 font-medium">Implemented</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-yellow-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-1">{stats.underReview}</div>
            <div className="text-gray-600 font-medium">Under Review</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Star className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.avgRating.toFixed(1)}</div>
            <div className="text-gray-600 font-medium">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100 p-1">
          <TabsTrigger value="feedback" className="flex items-center gap-2 text-sm font-medium">
            <MessageSquare className="h-4 w-4" />
            Community Feedback
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Feedback Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedback" className="space-y-6">
          {/* Enhanced Filters */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search feedback by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-purple-500 transition-all duration-300"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.name)}
                        className={`capitalize transition-all duration-300 hover:scale-105 flex items-center gap-2 ${
                          selectedCategory === category.name 
                            ? `${category.color} text-white shadow-lg` 
                            : "hover:shadow-md"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>

          {/* Feedback List */}
          <div className="grid gap-6">
            {filteredFeedbacks.map((feedback, index) => {
              const StatusIcon = statusConfig[feedback.status].icon;
              return (
                <Card 
                  key={feedback.id} 
                  className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
                          {feedback.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 group-hover:text-purple-600 transition-colors duration-300">
                            {feedback.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {feedback.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(feedback.date).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {feedback.category}
                            </Badge>
                          </div>
                          <p className="text-gray-700 line-clamp-2">{feedback.content}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={`${statusConfig[feedback.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[feedback.status].label}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {feedback.likes} likes
                        </div>
                        <div className="flex items-center gap-1">
                          <Reply className="h-4 w-4" />
                          {feedback.replies} replies
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`${
                            feedback.priority === 'high' ? 'border-red-300 text-red-600' :
                            feedback.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-green-300 text-green-600'
                          } capitalize`}
                        >
                          {feedback.priority} priority
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-50 hover:text-purple-600"
                      >
                        View Details →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredFeedbacks.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No feedback found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Feedback Analytics Dashboard
              </CardTitle>
              <CardDescription>Insights into community engagement and feedback trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
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

const FeedbackDetailView = ({ feedback, onBack, userRole }: {
  feedback: Feedback;
  onBack: () => void;
  userRole: "admin" | "public" | null;
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6 hover:scale-105 transition-all duration-300"
      >
        ← Back to Feedback
      </Button>
      
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl">
                {feedback.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl mb-3">{feedback.title}</CardTitle>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {feedback.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                  <Badge variant="secondary">{feedback.category}</Badge>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-gray-600">({feedback.rating}/5)</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-700">{feedback.content}</p>
          </div>
          
          <div className="flex items-center gap-4 pt-6 border-t">
            <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
              <ThumbsUp className="h-4 w-4" />
              Like ({feedback.likes})
            </Button>
            <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
              <Reply className="h-4 w-4" />
              Reply ({feedback.replies})
            </Button>
            {userRole === "admin" && (
              <div className="flex gap-2 ml-auto">
                <Button variant="outline" className="hover:bg-green-50 hover:text-green-600">
                  Mark as Implemented
                </Button>
                <Button variant="outline" className="hover:bg-yellow-50 hover:text-yellow-600">
                  Update Status
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FeedbackForm = ({ onSave, onCancel }: {
  onSave: () => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    rating: 5
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <Plus className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Submit Feedback</h1>
            <p className="text-gray-600">Share your thoughts and suggestions with us</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">Feedback Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Brief title for your feedback"
                  className="h-12 text-lg border-2 focus:border-purple-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-purple-500 transition-all duration-300"
                >
                  <option value="General">General</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Youth">Youth</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Your Feedback</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Please provide detailed feedback or suggestions..."
                rows={8}
                className="text-lg border-2 focus:border-purple-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({...formData, rating: star})}
                    className="transition-all duration-300 hover:scale-110"
                  >
                    <Star 
                      className={`h-8 w-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-600">({formData.rating}/5)</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Submit Feedback
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

export default FeedbackSection;
