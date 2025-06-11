
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, MapPin, TrendingUp } from "lucide-react";
import { Issue, IssueReportingProps } from "@/types/issue";
import { mockIssues } from "@/data/mockIssues";
import IssueHeader from "@/components/issues/IssueHeader";
import IssueStats from "@/components/issues/IssueStats";
import IssueFilters from "@/components/issues/IssueFilters";
import IssueList from "@/components/issues/IssueList";
import IssueDetailView from "@/components/issues/IssueDetailView";
import IssueReportForm from "@/components/issues/IssueReportForm";

const IssueReporting = ({ userRole }: IssueReportingProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isReporting, setIsReporting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [issues, setIssues] = useState<Issue[]>(mockIssues);

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || issue.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  if (selectedIssue) {
    return <IssueDetailView issue={selectedIssue} onBack={() => setSelectedIssue(null)} userRole={userRole} />;
  }

  if (isReporting) {
    return <IssueReportForm onSave={() => setIsReporting(false)} onCancel={() => setIsReporting(false)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <IssueHeader onReportClick={() => setIsReporting(true)} />
      
      <IssueStats issues={issues} />

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-gray-100 p-1">
          <TabsTrigger value="issues" className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            Reported Issues
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-4 w-4" />
            Issue Map
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="space-y-6">
          <IssueFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <IssueList
            issues={filteredIssues}
            onIssueSelect={setSelectedIssue}
            userRole={userRole}
          />
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Issue Map
              </CardTitle>
              <CardDescription>Visual representation of reported issues across the constituency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Map integration would show issue locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="p-6 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Issue Analytics Dashboard
              </CardTitle>
              <CardDescription>Insights into issue reporting trends and resolution rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Analytics Coming Soon</h3>
                <p className="text-gray-500">Detailed charts and insights will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IssueReporting;
