import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Eye, Search, Star, TrendingUp, Users, Filter } from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  views: number;
  featured: boolean;
  image?: string;
  tags: string[];
  priority: "low" | "medium" | "high" | "urgent";
}

interface NewsSectionProps {
  userRole: "admin" | "public" | null;
}

const NewsSection = ({ userRole }: NewsSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: "NEWS001",
      title: "New Water Project Launched in Mayukwayukwa Village",
      excerpt: "A comprehensive water supply project has been initiated to provide clean water access to over 500 families in Mayukwayukwa village.",
      content: "The Kaoma Constituency Development Committee, in partnership with the Ministry of Water Development, has officially launched a K2.5 million water supply project in Mayukwayukwa village. This ambitious project aims to provide sustainable clean water access to over 500 families in the area. The project includes the construction of three boreholes, installation of solar-powered pumps, and the establishment of water distribution points throughout the village. Local community members have been trained in maintenance and management of the water systems to ensure long-term sustainability. This initiative is part of our broader commitment to improving basic service delivery in rural areas of Kaoma constituency.",
      author: "Hon. Kaoma MP",
      date: "2024-01-18",
      category: "Development",
      readTime: 5,
      views: 1247,
      featured: true,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      tags: ["water", "development", "community", "infrastructure"],
      priority: "high"
    },
    {
      id: "NEWS002",
      title: "Education Bursary Program Opens Applications",
      excerpt: "The 2024 education bursary program is now accepting applications from deserving students across all education levels.",
      content: "We are pleased to announce that applications for the 2024 Education Bursary Program are now open. This program provides financial assistance to deserving students from Kaoma constituency who demonstrate academic excellence and financial need. This year, we have allocated K500,000 to support students at primary, secondary, and tertiary levels. Primary school students can receive up to K1,000 annually, secondary students up to K5,000, and university students up to K20,000. The application process has been simplified and is available both online and at our constituency office. Deadline for applications is February 28, 2024.",
      author: "Education Committee",
      date: "2024-01-15",
      category: "Education",
      readTime: 3,
      views: 892,
      featured: true,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
      tags: ["education", "bursary", "students", "funding"],
      priority: "urgent"
    },
    {
      id: "NEWS003",
      title: "Road Infrastructure Improvements in Progress",
      excerpt: "Major road rehabilitation works have commenced on the Kaoma-Lukulu road, improving connectivity for rural communities.",
      content: "The Roads Development Agency, with support from the constituency development fund, has begun major rehabilitation works on the Kaoma-Lukulu road corridor. This K3.2 million project will improve a 15-kilometer stretch of road that serves as a vital link for rural communities accessing markets, health facilities, and schools. The project includes grading, culvert construction, and the installation of proper drainage systems. Local contractors have been engaged to ensure community participation and skills development. The work is expected to be completed by March 2024, just before the onset of the rainy season.",
      author: "Development Committee",
      date: "2024-01-12",
      category: "Infrastructure",
      readTime: 4,
      views: 634,
      featured: false,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
      tags: ["roads", "infrastructure", "transport", "development"],
      priority: "medium"
    },
    {
      id: "NEWS004",
      title: "Community Health Outreach Program Success",
      excerpt: "Recent mobile clinic visits have reached over 1,000 residents, providing essential healthcare services to remote areas.",
      content: "Our quarterly mobile health clinic program has achieved remarkable success, reaching over 1,000 residents in remote areas of Kaoma constituency. The program, conducted in partnership with the District Health Office, provided immunizations, maternal health services, and treatment for common ailments. Five villages were covered during the recent outreach: Nkeyema, Mundongo, Sikongo, Lukulu West, and Masheke. The program also included health education sessions on malaria prevention, nutrition, and family planning. Plans are underway to expand the program to reach even more remote communities in the coming quarter.",
      author: "Health Committee",
      date: "2024-01-10",
      category: "Health",
      readTime: 4,
      views: 756,
      featured: false,
      tags: ["health", "community", "outreach", "healthcare"],
      priority: "medium"
    },
    {
      id: "NEWS005",
      title: "Youth Skills Development Program Launched",
      excerpt: "A new skills training initiative will equip 200 young people with vocational skills in carpentry, tailoring, and agriculture.",
      content: "The Kaoma Youth Skills Development Program has been officially launched, offering vocational training opportunities to 200 young people aged 16-30. The program focuses on three key areas: carpentry and construction, tailoring and fashion design, and modern agricultural techniques. Each course runs for six months and includes both theoretical learning and hands-on practical experience. Participants will receive starter toolkits upon completion and will be connected with local businesses for employment opportunities. The program is funded through the Constituency Development Fund and partnerships with local NGOs.",
      author: "Youth Development Officer",
      date: "2024-01-08",
      category: "Youth",
      readTime: 3,
      views: 523,
      featured: false,
      tags: ["youth", "skills", "training", "employment"],
      priority: "high"
    }
  ]);

  const categories = [
    { name: "all", icon: TrendingUp, color: "bg-gray-500" },
    { name: "Development", icon: TrendingUp, color: "bg-blue-500" },
    { name: "Education", icon: Star, color: "bg-green-500" },
    { name: "Infrastructure", icon: TrendingUp, color: "bg-orange-500" },
    { name: "Health", icon: Users, color: "bg-red-500" },
    { name: "Youth", icon: Users, color: "bg-purple-500" },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const stats = {
    total: articles.length,
    featured: featuredArticles.length,
    totalViews: articles.reduce((sum, article) => sum + article.views, 0),
    avgReadTime: Math.round(articles.reduce((sum, article) => sum + article.readTime, 0) / articles.length)
  };

  if (selectedArticle) {
    return <ArticleDetailView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-8 text-white">
        <div 
          className="absolute inset-0 opacity-30" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">News & Updates</h1>
              <p className="text-green-100 text-lg">Stay informed with the latest developments and announcements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
            <div className="text-gray-600 font-medium">Total Articles</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Star className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.featured}</div>
            <div className="text-gray-600 font-medium">Featured</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Eye className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.totalViews.toLocaleString()}</div>
            <div className="text-gray-600 font-medium">Total Views</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-1">{stats.avgReadTime}min</div>
            <div className="text-gray-600 font-medium">Avg Read Time</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-news" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1">
          <TabsTrigger value="all-news" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            All News
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2 text-sm font-medium">
            <Star className="h-4 w-4" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-news" className="space-y-6">
          {/* Enhanced Search and Filters */}
          <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search news by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 focus:border-green-500 transition-all duration-300"
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

          {/* News Articles Grid */}
          <div className="grid gap-6">
            {filteredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="md:flex">
                  {article.image && (
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.featured && (
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-white border-0 px-3 py-1 font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                      <Badge 
                        className={`absolute top-4 right-4 border-0 px-3 py-1 font-semibold ${
                          article.priority === 'urgent' ? 'bg-red-500' :
                          article.priority === 'high' ? 'bg-orange-500' :
                          article.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } text-white`}
                      >
                        {article.priority}
                      </Badge>
                    </div>
                  )}
                  <div className={`flex-1 ${article.image ? 'md:w-2/3' : 'w-full'}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime} min read
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views.toLocaleString()} views
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {article.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-50 hover:text-green-600"
                      >
                        Read More →
                      </Button>
                    </CardContent>
                  </div>
                </div>
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
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid gap-6">
            {featuredArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="md:flex">
                  {article.image && (
                    <div className="md:w-1/3 relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.featured && (
                        <Badge className="absolute top-4 left-4 bg-yellow-500 text-white border-0 px-3 py-1 font-semibold flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                       <Badge 
                        className={`absolute top-4 right-4 border-0 px-3 py-1 font-semibold ${
                          article.priority === 'urgent' ? 'bg-red-500' :
                          article.priority === 'high' ? 'bg-orange-500' :
                          article.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        } text-white`}
                      >
                        {article.priority}
                      </Badge>
                    </div>
                  )}
                  <div className={`flex-1 ${article.image ? 'md:w-2/3' : 'w-full'}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                            {article.title}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {article.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {article.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-gray-500 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.readTime} min read
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views.toLocaleString()} views
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {article.tags.slice(0, 3).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-50 hover:text-green-600"
                      >
                        Read More →
                      </Button>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(cat => cat.name !== "all").map((category) => {
              const categoryArticles = articles.filter(article => article.category === category.name);
              const IconComponent = category.icon;
              return (
                <Card key={category.name} className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 ${category.color} text-white rounded-xl flex items-center justify-center`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{categoryArticles.length} articles</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setSelectedCategory(category.name)}
                    className="w-full hover:bg-gray-50"
                  >
                    View Articles →
                  </Button>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ArticleDetailView = ({ article, onBack }: {
  article: NewsArticle;
  onBack: () => void;
}) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6 hover:scale-105 transition-all duration-300"
      >
        ← Back to News
      </Button>
      
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        {article.image && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            {article.featured && (
              <Badge className="absolute top-6 left-6 bg-yellow-500 text-white border-0 px-4 py-2 font-semibold flex items-center gap-2">
                <Star className="h-4 w-4" />
                Featured Article
              </Badge>
            )}
          </div>
        )}
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl mb-3">{article.title}</CardTitle>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(article.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {article.views.toLocaleString()} views
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="px-3 py-1">{article.category}</Badge>
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="px-2 py-1 text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">{article.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsSection;
