
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { Calendar, MapPin, Clock, Building2, Users, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const WalkInDrivesPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const walkInDrives = [
    {
      id: 1,
      company: 'TCS (Tata Consultancy Services)',
      position: 'Software Developer',
      date: '2024-01-25',
      time: '09:00 AM - 04:00 PM',
      location: 'TCS Office, Sector 126, Noida',
      region: 'north',
      experience: 'Freshers',
      salary: '₹3.5 - 4.5 LPA',
      skills: ['Java', 'Python', 'SQL', 'Spring Boot'],
      requirements: 'B.Tech/BE in CSE/IT with 60% or above',
      documents: ['Resume', 'Photo ID', 'Educational Certificates'],
      status: 'upcoming'
    },
    {
      id: 2,
      company: 'Infosys Limited',
      position: 'System Engineer',
      date: '2024-01-28',
      time: '10:00 AM - 03:00 PM',
      location: 'Infosys Campus, Electronic City, Bangalore',
      region: 'south',
      experience: 'Freshers to 2 years',
      salary: '₹4.0 - 5.0 LPA',
      skills: ['C++', 'Java', 'JavaScript', 'React'],
      requirements: 'B.Tech/MCA with good communication skills',
      documents: ['Resume', 'Photo ID', 'Educational Certificates', 'Experience Letter'],
      status: 'upcoming'
    },
    {
      id: 3,
      company: 'Wipro Technologies',
      position: 'Junior Software Engineer',
      date: '2024-01-30',
      time: '09:30 AM - 05:00 PM',
      location: 'Wipro Campus, Hinjewadi, Pune',
      region: 'west',
      experience: 'Freshers',
      salary: '₹3.0 - 4.0 LPA',
      skills: ['Python', 'Django', 'MySQL', 'Linux'],
      requirements: 'BE/B.Tech in any stream with 65% or above',
      documents: ['Resume', 'Aadhar Card', 'Pan Card', 'Educational Certificates'],
      status: 'upcoming'
    },
    {
      id: 4,
      company: 'Accenture India',
      position: 'Associate Software Engineer',
      date: '2024-02-02',
      time: '08:00 AM - 02:00 PM',
      location: 'Accenture Office, Salt Lake, Kolkata',
      region: 'east',
      experience: 'Freshers to 1 year',
      salary: '₹4.5 - 6.0 LPA',
      skills: ['Java', 'Spring', 'Angular', 'MongoDB'],
      requirements: 'B.Tech/BE/MCA with good analytical skills',
      documents: ['Resume', 'Photo ID', 'Educational Certificates'],
      status: 'upcoming'
    }
  ];

  const filteredDrives = walkInDrives.filter(drive => {
    const matchesSearch = drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         drive.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || drive.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getExperienceColor = (experience: string) => {
    if (experience.includes('Freshers')) return 'bg-green-100 text-green-800';
    if (experience.includes('1 year')) return 'bg-blue-100 text-blue-800';
    if (experience.includes('2 years')) return 'bg-purple-100 text-purple-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Walk-in Drives</h1>
          <p className="text-gray-600 mt-2">Find and attend walk-in interviews in your selected region.</p>
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
                    placeholder="Search by company, position, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Walk-in Drives List */}
        <div className="space-y-6">
          {filteredDrives.map((drive) => (
            <Card key={drive.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{drive.company}</CardTitle>
                    <CardDescription className="text-lg font-medium text-gray-700">
                      {drive.position}
                    </CardDescription>
                  </div>
                  <Badge className={getExperienceColor(drive.experience)}>
                    {drive.experience}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="font-medium">Date:</span>
                      <span className="ml-2">{drive.date}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="font-medium">Time:</span>
                      <span className="ml-2">{drive.time}</span>
                    </div>
                    
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        <span className="font-medium">Location:</span>
                        <p className="ml-2">{drive.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span className="font-medium">Salary:</span>
                      <span className="ml-2 text-green-600 font-semibold">{drive.salary}</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Required Skills:</p>
                      <div className="flex flex-wrap gap-2">
                        {drive.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700 mb-1">Requirements:</p>
                      <p className="text-sm text-gray-600">{drive.requirements}</p>
                    </div>

                    <div>
                      <p className="font-medium text-gray-700 mb-2">Documents Required:</p>
                      <ul className="text-sm text-gray-600">
                        {drive.documents.map((doc, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      className="flex-1" 
                      disabled={isGuest}
                    >
                      {isGuest ? 'Login to Get Directions' : 'Get Directions'}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      disabled={isGuest}
                    >
                      {isGuest ? 'Login to Set Reminder' : 'Set Reminder'}
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                    >
                      Share Drive
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrives.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No walk-in drives found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WalkInDrivesPage;
