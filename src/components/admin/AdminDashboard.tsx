
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Activity,
  Shield,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  PieChart,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  const dashboardStats = [
    {
      title: "Total Users",
      value: "1,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "Active Applications",
      value: "234",
      change: "+8.2%",
      trend: "up", 
      icon: FileText,
      color: "green"
    },
    {
      title: "Pending Reviews",
      value: "67",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
      color: "orange"
    },
    {
      title: "System Health",
      value: "99.2%",
      change: "+0.1%",
      trend: "up",
      icon: Activity,
      color: "purple"
    }
  ];

  const recentApplications = [
    {
      id: "BUR001",
      applicant: "John Mukambo",
      type: "Bursary",
      amount: "K15,000",
      status: "pending",
      date: "2024-01-20",
      priority: "high"
    },
    {
      id: "ISS002", 
      applicant: "Mary Sitwala",
      type: "Issue Report",
      amount: "-",
      status: "in_review",
      date: "2024-01-19",
      priority: "medium"
    },
    {
      id: "BUR003",
      applicant: "Peter Mwanza", 
      type: "Bursary",
      amount: "K12,000",
      status: "approved",
      date: "2024-01-18",
      priority: "low"
    }
  ];

  const systemActivities = [
    {
      action: "New bursary application submitted",
      user: "John Mukambo",
      time: "2 minutes ago",
      type: "application"
    },
    {
      action: "Issue report marked as resolved",
      user: "Admin User",
      time: "15 minutes ago", 
      type: "resolution"
    },
    {
      action: "System backup completed",
      user: "System",
      time: "1 hour ago",
      type: "system"
    },
    {
      action: "User feedback received",
      user: "Mary Sitwala",
      time: "2 hours ago",
      type: "feedback"
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      in_review: { label: "In Review", className: "bg-blue-100 text-blue-800" },
      approved: { label: "Approved", className: "bg-green-100 text-green-800" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-800" }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-red-100 text-lg">Kaoma Constituency Digital Service Portal</p>
              </div>
            </div>
            <p className="text-red-100 max-w-2xl">
              Comprehensive management center for monitoring constituency services, applications, and system performance.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{new Date().toLocaleDateString()}</div>
            <div className="text-red-200">Last updated: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-4 bg-${stat.color}-500 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Applications */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Applications
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <div className="font-medium">{app.applicant}</div>
                        <div className="text-sm text-gray-600">{app.type} - {app.id}</div>
                        <div className="text-xs text-gray-500">{app.date}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusBadge(app.status).className}>
                          {getStatusBadge(app.status).label}
                        </Badge>
                        {app.amount !== "-" && (
                          <div className="text-sm font-medium mt-1">{app.amount}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Activity */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'application' ? 'bg-blue-500' :
                        activity.type === 'resolution' ? 'bg-green-500' :
                        activity.type === 'system' ? 'bg-purple-500' :
                        'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">by {activity.user}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Application Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((app) => (
                    <TableRow key={app.id}>
                      <TableCell className="font-medium">{app.id}</TableCell>
                      <TableCell>{app.applicant}</TableCell>
                      <TableCell>{app.type}</TableCell>
                      <TableCell>{app.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(app.status).className}>
                          {getStatusBadge(app.status).label}
                        </Badge>
                      </TableCell>
                      <TableCell>{app.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>User management interface will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Application Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Charts and analytics will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <PieChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Status distribution chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure system parameters and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Application Settings</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Configure Bursary Limits
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Notification Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Approval Workflows
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">System Maintenance</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        Backup Database
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        System Health Check
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        View System Logs
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
