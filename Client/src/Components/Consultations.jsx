import { useState } from 'react';
import { Video, Phone, MessageCircle, Mic, MicOff, VideoIcon, VideoOff, Settings, Users } from 'lucide-react';

const Consultations = () => {
  const [activeConsultation, setActiveConsultation] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const activeConsultations = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      type: "video",
      status: "waiting",
      scheduledTime: "2:30 PM",
      waitTime: "5 min",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const scheduledConsultations = [
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician",
      type: "video",
      status: "scheduled",
      scheduledTime: "Tomorrow, 10:00 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      type: "phone",
      status: "scheduled",
      scheduledTime: "Sep 5, 4:00 PM",
      image: "https://images.unsplash.com/photo-1594824475242-59722c3b4b95?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const recentConsultations = [
    {
      id: 4,
      doctor: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      type: "video",
      status: "completed",
      completedTime: "Aug 28, 11:00 AM",
      duration: "25 min",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 5,
      doctor: "Dr. Emily Davis",
      specialty: "Neurologist",
      type: "phone",
      status: "completed",
      completedTime: "Aug 25, 3:15 PM",
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const startConsultation = (consultationId) => {
    setActiveConsultation(consultationId);
  };

  const endConsultation = () => {
    setActiveConsultation(null);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const ConsultationCard = ({ consultation, actionType }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={consultation.image}
            alt={consultation.doctor}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{consultation.doctor}</h3>
            <p className="text-blue-600 font-medium">{consultation.specialty}</p>
            <div className="flex items-center space-x-2 mt-1">
              {consultation.type === 'video' ? (
                <Video className="w-4 h-4 text-green-600" />
              ) : (
                <Phone className="w-4 h-4 text-blue-600" />
              )}
              <span className="text-sm text-gray-600 capitalize">{consultation.type} consultation</span>
            </div>
            {consultation.status === 'waiting' && (
              <p className="text-sm text-orange-600 font-medium">Waiting time: {consultation.waitTime}</p>
            )}
            {consultation.duration && (
              <p className="text-sm text-gray-500">Duration: {consultation.duration}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {consultation.scheduledTime || consultation.completedTime}
            </p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              consultation.status === 'waiting' ? 'bg-orange-100 text-orange-800' :
              consultation.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
            </span>
          </div>
          
          {actionType === 'join' && (
            <button
              onClick={() => startConsultation(consultation.id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
            >
              {consultation.type === 'video' ? <Video className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              <span>Join</span>
            </button>
          )}
          
          {actionType === 'upcoming' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Reschedule
            </button>
          )}
          
          {actionType === 'completed' && (
            <div className="flex space-x-2">
              <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200 transition duration-300">
                View Notes
              </button>
              <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm hover:bg-green-200 transition duration-300">
                Book Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const VideoCallInterface = ({ consultationId }) => {
    const consultation = [...activeConsultations, ...scheduledConsultations, ...recentConsultations]
      .find(c => c.id === consultationId);

    return (
      <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={consultation?.image}
              alt={consultation?.doctor}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{consultation?.doctor}</h3>
              <p className="text-sm text-gray-300">{consultation?.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Connected</span>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-gray-900">
          {/* Doctor's Video (Large) */}
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold">
                  {consultation?.doctor.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <p className="text-lg">Waiting for doctor to join...</p>
            </div>
          </div>

          {/* Patient's Video (Small, Overlay) */}
          <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
            <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white">
              {isVideoOff ? (
                <VideoOff className="w-8 h-8" />
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg font-bold">You</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Panel (if needed) */}
          <div className="absolute left-4 top-4 bottom-20 w-80 bg-white rounded-lg shadow-lg hidden">
            <div className="p-4 border-b border-gray-200">
              <h4 className="font-semibold text-gray-900">Chat</h4>
            </div>
            <div className="flex-1 p-4">
              <p className="text-sm text-gray-500">Chat messages will appear here...</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-6">
          <div className="flex justify-center items-center space-x-6">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition duration-300 ${
                isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
            </button>

            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full transition duration-300 ${
                isVideoOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <VideoIcon className="w-6 h-6 text-white" />}
            </button>

            <button className="p-4 bg-gray-600 hover:bg-gray-700 rounded-full transition duration-300">
              <MessageCircle className="w-6 h-6 text-white" />
            </button>

            <button className="p-4 bg-gray-600 hover:bg-gray-700 rounded-full transition duration-300">
              <Settings className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={endConsultation}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition duration-300"
            >
              End Call
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (activeConsultation) {
    return <VideoCallInterface consultationId={activeConsultation} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultations</h1>
          <p className="text-gray-600">Manage your virtual healthcare consultations</p>
        </div>

        {/* Active Consultations */}
        {activeConsultations.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Join</h2>
            <div className="space-y-4">
              {activeConsultations.map((consultation) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  actionType="join"
                />
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Consultations */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Upcoming Consultations</h2>
          {scheduledConsultations.length > 0 ? (
            <div className="space-y-4">
              {scheduledConsultations.map((consultation) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  actionType="upcoming"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
              <Video className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming consultations</h3>
              <p className="text-gray-500 mb-4">Schedule a consultation with a healthcare professional</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Book Consultation
              </button>
            </div>
          )}
        </section>

        {/* Recent Consultations */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Consultations</h2>
          {recentConsultations.length > 0 ? (
            <div className="space-y-4">
              {recentConsultations.map((consultation) => (
                <ConsultationCard
                  key={consultation.id}
                  consultation={consultation}
                  actionType="completed"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-200">
              <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultation history</h3>
              <p className="text-gray-500">Your completed consultations will appear here</p>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Video className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeConsultations.length + scheduledConsultations.filter(c => c.type === 'video').length}
                </h3>
                <p className="text-gray-600">Video Calls</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {scheduledConsultations.filter(c => c.type === 'phone').length}
                </h3>
                <p className="text-gray-600">Phone Calls</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {recentConsultations.length}
                </h3>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultations;
