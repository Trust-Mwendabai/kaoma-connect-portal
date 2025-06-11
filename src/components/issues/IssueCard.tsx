
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Camera, Eye } from "lucide-react";
import { Issue } from "@/types/issue";
import { statusConfig, priorityConfig } from "@/config/issueConfig";

interface IssueCardProps {
  issue: Issue;
  index: number;
  onSelect: (issue: Issue) => void;
  userRole: "admin" | "public" | null;
}

const IssueCard = ({ issue, index, onSelect, userRole }: IssueCardProps) => {
  const StatusIcon = statusConfig[issue.status].icon;

  return (
    <Card 
      className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50 cursor-pointer animate-scale-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onSelect(issue)}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg">
              {issue.id.slice(-2)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
                {issue.title}
              </h3>
              <p className="text-gray-700 mb-3 line-clamp-2">{issue.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {issue.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {issue.reporter}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(issue.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2">
              <Badge className={`${statusConfig[issue.status].color} text-white border-0 px-3 py-1 font-semibold flex items-center gap-1`}>
                <StatusIcon className="h-3 w-3" />
                {statusConfig[issue.status].label}
              </Badge>
              <Badge className={`${priorityConfig[issue.priority].color} text-white border-0 px-3 py-1 font-semibold`}>
                {priorityConfig[issue.priority].label}
              </Badge>
            </div>
            {issue.images && issue.images.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Camera className="h-3 w-3" />
                {issue.images.length} photo{issue.images.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
          <div>
            <p className="text-sm font-medium text-gray-500">Category</p>
            <p className="font-semibold text-gray-800">{issue.category}</p>
          </div>
          {issue.assignedTo && (
            <div>
              <p className="text-sm font-medium text-gray-500">Assigned To</p>
              <p className="font-semibold text-gray-800">{issue.assignedTo}</p>
            </div>
          )}
          {issue.estimatedCompletion && (
            <div>
              <p className="text-sm font-medium text-gray-500">Est. Completion</p>
              <p className="font-semibold text-gray-800">{new Date(issue.estimatedCompletion).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-orange-50 hover:text-orange-600"
          >
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          {userRole === "admin" && (
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                Update Status
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                Assign
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
