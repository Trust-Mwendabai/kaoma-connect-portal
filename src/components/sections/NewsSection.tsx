
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Search, Plus, Edit, Trash2, Eye } from "lucide-react";

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  status: "published" | "draft";
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
      status: "published"
    },
    {
      id: 2,
      title: "Bursary Applications Now Open for 2024",
      excerpt: "Students can now apply for educational bursaries through our digital portal. Applications close on March 31st.",
      content: "The Kaoma Constituency office is pleased to announce that bursary applications for the 2024 academic year are now open. Eligible students can apply through our digital portal. Priority will be given to students from disadvantaged backgrounds and those pursuing critical skills areas. The application deadline is March 31st, 2024.",
      category: "Education",
      date: "2024-01-10",
      author: "Education Officer",
      status: "published"
    },
    {
      id: 3,
      title: "Road Rehabilitation Project Update",
      excerpt: "Progress update on the Kaoma-Lukulu road rehabilitation project showing 60% completion.",
      content: "The Kaoma-Lukulu road rehabilitation project has reached 60% completion. The 45-kilometer stretch is being upgraded to bitumen standard and is expected to be completed by June 2024. This project will significantly improve transportation and trade in the region.",
      category: "Infrastructure",
      date: "2024-01-08",
      author: "Infrastructure Team",
      status: "published"
    },
    {
      id: 4,
      title: "Community Health Outreach Program",
      excerpt: "Mobile health clinic to visit rural areas next week providing free medical services.",
      content: "A mobile health clinic will visit rural areas of Kaoma Constituency next week, providing free medical services including vaccinations, health screenings, and basic treatments. The outreach program is a collaboration between the MP's office and the Ministry of Health.",
      category: "Health",
      date: "2024-01-05",
      author: "Health Team",
      status: "published"
    }
  ]);

  const categories = ["all", "Development", "Education", "Infrastructure", "Health", "Agriculture"];

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
      status: "published"
    };
    setArticles([newArticle, ...articles]);
    setIsCreating(false);
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => setSelectedArticle(null)}
          className="mb-6"
        >
          ← Back to News
        </Button>
        
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary">{selectedArticle.category}</Badge>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(selectedArticle.date).toLocaleDateString()}
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">{selectedArticle.title}</CardTitle>
            <p className="text-gray-600">By {selectedArticle.author}</p>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{selectedArticle.content}</p>
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
          <p className="text-gray-600 mt-2">Stay informed about constituency developments and announcements</p>
        </div>
        {userRole === "admin" && (
          <Button onClick={() => setIsCreating(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Article
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {article.category}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-gray-600 leading-relaxed">
                {article.excerpt}
              </CardDescription>
              <div className="flex items-center justify-between">
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-blue-600"
                  onClick={() => setSelectedArticle(article)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Read more
                </Button>
                {userRole === "admin" && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
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
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found matching your criteria.</p>
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
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create New Article</h1>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter article title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded-md"
              >
                <option value="General">General</option>
                <option value="Development">Development</option>
                <option value="Education">Education</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Health">Health</option>
                <option value="Agriculture">Agriculture</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <Textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                placeholder="Brief summary of the article"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Full article content"
                rows={10}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Publish Article
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
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
