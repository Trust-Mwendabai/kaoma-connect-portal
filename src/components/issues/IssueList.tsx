
import { Search } from "lucide-react";
import { Issue } from "@/types/issue";
import IssueCard from "./IssueCard";

interface IssueListProps {
  issues: Issue[];
  onIssueSelect: (issue: Issue) => void;
  userRole: "admin" | "public" | null;
}

const IssueList = ({ issues, onIssueSelect, userRole }: IssueListProps) => {
  if (issues.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No issues found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {issues.map((issue, index) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          index={index}
          onSelect={onIssueSelect}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default IssueList;
