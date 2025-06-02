
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, MapPin, Calendar, DollarSign, User, Plus } from "lucide-react";

interface ProjectTrackerProps {
  userRole: "admin" | "public" | null;
}

const ProjectTracker = ({ userRole }: ProjectTrackerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const projects = [
    {
      id: "PROJ001",
      name: "Kaoma District Hospital Upgrade",
      location: "Kaoma Central",
      status: "ongoing",
      progress: 75,
      budget: "K2,500,000",
      contractor: "ZamBuild Construction",
      description: "Expansion of maternity ward and installation of modern medical equipment",
      startDate: "2024-01-15",
      expectedCompletion: "2024-08-30"
    },
    {
      id: "PROJ002", 
      name: "Rural Road Network Improvement",
      location: "Kaoma-Lukulu Road",
      status: "ongoing",
      progress: 45,
      budget: "K5,200,000",
      contractor: "Roads & Infrastructure Ltd",
      description: "Rehabilitation of 50km rural road connecting remote communities",
      startDate: "2023-11-01",
      expectedCompletion: "2024-12-15"
    },
    {
      id: "PROJ003",
      name: "Community Borehole Installation",
      location: "Mayukwayukwa Village",
      status: "completed",
      progress: 100,
      budget: "K180,000",
      contractor: "Water Solutions Zambia",
      description: "Installation of solar-powered borehole system serving 500 households",
      startDate: "2023-08-01",
      expectedCompletion: "2023-10-30"
    },
    {
      id: "PROJ004",
      name: "Primary School Construction",
      location: "Nkoya Ward",
      status: "planning",
      progress: 15,
      budget: "K1,800,000",
      contractor: "Educational Builders",
      description: "Construction of new 6-classroom primary school with teacher housing",
      startDate: "2024-03-01",
      expectedCompletion: "2025-02-28"
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: "Planning", variant: "secondary" as const },
      ongoing: { label: "Ongoing", variant: "default" as const },
      completed: { label: "Completed", variant: "default" as const },
      paused: { label: "Paused", variant: "destructive" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.planning;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: "bg-gray-500",
      ongoing: "bg-blue-500", 
      completed: "bg-green-500",
      paused: "bg-red-500"
    };
    return colors[status as keyof typeof colors] || colors.planning;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Development Projects</h1>
          <p className="text-gray-600">Track constituency development initiatives and their progress</p>
        </div>
        {userRole === "admin" && (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search projects by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-md"
        />
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Project List</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {project.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </CardDescription>
                    </div>
                    <Badge {...getStatusBadge(project.status)}>
                      {getStatusBadge(project.status).label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Budget</p>
                          <p className="font-medium">{project.budget}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Contractor</p>
                          <p className="font-medium">{project.contractor}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Start Date</p>
                          <p className="font-medium">{project.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-gray-600">Expected Completion</p>
                          <p className="font-medium">{project.expectedCompletion}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm">View Photos</Button>
                      {userRole === "admin" && (
                        <Button variant="outline" size="sm">Update Progress</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Locations</CardTitle>
              <CardDescription>Interactive map showing all constituency projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
                  <p className="text-gray-600">Map integration would show project locations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                  <div className="text-sm text-gray-600">Total Projects</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {projects.filter(p => p.status === "completed").length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {projects.filter(p => p.status === "ongoing").length}
                  </div>
                  <div className="text-sm text-gray-600">Ongoing</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    K{projects.reduce((sum, p) => sum + parseInt(p.budget.replace(/[K,]/g, "")), 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Investment</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["planning", "ongoing", "completed", "paused"].map((status) => {
                  const count = projects.filter(p => p.status === status).length;
                  const percentage = (count / projects.length) * 100;
                  return (
                    <div key={status}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium capitalize">{status}</span>
                        <span className="text-sm text-gray-600">{count} projects</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTracker;
