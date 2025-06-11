
export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  reporter: string;
  date: string;
  status: "reported" | "investigating" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  images?: string[];
  assignedTo?: string;
  estimatedCompletion?: string;
}

export interface IssueReportingProps {
  userRole: "admin" | "public" | null;
}
