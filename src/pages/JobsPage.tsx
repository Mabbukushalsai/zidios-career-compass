
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { MapPin, Calendar, Building2, DollarSign, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const JobsPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Bangalore',
      salary: '₹6-10 LPA',
      experience: '2-4 years',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript'],
      type: 'Full-time',
      postedDate: '2024-01-20',
      description: 'We are looking for a skilled Frontend Developer to join our team...',
      requirements: ['Bachelor\'s degree in Computer Science', 'Strong knowledge of React', 'Experience with REST APIs']
    },
    {
      id: 2,
      title: 'Backend Developer',
      company: 'DataTech Inc',
      location: 'Mumbai',
      salary: '₹8-12 LPA',
      experience: '3-5 years',
      skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
      type: 'Full-time',
      postedDate: '2024-01-18',
      description: 'Join our backend team to build scalable applications...',
      requirements: ['Experience with Node.js or Python', 'Database design knowledge', 'Cloud platform experience']
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Hyderabad',
      salary: '₹5-8 LPA',
      experience: '1-3 years',
      skills: ['MERN Stack', 'JavaScript', 'Docker', 'Git'],
      type: 'Full-time',
      postedDate: '2024-01-22',
      description: 'Exciting opportunity to work with cutting-edge technologies...',
      requirements: ['Full stack development experience', 'Knowledge of modern frameworks', 'Problem-solving skills']
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Innovations',
      location: 'Pune',
      salary: '₹10-15 LPA',
      experience: '2-4 years',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      type: 'Full-time',
      postedDate: '2024-01-19',
      description: 'Work on exciting AI/ML projects with real-world impact...',
      requirements: ['Strong statistics background', 'ML/AI experience', 'Python proficiency']
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = selectedLocation === 'all' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
          <p className="text-gray-600 mt-2">Find your dream job from top companies.</p>
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
                    placeholder="Search jobs by title, company, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="delhi">Delhi NCR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-700">
                      {job.company}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {job.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {job.salary}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {job.experience} experience
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      Posted on {job.postedDate}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700 mb-2">Job Description:</p>
                      <p className="text-sm text-gray-600">{job.description}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="mb-4">
                    <p className="font-medium text-gray-700 mb-2">Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1" 
                      disabled={isGuest}
                    >
                      {isGuest ? 'Login to Apply' : 'Apply Now'}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Save Job
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No jobs found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
