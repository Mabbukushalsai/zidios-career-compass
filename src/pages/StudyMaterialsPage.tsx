
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { 
  BookOpen, 
  Download, 
  ExternalLink, 
  FileText, 
  Video, 
  Search, 
  Filter,
  Star,
  Eye
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const StudyMaterialsPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const studyMaterials = [
    {
      id: 1,
      title: 'Complete JavaScript Interview Guide',
      category: 'placement',
      type: 'pdf',
      description: 'Comprehensive guide covering all JavaScript concepts for interviews',
      difficulty: 'Intermediate',
      downloads: 1250,
      rating: 4.8,
      size: '2.5 MB',
      topics: ['JavaScript', 'ES6', 'Async/Await', 'Closures'],
      author: 'Tech Experts',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms Complete Course',
      category: 'aptitude',
      type: 'video',
      description: 'Complete video series on DSA with coding examples',
      difficulty: 'Beginner to Advanced',
      downloads: 2100,
      rating: 4.9,
      duration: '45 hours',
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'],
      author: 'Code Academy',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      title: 'System Design Interview Preparation',
      category: 'technical',
      type: 'pdf',
      description: 'Learn how to design scalable systems for technical interviews',
      difficulty: 'Advanced',
      downloads: 890,
      rating: 4.7,
      size: '5.2 MB',
      topics: ['Scalability', 'Load Balancing', 'Databases', 'Microservices'],
      author: 'Senior Engineers',
      lastUpdated: '2024-01-08'
    },
    {
      id: 4,
      title: 'Quantitative Aptitude for Placements',
      category: 'aptitude',
      type: 'pdf',
      description: 'Complete quantitative aptitude guide with solved examples',
      difficulty: 'Beginner',
      downloads: 1800,
      rating: 4.6,
      size: '3.8 MB',
      topics: ['Numbers', 'Percentages', 'Profit & Loss', 'Time & Work'],
      author: 'Math Experts',
      lastUpdated: '2024-01-12'
    },
    {
      id: 5,
      title: 'React.js Complete Tutorial Series',
      category: 'technical',
      type: 'video',
      description: 'Master React.js from basics to advanced concepts',
      difficulty: 'Intermediate',
      downloads: 1560,
      rating: 4.8,
      duration: '28 hours',
      topics: ['Components', 'Hooks', 'State Management', 'Routing'],
      author: 'React Masters',
      lastUpdated: '2024-01-05'
    },
    {
      id: 6,
      title: 'HR Interview Questions & Answers',
      category: 'placement',
      type: 'pdf',
      description: 'Common HR questions with sample answers and tips',
      difficulty: 'Beginner',
      downloads: 2200,
      rating: 4.5,
      size: '1.8 MB',
      topics: ['Behavioral Questions', 'Situational Questions', 'Company Research'],
      author: 'HR Professionals',
      lastUpdated: '2024-01-18'
    }
  ];

  const externalResources = [
    {
      name: 'GeeksforGeeks',
      url: 'https://www.geeksforgeeks.org/',
      description: 'Programming tutorials, interview preparation, and coding practice',
      category: 'Programming'
    },
    {
      name: 'W3Schools',
      url: 'https://www.w3schools.com/',
      description: 'Web development tutorials and references',
      category: 'Web Development'
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/',
      description: 'Coding challenges and interview preparation',
      category: 'Coding Practice'
    },
    {
      name: 'HackerRank',
      url: 'https://www.hackerrank.com/',
      description: 'Coding challenges and skill assessment',
      category: 'Coding Practice'
    },
    {
      name: 'Coursera',
      url: 'https://www.coursera.org/',
      description: 'Online courses from top universities',
      category: 'Online Learning'
    },
    {
      name: 'edX',
      url: 'https://www.edx.org/',
      description: 'Free online courses from leading institutions',
      category: 'Online Learning'
    }
  ];

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Beginner')) return 'bg-green-100 text-green-800';
    if (difficulty.includes('Intermediate')) return 'bg-yellow-100 text-yellow-800';
    if (difficulty.includes('Advanced')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'video': return Video;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Study Materials</h1>
          <p className="text-gray-600 mt-2">Access comprehensive study materials for placement preparation.</p>
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
                    placeholder="Search study materials..."
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
                  <SelectItem value="placement">Placement Prep</SelectItem>
                  <SelectItem value="aptitude">Aptitude</SelectItem>
                  <SelectItem value="technical">Technical Skills</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Study Materials */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMaterials.map((material) => {
                const TypeIcon = getTypeIcon(material.type);
                return (
                  <Card key={material.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <TypeIcon className="h-5 w-5 mr-2 text-blue-600" />
                          <Badge className={getDifficultyColor(material.difficulty)}>
                            {material.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star className="h-4 w-4 mr-1 text-yellow-500" />
                          {material.rating}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{material.title}</CardTitle>
                      <CardDescription>{material.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Eye className="h-4 w-4 mr-2" />
                          {material.downloads} downloads
                        </div>

                        <div className="flex items-center text-sm text-gray-600">
                          <Download className="h-4 w-4 mr-2" />
                          {material.type === 'video' ? material.duration : material.size}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</p>
                          <div className="flex flex-wrap gap-1">
                            {material.topics.map((topic, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t">
                          <p className="text-xs text-gray-500 mb-3">
                            By {material.author} • Updated {material.lastUpdated}
                          </p>
                          <Button 
                            className="w-full" 
                            disabled={isGuest}
                          >
                            {isGuest ? 'Login to Download' : 'Download'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredMaterials.length === 0 && (
              <Card className="mt-8">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No study materials found matching your criteria.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - External Resources */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>External Learning Platforms</CardTitle>
                <CardDescription>
                  Explore additional resources from popular educational platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {externalResources.map((resource, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{resource.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {resource.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Platform
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p>Practice coding problems daily for at least 2 hours</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p>Focus on understanding concepts rather than memorizing</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p>Take mock tests regularly to assess your progress</p>
                  </div>
                  <div className="flex items-start">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <p>Join study groups and participate in discussions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
