
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '../components/Navigation';
import { 
  Users, 
  Building2, 
  Briefcase, 
  UserCheck, 
  Clock, 
  CheckCircle, 
  XCircle,
  Shield,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { isGuest } = useAuth();

  const stats = [
    { title: 'Total Students', value: '1,245', icon: Users, color: 'text-blue-600' },
    { title: 'Registered Companies', value: '89', icon: Building2, color: 'text-green-600' },
    { title: 'Active Jobs', value: '156', icon: Briefcase, color: 'text-purple-600' },
    { title: 'Pending Approvals', value: '12', icon: Clock, color: 'text-orange-600' },
  ];

  const pendingApprovals = [
    { name: 'TechVision Inc.', type: 'Company Registration', submitted: '2 days ago', industry: 'Software' },
    { name: 'DataCorp Solutions', type: 'Company Registration', submitted: '1 week ago', industry: 'Analytics' },
    { name: 'InnovateLabs', type: 'Company Registration', submitted: '3 days ago', industry: 'AI/ML' },
    { name: 'CloudTech Systems', type: 'Company Registration', submitted: '5 days ago', industry: 'Cloud Services' },
  ];

  const recentActivities = [
    { action: 'Company approved', details: 'Microsoft India approved for job posting', time: '1 hour ago' },
    { action: 'Job posted', details: 'Senior Developer position by Google', time: '3 hours ago' },
    { action: 'Student registered', details: 'New student John Doe joined', time: '5 hours ago' },
    { action: 'Company rejected', details: 'Spam company registration rejected', time: '1 day ago' },
  ];

  const systemMetrics = [
    { label: 'Job Applications Today', value: '47', trend: '+12%' },
    { label: 'New Registrations', value: '23', trend: '+8%' },
    { label: 'Course Completions', value: '156', trend: '+15%' },
    { label: 'Mock Tests Taken', value: '89', trend: '+22%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">System overview and management controls.</p>
              {isGuest && (
                <Badge variant="outline" className="mt-2">
                  Viewing in Guest Mode - Limited functionality
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(({ title, value, icon: Icon, color }) => (
            <Card key={title}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Icon className={`h-8 w-8 ${color}`} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Registration Approvals</CardTitle>
                <CardDescription>Review and approve company registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((approval, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{approval.name}</h3>
                        <p className="text-sm text-gray-500">
                          {approval.industry} • Submitted {approval.submitted}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="outline">
                          Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Management</CardTitle>
                <CardDescription>Manage registered companies and their job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Microsoft India', 'Google', 'Amazon', 'TCS', 'Infosys'].map((company, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{company}</h3>
                        <p className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 20) + 5} active jobs • 
                          {Math.floor(Math.random() * 500) + 100} applications
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>View and manage student accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['John Doe', 'Sarah Smith', 'Mike Johnson', 'Emily Brown', 'David Wilson'].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{student}</h3>
                        <p className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 10) + 1} applications • 
                          {Math.floor(Math.random() * 15) + 3} courses completed
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {metric.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest system activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.details}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
