
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { Play, Clock, Users, Star, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CoursesPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 1,
      title: 'Complete JavaScript Masterclass',
      instructor: 'John Doe',
      category: 'programming',
      level: 'Beginner to Advanced',
      duration: '40 hours',
      students: 15420,
      rating: 4.8,
      price: '₹2,999',
      originalPrice: '₹4,999',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, DOM manipulation, and async programming.',
      topics: ['Variables & Functions', 'DOM Manipulation', 'ES6 Features', 'Async Programming', 'Projects'],
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'React.js Complete Course',
      instructor: 'Sarah Smith',
      category: 'web-development',
      level: 'Intermediate',
      duration: '35 hours',
      students: 12300,
      rating: 4.9,
      price: '₹3,499',
      originalPrice: '₹5,499',
      description: 'Build modern web applications with React.js, hooks, context API, and Redux.',
      topics: ['Components & JSX', 'Hooks', 'State Management', 'Routing', 'Real Projects'],
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Data Structures & Algorithms',
      instructor: 'Mike Johnson',
      category: 'programming',
      level: 'Intermediate to Advanced',
      duration: '50 hours',
      students: 8900,
      rating: 4.7,
      price: '₹4,499',
      originalPrice: '₹6,999',
      description: 'Master DSA concepts with practical implementations in multiple programming languages.',
      topics: ['Arrays & Strings', 'Linked Lists', 'Trees & Graphs', 'Dynamic Programming', 'Problem Solving'],
      image: '/placeholder.svg'
    },
    {
      id: 4,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Brown',
      category: 'data-science',
      level: 'Beginner',
      duration: '45 hours',
      students: 6750,
      rating: 4.6,
      price: '₹5,999',
      originalPrice: '₹8,999',
      description: 'Learn machine learning algorithms, data preprocessing, and model evaluation techniques.',
      topics: ['Linear Regression', 'Classification', 'Clustering', 'Neural Networks', 'Model Evaluation'],
      image: '/placeholder.svg'
    },
    {
      id: 5,
      title: 'System Design Interview Prep',
      instructor: 'Alex Wilson',
      category: 'interview-prep',
      level: 'Advanced',
      duration: '25 hours',
      students: 4200,
      rating: 4.8,
      price: '₹3,999',
      originalPrice: '₹5,999',
      description: 'Prepare for system design interviews with real-world case studies and scalable architectures.',
      topics: ['Load Balancing', 'Database Design', 'Caching', 'Microservices', 'Case Studies'],
      image: '/placeholder.svg'
    },
    {
      id: 6,
      title: 'Full Stack Development Bootcamp',
      instructor: 'David Lee',
      category: 'web-development',
      level: 'Beginner to Advanced',
      duration: '80 hours',
      students: 9800,
      rating: 4.7,
      price: '₹7,999',
      originalPrice: '₹12,999',
      description: 'Complete full stack development course covering frontend, backend, and deployment.',
      topics: ['HTML/CSS/JS', 'React.js', 'Node.js', 'Database', 'Deployment'],
      image: '/placeholder.svg'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    if (level.includes('Beginner')) return 'bg-green-100 text-green-800';
    if (level.includes('Intermediate')) return 'bg-yellow-100 text-yellow-800';
    if (level.includes('Advanced')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Online Courses</h1>
          <p className="text-gray-600 mt-2">Enhance your skills with our comprehensive course library.</p>
          {isGuest && (
            <Badge variant="outline" className="mt-2">
              Viewing in Guest Mode - Limited functionality
            </Badge>
          )}
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="interview-prep">Interview Prep</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()} students
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">What you'll learn:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {course.topics.slice(0, 3).map((topic, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          {topic}
                        </li>
                      ))}
                      {course.topics.length > 3 && (
                        <li className="text-blue-600">+ {course.topics.length - 3} more topics</li>
                      )}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={isGuest}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {isGuest ? 'Login to Enroll' : 'Enroll Now'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
