
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { Calendar, MapPin, Users, Clock, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const SymposiumsPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const symposiums = [
    {
      id: 1,
      title: 'Future of AI & Machine Learning',
      organizer: 'Indian Institute of Technology',
      date: '2024-02-10',
      time: '09:00 AM - 05:00 PM',
      location: 'IIT Bombay, Mumbai',
      region: 'west',
      attendees: 500,
      type: 'Technical',
      description: 'Explore the latest trends and innovations in AI and ML',
      speakers: ['Dr. Raj Patel', 'Prof. Sarah Kumar', 'Mr. Tech Expert'],
      fee: 'Free',
      topics: ['AI', 'Machine Learning', 'Deep Learning', 'Neural Networks']
    },
    {
      id: 2,
      title: 'Blockchain Revolution Symposium',
      organizer: 'Tech University',
      date: '2024-02-15',
      time: '10:00 AM - 04:00 PM',
      location: 'IISC Bangalore',
      region: 'south',
      attendees: 300,
      type: 'Industry',
      description: 'Understanding blockchain technology and its applications',
      speakers: ['Ms. Crypto Leader', 'Dr. Block Chain'],
      fee: '₹500',
      topics: ['Blockchain', 'Cryptocurrency', 'DeFi', 'Web3']
    },
    {
      id: 3,
      title: 'Sustainable Technology Conference',
      organizer: 'Green Tech Foundation',
      date: '2024-02-20',
      time: '09:30 AM - 06:00 PM',
      location: 'IIT Delhi',
      region: 'north',
      attendees: 400,
      type: 'Research',
      description: 'Innovative solutions for environmental challenges',
      speakers: ['Dr. Green Tech', 'Prof. Sustainable'],
      fee: '₹300',
      topics: ['Green Technology', 'Sustainability', 'IoT', 'Clean Energy']
    },
    {
      id: 4,
      title: 'Cybersecurity & Data Privacy Summit',
      organizer: 'Cyber Security Institute',
      date: '2024-02-25',
      time: '08:00 AM - 05:00 PM',
      location: 'NIT Kolkata',
      region: 'east',
      attendees: 350,
      type: 'Security',
      description: 'Latest trends in cybersecurity and data protection',
      speakers: ['Mr. Security Expert', 'Dr. Privacy Advocate'],
      fee: '₹400',
      topics: ['Cybersecurity', 'Data Privacy', 'Ethical Hacking', 'Network Security']
    }
  ];

  const filteredSymposiums = symposiums.filter(symposium => {
    const matchesSearch = symposium.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symposium.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symposium.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || symposium.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Industry': return 'bg-green-100 text-green-800';
      case 'Research': return 'bg-purple-100 text-purple-800';
      case 'Security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Symposiums & Conferences</h1>
          <p className="text-gray-600 mt-2">Attend technical symposiums and conferences in your region.</p>
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
                    placeholder="Search symposiums..."
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

        {/* Symposiums Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSymposiums.map((symposium) => (
            <Card key={symposium.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{symposium.title}</CardTitle>
                  <Badge className={getTypeColor(symposium.type)}>
                    {symposium.type}
                  </Badge>
                </div>
                <CardDescription>{symposium.organizer}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{symposium.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {symposium.date}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-2" />
                    {symposium.time}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {symposium.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {symposium.attendees} expected attendees
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Speakers:</p>
                    <ul className="text-xs text-gray-600">
                      {symposium.speakers.map((speaker, index) => (
                        <li key={index}>• {speaker}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {symposium.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">Registration Fee:</span>
                      <span className="text-lg font-bold text-green-600">{symposium.fee}</span>
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={isGuest}
                    >
                      {isGuest ? 'Login to Register' : 'Register Now'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSymposiums.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No symposiums found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SymposiumsPage;
