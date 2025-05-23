
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '../components/Navigation';
import { GeminiService } from '../services/geminiService';
import { 
  Briefcase, 
  BookOpen, 
  FileText, 
  Trophy, 
  Calendar,
  MapPin,
  ExternalLink,
  Download,
  Upload,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const StudentDashboard = () => {
  const { isGuest } = useAuth();
  const [studyPlan, setStudyPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const stats = [
    { title: 'Applications Sent', value: '12', icon: Briefcase, color: 'text-blue-600' },
    { title: 'Courses Completed', value: '8', icon: BookOpen, color: 'text-green-600' },
    { title: 'Mock Tests Taken', value: '15', icon: FileText, color: 'text-purple-600' },
    { title: 'Hackathons Joined', value: '3', icon: Trophy, color: 'text-orange-600' },
  ];

  const recentActivities = [
    { type: 'application', title: 'Applied to Frontend Developer at TechCorp', time: '2 hours ago' },
    { type: 'course', title: 'Completed React Advanced Course', time: '1 day ago' },
    { type: 'test', title: 'Scored 85% in JavaScript Mock Test', time: '2 days ago' },
    { type: 'hackathon', title: 'Registered for AI Innovation Hackathon', time: '3 days ago' },
  ];

  const upcomingEvents = [
    { title: 'Web Development Bootcamp', date: '2024-01-15', location: 'Bangalore', type: 'symposium' },
    { title: 'Google Walk-in Drive', date: '2024-01-18', location: 'Mumbai', type: 'walkin' },
    { title: 'AI/ML Workshop', date: '2024-01-20', location: 'Hyderabad', type: 'symposium' },
  ];

  const generatePersonalizedPlan = async () => {
    setLoading(true);
    try {
      const skills = ['JavaScript', 'React', 'Node.js', 'Python'];
      const experience = 'beginner';
      const plan = await GeminiService.generateStudyPlan(skills, experience);
      setStudyPlan(plan);
    } catch (error) {
      console.error('Error generating study plan:', error);
      setStudyPlan('Unable to generate personalized plan at the moment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your learning progress.</p>
          {isGuest && (
            <Badge variant="outline" className="mt-2">
              Viewing in Guest Mode - Limited functionality
            </Badge>
          )}
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
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col">
                    <Briefcase className="h-6 w-6 mb-2" />
                    <span>Browse Jobs</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <span>Start Course</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span>Take Test</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col">
                    <Upload className="h-6 w-6 mb-2" />
                    <span>Upload Resume</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI-Powered Study Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  AI-Powered Study Plan
                </CardTitle>
                <CardDescription>
                  Get a personalized learning path based on your goals and current skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                {studyPlan ? (
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded">
                      {studyPlan}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600 mb-4">
                      Generate a personalized study plan tailored to your career goals
                    </p>
                    <Button onClick={generatePersonalizedPlan} disabled={loading}>
                      {loading ? 'Generating...' : 'Generate Study Plan'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Educational Platform Links */}
            <Card>
              <CardHeader>
                <CardTitle>External Learning Resources</CardTitle>
                <CardDescription>
                  Access popular educational platforms to enhance your skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('https://www.geeksforgeeks.org/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GeeksforGeeks
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('https://www.w3schools.com/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    W3Schools
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('https://leetcode.com/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    LeetCode
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => window.open('https://www.hackerrank.com/', '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    HackerRank
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {event.date}
                        <MapPin className="h-3 w-3 ml-2 mr-1" />
                        {event.location}
                      </div>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
