
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '../components/Navigation';
import { Calendar, MapPin, Users, Trophy, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HackathonsPage = () => {
  const { isGuest } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const hackathons = [
    {
      id: 1,
      title: 'AI Innovation Challenge 2024',
      organizer: 'TechCorp',
      date: '2024-02-15 to 2024-02-17',
      location: 'Bangalore',
      region: 'south',
      participants: 500,
      prize: '₹5,00,000',
      status: 'upcoming',
      description: 'Build innovative AI solutions for real-world problems',
      tags: ['AI', 'Machine Learning', 'Innovation'],
      registrationDeadline: '2024-02-10'
    },
    {
      id: 2,
      title: 'Blockchain Hackathon',
      organizer: 'CryptoTech',
      date: '2024-01-28 to 2024-01-30',
      location: 'Mumbai',
      region: 'west',
      participants: 300,
      prize: '₹3,00,000',
      status: 'registration-open',
      description: 'Develop blockchain solutions for fintech',
      tags: ['Blockchain', 'Fintech', 'Web3'],
      registrationDeadline: '2024-01-25'
    },
    {
      id: 3,
      title: 'Green Tech Challenge',
      organizer: 'EcoSoft',
      date: '2024-03-05 to 2024-03-07',
      location: 'Hyderabad',
      region: 'south',
      participants: 400,
      prize: '₹4,00,000',
      status: 'upcoming',
      description: 'Create sustainable technology solutions',
      tags: ['Green Tech', 'Sustainability', 'IoT'],
      registrationDeadline: '2024-03-01'
    },
    {
      id: 4,
      title: 'Web3 Gaming Hackathon',
      organizer: 'GameDev Studios',
      date: '2024-02-20 to 2024-02-22',
      location: 'Delhi',
      region: 'north',
      participants: 600,
      prize: '₹6,00,000',
      status: 'registration-open',
      description: 'Build the next generation of web3 games',
      tags: ['Gaming', 'Web3', 'NFT'],
      registrationDeadline: '2024-02-18'
    }
  ];

  const filteredHackathons = hackathons.filter(hackathon => {
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hackathon.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || hackathon.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration-open': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hackathons</h1>
          <p className="text-gray-600 mt-2">Participate in exciting coding competitions and win prizes!</p>
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
                    placeholder="Search hackathons..."
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

        {/* Hackathons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon) => (
            <Card key={hackathon.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{hackathon.title}</CardTitle>
                  <Badge className={getStatusColor(hackathon.status)}>
                    {hackathon.status.replace('-', ' ')}
                  </Badge>
                </div>
                <CardDescription>{hackathon.organizer}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{hackathon.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    {hackathon.date}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hackathon.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-2" />
                    {hackathon.participants} participants
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Trophy className="h-4 w-4 mr-2" />
                    Prize: {hackathon.prize}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {hackathon.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4">
                    <p className="text-xs text-gray-500 mb-3">
                      Registration deadline: {hackathon.registrationDeadline}
                    </p>
                    <Button 
                      className="w-full" 
                      disabled={isGuest || hackathon.status === 'completed'}
                    >
                      {isGuest ? 'Login to Register' : 'Register Now'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHackathons.length === 0 && (
          <Card className="mt-8">
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No hackathons found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HackathonsPage;
