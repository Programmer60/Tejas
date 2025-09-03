import { useState } from 'react';
import { Search, Star, MapPin, Clock, Filter, Video, Phone } from 'lucide-react';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const specialties = [
    'All Specialties',
    'General Physician',
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
    'Gynecologist',
    'Psychiatrist',
    'ENT Specialist'
  ];

  const locations = [
    'All Locations',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad'
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.8,
      experience: "15 years",
      location: "Mumbai",
      consultationFee: "₹800",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      availability: "Available Today",
      languages: ["English", "Hindi"],
      education: "MD Cardiology, AIIMS Delhi",
      about: "Specialist in treating heart diseases and cardiovascular conditions with 15+ years of experience."
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Physician",
      rating: 4.6,
      experience: "12 years",
      location: "Delhi",
      consultationFee: "₹600",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      availability: "Available Tomorrow",
      languages: ["English", "Hindi", "Mandarin"],
      education: "MBBS, MD Internal Medicine",
      about: "Experienced general physician specializing in preventive care and chronic disease management."
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      rating: 4.9,
      experience: "10 years",
      location: "Bangalore",
      consultationFee: "₹900",
      image: "https://images.unsplash.com/photo-1594824475242-59722c3b4b95?w=150&h=150&fit=crop&crop=face",
      availability: "Available Today",
      languages: ["English", "Hindi", "Kannada"],
      education: "MD Dermatology, PGIMER",
      about: "Expert in skin care, acne treatment, and cosmetic dermatology procedures."
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      rating: 4.7,
      experience: "18 years",
      location: "Chennai",
      consultationFee: "₹700",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      availability: "Available Today",
      languages: ["English", "Hindi", "Tamil"],
      education: "MD Pediatrics, CMC Vellore",
      about: "Dedicated pediatrician with expertise in child healthcare and development."
    },
    {
      id: 5,
      name: "Dr. Emily Davis",
      specialty: "Neurologist",
      rating: 4.8,
      experience: "14 years",
      location: "Hyderabad",
      consultationFee: "₹1200",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
      availability: "Available Tomorrow",
      languages: ["English", "Hindi", "Telugu"],
      education: "DM Neurology, NIMHANS",
      about: "Neurologist specializing in stroke care, epilepsy, and movement disorders."
    },
    {
      id: 6,
      name: "Dr. Amit Patel",
      specialty: "Orthopedic",
      rating: 4.5,
      experience: "16 years",
      location: "Pune",
      consultationFee: "₹1000",
      image: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?w=150&h=150&fit=crop&crop=face",
      availability: "Available Today",
      languages: ["English", "Hindi", "Gujarati"],
      education: "MS Orthopedics, KEM Hospital",
      about: "Orthopedic surgeon specializing in joint replacement and sports medicine."
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || selectedSpecialty === '' || 
                            doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();
    const matchesLocation = selectedLocation === 'all' || selectedLocation === '' ||
                           doctor.location.toLowerCase() === selectedLocation.toLowerCase();
    
    return matchesSearch && matchesSpecialty && matchesLocation;
  });

  const handleBookAppointment = (doctorId) => {
    // In a real app, this would navigate to booking page or open a modal
    alert(`Booking appointment with doctor ID: ${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Doctors</h1>
          <p className="text-gray-600">Book appointments with qualified healthcare professionals</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specialties..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map((specialty, index) => (
                  <option key={index} value={index === 0 ? 'all' : specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {locations.map((location, index) => (
                  <option key={index} value={index === 0 ? 'all' : location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
              <div className="flex items-start space-x-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      <p className="text-sm text-gray-500">{doctor.education}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600">{doctor.about}</p>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>Languages:</span>
                      <span>{doctor.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-semibold text-gray-900">{doctor.consultationFee}</span>
                      <span className="text-sm text-gray-500 ml-1">consultation fee</span>
                      <p className="text-sm text-green-600 font-medium">{doctor.availability}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200 transition duration-300">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200 transition duration-300">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleBookAppointment(doctor.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
