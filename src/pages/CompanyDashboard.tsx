
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '../components/Navigation';
import { Plus, Users, Briefcase, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CompanyDashboard = () => {
  const { isGuest } = useAuth();

  const stats = [
    { title: 'Active Jobs', value: '8', icon: Briefcase, color: 'text-blue-600' },
    { title: 'Total Applications', value: '156', icon: Users, color: 'text-green-600' },
    { title: 'Pending Reviews', value: '23', icon: Clock, color: 'text-orange-600' },
    { title: 'Hired Candidates', value: '12', icon: CheckCircle, color: 'text-purple-600' },
  ];

  const recentApplications = [
    { name: 'John Doe', position: 'Frontend Developer', status: 'pending', time: '2 hours ago' },
    { name: 'Sarah Smith', position: 'Backend Developer', status: 'accepted', time: '4 hours ago' },
    { name: 'Mike Johnson', position: 'Full Stack Developer', status: 'rejected', time: '1 day ago' },
    { name: 'Emily Brown', position: 'UI/UX Designer', status: 'pending', time: '2 days ago' },
  ];

  const activeJobs = [
    { title: 'Senior Frontend Developer', applications: 45, posted: '5 days ago', status: 'active' },
    { title: 'Backend Engineer', applications: 32, posted: '1 week ago', status: 'active' },
    { title: 'DevOps Engineer', applications: 18, posted: '3 days ago', status: 'active' },
    { title: 'Product Manager', applications: 67, posted: '2 weeks ago', status: 'closing' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'closing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your job postings and applications.</p>
              {isGuest && (
                <Badge variant="outline" className="mt-2">
                  Viewing in Guest Mode - Limited functionality
                </Badge>
              )}
            </div>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Job Postings */}
            <Card>
              <CardHeader>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Manage your current job openings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeJobs.map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-500">
                          {job.applications} applications • Posted {job.posted}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Applications
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Company Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Update your company information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <p className="text-gray-900">TechCorp Solutions</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Industry
                      </label>
                      <p className="text-gray-900">Technology</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Description
                    </label>
                    <p className="text-gray-600">
                      Leading technology company specializing in innovative software solutions 
                      for modern businesses.
                    </p>
                  </div>
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentApplications.map((application, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{application.name}</p>
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600">{application.position}</p>
                      <p className="text-xs text-gray-500">{application.time}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          View Resume
                        </Button>
                        {application.status === 'pending' && (
                          <>
                            <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                              Accept
                            </Button>
                            <Button size="sm" variant="destructive" className="text-xs">
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Job
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View All Applications
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Manage Job Postings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
