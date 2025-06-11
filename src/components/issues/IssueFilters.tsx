
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { statusConfig } from "@/config/issueConfig";

interface IssueFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const IssueFilters = ({ searchTerm, onSearchChange, selectedStatus, onStatusChange }: IssueFiltersProps) => {
  return (
    <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-white to-gray-50">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search issues by title, location, or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 h-12 text-lg border-2 focus:border-orange-500 transition-all duration-300"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <div className="flex gap-2 flex-wrap">
            {["all", "reported", "investigating", "in-progress", "resolved"].map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange(status)}
                className={`capitalize transition-all duration-300 hover:scale-105 ${
                  selectedStatus === status ? "bg-orange-500 text-white shadow-lg" : "hover:shadow-md"
                }`}
              >
                {status === "all" ? "All Status" : statusConfig[status as keyof typeof statusConfig]?.label || status}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IssueFilters;
