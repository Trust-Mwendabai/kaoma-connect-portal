
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Search, Plus, Edit, Trash2, Eye, BookOpen, TrendingUp, Clock, Filter, Star, Share2, Heart, MessageSquare as MessageIcon } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  status: "published" | "draft";
  readTime?: number;
  likes?: number;
  shares?: number;
  image?: string;
}

interface NewsSectionProps {
  userRole: "admin" | "public" | null;
}

const NewsSection = ({ userRole }: NewsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: 1,
      title: "New Borehole Project Launched in Kaoma Central",
      excerpt: "MP announces the commencement of a new borehole drilling project to improve water access in Kaoma Central ward.",
      content: "The Member of Parliament for Kaoma Constituency has officially launched a new borehole drilling project in Kaoma Central ward. This initiative aims to improve water access for over 500 households in the area. The project, funded through the Constituency Development Fund (CDF), is expected to be completed within the next three months. Local contractors have been engaged to ensure community participation and skills transfer.",
      category: "Development",
      date: "2024-01-15",
      author: "MP Office",
      status: "published",
      readTime: 3,
      likes: 45,
      shares: 12,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Bursary Applications Now Open for 2024",
      excerpt: "Students can now apply for educational bursaries through our digital portal. Applications close on March 31st.",
      content: "The Kaoma Constituency office is pleased to announce that bursary applications for the 2024 academic year are now open. Eligible students can apply through our digital portal. Priority will be given to students from disadvantaged backgrounds and those pursuing critical skills areas. The application deadline is March 31st, 2024.",
      category: "Education",
      date: "2024-01-10",
      author: "Education Officer",
      status: "published",
      readTime: 2,
      likes: 78,
      shares: 25,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Road Rehabilitation Project Update",
      excerpt: "Progress update on the Kaoma-Lukulu road rehabilitation project showing 60% completion.",
      content: "The Kaoma-Lukulu road rehabilitation project has reached 60% completion. The 45-kilometer stretch is being upgraded to bitumen standard and is expected to be completed by June 2024. This project will significantly improve transportation and trade in the region.",
      category: "Infrastructure",
      date: "2024-01-08",
      author: "Infrastructure Team",
      status: "published",
      readTime: 4,
      likes: 56,
      shares: 18,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Community Health Outreach Program",
      excerpt: "Mobile health clinic to visit rural areas next week providing free medical services.",
      content: "A mobile health clinic will visit rural areas of Kaoma Constituency next week, providing free medical services including vaccinations, health screenings, and basic treatments. The outreach program is a collaboration between the MP's office and the Ministry of Health.",
      category: "Health",
      date: "2024-01-05",
      author: "Health Team",
      status: "published",
      readTime: 3,
      likes: 92,
      shares: 34,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=300&fit=crop"
    }
  ]);

  const categories = [
    { name: "all", icon: BookOpen, color: "bg-gray-500" },
    { name: "Development", icon: TrendingUp, color: "bg-blue-500" },
    { name: "Education", icon: BookOpen, color: "bg-green-500" },
    { name: "Infrastructure", icon: Calendar, color: "bg-orange-500" },
    { name: "Health", icon: Heart, color: "bg-red-500" },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateArticle = (articleData: Partial<NewsArticle>) => {
    const newArticle: NewsArticle = {
      id: Date.now(),
      title: articleData.title || "",
      content: articleData.content || "",
      excerpt: articleData.excerpt || "",
      category: articleData.category || "General",
      date: new Date().toISOString().split('T')[0],
      author: "Admin",
      status: "published",
      readTime: 3,
      likes: 0,
      shares: 0
    };
    setArticles([newArticle, ...articles]);
    setIsCreating(false);
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto animate-fade-in">
        <Button 
          variant="outline" 
          onClick={() => setSelectedArticle(null)}
          className="mb-6 hover:scale-105 transition-all duration-300"
        >
          ← Back to News
        </Button>
        
        <Card className="shadow-2xl overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50">
          {selectedArticle.image && (
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Badge variant="secondary" className="text-sm font-semibold bg-white/20 backdrop-blur-sm text-white border-white/30">
                  {selectedArticle.category}
                </Badge>
              </div>
            </div>
          )}
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedArticle.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedArticle.readTime} min read
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {selectedArticle.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    {selectedArticle.shares}
                  </div>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl mb-2 leading-tight">{selectedArticle.title}</CardTitle>
            <p className="text-gray-600 font-medium">By {selectedArticle.author}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap text-gray-700">{selectedArticle.content}</p>
            </div>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t">
              <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <Heart className="h-4 w-4" />
                Like ({selectedArticle.likes})
              </Button>
              <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
                <MessageIcon className="h-4 w-4" />
                Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCreating && userRole === "admin") {
    return <CreateArticleForm onSave={handleCreateArticle} onCancel={() => setIsCreating(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">News & Updates</h1>
              <p className="text-blue-100 text-lg">Stay informed about constituency developments</p>
            </div>
          </div>
          {userRole === "admin" && (
            <Button 
              onClick={() => setIsCreating(true)} 
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced Filters */}
      <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search articles, keywords, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
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

      {/* Enhanced Articles Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredArticles.map((article, index) => (
          <Card 
            key={article.id} 
            className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-gray-50 cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {article.image && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-800 border-0"
                  >
                    {article.category}
                  </Badge>
                </div>
                {article.readTime && (
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </div>
                )}
              </div>
            )}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500 text-sm gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {article.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" />
                    {article.shares}
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors duration-300">
                {article.title}
              </CardTitle>
              <p className="text-sm text-gray-500 font-medium">By {article.author}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-gray-600 leading-relaxed">
                {article.excerpt}
              </CardDescription>
              <div className="flex items-center justify-between">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600 hover:text-blue-800 font-semibold group-hover:translate-x-1 transition-all duration-300"
                  onClick={() => setSelectedArticle(article)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Read more →
                </Button>
                {userRole === "admin" && (
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

const CreateArticleForm = ({ onSave, onCancel }: {
  onSave: (article: Partial<NewsArticle>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "General"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Plus className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create New Article</h1>
            <p className="text-gray-600">Share important updates with the community</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-3">Article Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter compelling article title"
                  className="h-12 text-lg border-2 focus:border-blue-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full h-12 p-3 border-2 rounded-md text-lg focus:border-blue-500 transition-all duration-300"
                >
                  <option value="General">General</option>
                  <option value="Development">Development</option>
                  <option value="Education">Education</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Health">Health</option>
                  <option value="Agriculture">Agriculture</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Article Summary</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Brief summary that will appear in the article preview"
                rows={3}
                className="text-lg border-2 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Full Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Write the complete article content here..."
                rows={12}
                className="text-lg border-2 focus:border-blue-500 transition-all duration-300"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 h-12 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Publish Article
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

export default NewsSection;
