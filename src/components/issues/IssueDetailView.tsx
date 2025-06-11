
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Calendar, Eye } from "lucide-react";
import { Issue } from "@/types/issue";
import { statusConfig, priorityConfig } from "@/config/issueConfig";

interface IssueDetailViewProps {
  issue: Issue;
  onBack: () => void;
  userRole: "admin" | "public" | null;
}

const IssueDetailView = ({ issue, onBack, userRole }: IssueDetailViewProps) => {
  const StatusIcon = statusConfig[issue.status].icon;
  
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button 
        variant="outline" 
        onClick={onBack}
        className="mb-6 hover:scale-105 transition-all duration-300"
      >
        ← Back to Issues
      </Button>
      
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        {issue.images && issue.images.length > 0 && (
          <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
            <img 
              src={issue.images[0]} 
              alt={issue.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 flex gap-2">
              <Badge className={`${statusConfig[issue.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {statusConfig[issue.status].label}
              </Badge>
              <Badge className={`${priorityConfig[issue.priority].color} text-white border-0 px-3 py-1 font-semibold`}>
                {priorityConfig[issue.priority].label} Priority
              </Badge>
            </div>
          </div>
        )}
        <CardHeader className="pb-6">
          <CardTitle className="text-3xl mb-3">{issue.title}</CardTitle>
          <div className="flex items-center gap-4 text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {issue.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              Reported by {issue.reporter}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(issue.date).toLocaleDateString()}
            </span>
          </div>
          <Badge variant="secondary" className="w-fit">{issue.category}</Badge>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none mb-8">
            <p className="text-lg leading-relaxed text-gray-700">{issue.description}</p>
          </div>
          
          {(issue.assignedTo || issue.estimatedCompletion) && (
            <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg mb-6">
              {issue.assignedTo && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Assigned To</p>
                  <p className="font-semibold text-gray-800">{issue.assignedTo}</p>
                </div>
              )}
              {issue.estimatedCompletion && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Estimated Completion</p>
                  <p className="font-semibold text-gray-800">{new Date(issue.estimatedCompletion).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center gap-4 pt-6 border-t">
            <Button variant="outline" className="flex items-center gap-2 hover:scale-105 transition-all duration-300">
              <Eye className="h-4 w-4" />
              Track Updates
            </Button>
            {userRole === "admin" && (
              <div className="flex gap-2 ml-auto">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Update Status
                </Button>
                <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-600">
                  Assign Team
                </Button>
                <Button variant="outline" className="hover:bg-orange-50 hover:text-orange-600">
                  Add Comment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailView;
