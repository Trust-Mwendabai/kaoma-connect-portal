
import { Button } from "@/components/ui/button";
import { AlertTriangle, Plus } from "lucide-react";

interface IssueHeaderProps {
  onReportClick: () => void;
}

const IssueHeader = ({ onReportClick }: IssueHeaderProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-3xl p-8 text-white">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Issue Reporting</h1>
            <p className="text-orange-100 text-lg">Report and track community issues for resolution</p>
          </div>
        </div>
        <Button 
          onClick={onReportClick} 
          className="bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="h-4 w-4 mr-2" />
          Report Issue
        </Button>
      </div>
    </div>
  );
};

export default IssueHeader;
