import { useState } from 'react';
import { Calendar, Clock, User, MapPin, Phone, Video, Filter, Plus } from 'lucide-react';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2025-09-03",
      time: "2:30 PM",
      type: "Video Consultation",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      location: "Online",
      reason: "Follow-up consultation"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      date: "2025-09-04",
      time: "10:00 AM",
      type: "In-person",
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      location: "Apollo Hospital, Delhi",
      reason: "General checkup"
    },
    {
      id: 3,
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      date: "2025-09-05",
      time: "4:00 PM",
      type: "Video Consultation",
      status: "pending",
      image: "https://images.unsplash.com/photo-1594824475242-59722c3b4b95?w=150&h=150&fit=crop&crop=face",
      location: "Online",
      reason: "Skin consultation"
    }
  ];

  const pastAppointments = [
    {
      id: 4,
      doctor: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      date: "2025-08-28",
      time: "11:00 AM",
      type: "In-person",
      status: "completed",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      location: "Max Hospital, Chennai",
      reason: "Child vaccination"
    },
    {
      id: 5,
      doctor: "Dr. Emily Davis",
      specialty: "Neurologist",
      date: "2025-08-25",
      time: "3:15 PM",
      type: "Video Consultation",
      status: "completed",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
      location: "Online",
      reason: "Migraine consultation"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinConsultation = (appointmentId) => {
    alert(`Joining video consultation for appointment ${appointmentId}`);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert(`Cancelled appointment ${appointmentId}`);
    }
  };

  const handleReschedule = (appointmentId) => {
    alert(`Rescheduling appointment ${appointmentId}`);
  };

  const AppointmentCard = ({ appointment, showActions = true }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <img
            src={appointment.image}
            alt={appointment.doctor}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
            <p className="text-blue-600 font-medium">{appointment.specialty}</p>
            <p className="text-sm text-gray-500 mt-1">{appointment.reason}</p>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  {appointment.type === 'Video Consultation' ? (
                    <Video className="w-4 h-4" />
                  ) : (
                    <MapPin className="w-4 h-4" />
                  )}
                  <span>{appointment.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
          
          {showActions && appointment.status !== 'completed' && (
            <div className="flex space-x-2">
              {appointment.type === 'Video Consultation' && appointment.status === 'confirmed' && (
                <button
                  onClick={() => handleJoinConsultation(appointment.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition duration-300"
                >
                  Join Call
                </button>
              )}
              <button
                onClick={() => handleReschedule(appointment.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition duration-300"
              >
                Reschedule
              </button>
              <button
                onClick={() => handleCancelAppointment(appointment.id)}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
            <p className="text-gray-600 mt-1">Manage your healthcare appointments</p>
          </div>
          <button
            onClick={() => setShowBookingModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'upcoming'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'past'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Past ({pastAppointments.length})
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {activeTab === 'upcoming' && (
            <>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming appointments</h3>
                  <p className="text-gray-500 mb-4">Schedule your next consultation with a healthcare professional</p>
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              {pastAppointments.length > 0 ? (
                pastAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} showActions={false} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No past appointments</h3>
                  <p className="text-gray-500">Your appointment history will appear here</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Quick Stats */}
        {(upcomingAppointments.length > 0 || pastAppointments.length > 0) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {upcomingAppointments.length}
                  </h3>
                  <p className="text-gray-600">Upcoming</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Video className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {upcomingAppointments.filter(apt => apt.type === 'Video Consultation').length}
                  </h3>
                  <p className="text-gray-600">Video Calls</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {pastAppointments.length}
                  </h3>
                  <p className="text-gray-600">Completed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Booking Modal Placeholder */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Book New Appointment</h3>
            <p className="text-gray-600 mb-4">This would open the appointment booking flow.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowBookingModal(false);
                  alert('Redirecting to doctor selection...');
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
