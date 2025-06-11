
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Issue } from "@/types/issue";

interface IssueStatsProps {
  issues: Issue[];
}

const IssueStats = ({ issues }: IssueStatsProps) => {
  const stats = {
    total: issues.length,
    resolved: issues.filter(i => i.status === "resolved").length,
    inProgress: issues.filter(i => i.status === "in-progress").length,
    urgent: issues.filter(i => i.priority === "urgent").length
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-1">{stats.total}</div>
          <div className="text-gray-600 font-medium">Total Issues</div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-1">{stats.resolved}</div>
          <div className="text-gray-600 font-medium">Resolved</div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
            <Clock className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-1">{stats.inProgress}</div>
          <div className="text-gray-600 font-medium">In Progress</div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="text-3xl font-bold text-red-600 mb-1">{stats.urgent}</div>
          <div className="text-gray-600 font-medium">Urgent</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueStats;
