import { 
  Calendar, Clock, Video, Phone, MessageCircle, Star, Heart, Activity, 
  Stethoscope, Bot, Truck, Users, ArrowRight, Shield, Clock3, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const quickActions = [
    {
      title: "AI Health Triage",
      description: "Get instant health assessment and priority care recommendations",
      icon: Bot,
      color: "from-purple-500 to-purple-600",
      link: "/triage",
      badge: "AI Powered"
    },
    {
      title: "Book Appointment",
      description: "Schedule consultation with verified doctors",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      link: "/appointments",
      badge: "Popular"
    },
    {
      title: "Video Consultation",
      description: "Connect instantly with healthcare professionals",
      icon: Video,
      color: "from-green-500 to-green-600",
      link: "/consultations",
      badge: "24/7 Available"
    },
    {
      title: "Medicine Delivery",
      description: "Track real-time delivery with drones & agents",
      icon: Truck,
      color: "from-orange-500 to-orange-600",
      link: "/delivery",
      badge: "Fast Delivery"
    },
    {
      title: "Find Doctors",
      description: "Search and connect with specialist doctors",
      icon: Stethoscope,
      color: "from-teal-500 to-teal-600",
      link: "/doctors",
      badge: "Verified"
    },
    {
      title: "Medical Records",
      description: "Access your complete health history securely",
      icon: Activity,
      color: "from-indigo-500 to-indigo-600",
      link: "/records",
      badge: "Secure"
    }
  ];

  const stats = [
    { label: "Patients Served", value: "50,000+", icon: Users },
    { label: "Doctors Available", value: "2,500+", icon: Stethoscope },
    { label: "Consultations Today", value: "1,200+", icon: Video },
    { label: "Response Time", value: "< 2 min", icon: Clock3 }
  ];

  const features = [
    {
      title: "Rural Healthcare Access",
      description: "Bringing quality healthcare to remote areas with multilingual kiosk interfaces and drone delivery systems.",
      icon: MapPin,
      color: "text-blue-600"
    },
    {
      title: "AI-Powered Triage",
      description: "Smart symptom assessment with priority routing to ensure critical cases receive immediate attention.",
      icon: Bot,
      color: "text-purple-600"
    },
    {
      title: "Secure & Compliant",
      description: "HIPAA-compliant platform with end-to-end encryption ensuring your health data stays private.",
      icon: Shield,
      color: "text-green-600"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Video Consultation",
      avatar: "SJ"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Physician", 
      date: "Tomorrow",
      time: "10:00 AM",
      type: "In-person",
      avatar: "MC"
    }
  ];

  const healthTips = [
    {
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily for optimal health and better organ function.",
      icon: Heart,
      color: "from-blue-400 to-blue-500"
    },
    {
      title: "Regular Exercise",
      description: "30 minutes of moderate exercise daily can improve cardiovascular health significantly.",
      icon: Activity,
      color: "from-green-400 to-green-500"
    },
    {
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep for better mental health and immune system.",
      icon: Clock,
      color: "from-purple-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
    {/* Hero Section */}
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    <span className="block">Accessible Healthcare,</span>
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent will-change-auto transform-none">
                        Anytime, Anywhere
                    </span>
                </h1>
                <p className="mt-6 max-w-4xl mx-auto text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                    Get AI-powered health triage, connect instantly with certified doctors, and receive medicines delivered to your doorstep. Designed for both rural and urban communities, our platform ensures secure, compliant, and reliable healthcare access for everyone.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center">
                    <Link 
                        to="/triage"
                        className="inline-flex items-center justify-center min-h-[48px] rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-md hover:from-blue-700 hover:to-purple-700 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-safe:transition-all motion-safe:duration-300 motion-safe:transform motion-safe:hover:-translate-y-0.5"
                    >
                        Start AI Health Assessment
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link 
                        to="/doctors"
                        className="inline-flex items-center justify-center min-h-[48px] rounded-lg border-2 border-blue-600 bg-transparent px-8 py-4 text-lg font-semibold text-blue-600 shadow-md hover:bg-blue-600 hover:text-white hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-safe:transition-all motion-safe:duration-300 motion-safe:transform motion-safe:hover:-translate-y-0.5"
                    >
                        Find Doctors
                    </Link>
                </div>
            </div>
        </div>
    </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-700 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Quick Actions Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Healthcare Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Access comprehensive healthcare services designed for modern medical needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl group motion-safe:transition-all motion-safe:duration-300 motion-safe:transform motion-safe:hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  aria-label={`${action.title}: ${action.description}`}
                >
                  <div className="relative">
                    {action.badge && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        {action.badge}
                      </span>
                    )}
                    <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-300`}>
                      <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 motion-safe:transition-colors motion-safe:duration-300">
                      {action.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {action.description}
                    </p>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 motion-safe:transition-all motion-safe:duration-300" aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Built with cutting-edge technology to provide accessible healthcare for everyone
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 hover:bg-gray-200 motion-safe:transition-colors motion-safe:duration-300">
                    <IconComponent className={`w-8 h-8 ${feature.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Appointments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Upcoming Appointments</h2>
            <Link 
              to="/appointments" 
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-safe:transition-colors motion-safe:duration-300"
              aria-label="View all appointments"
            >
              View All
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg motion-safe:transition-shadow motion-safe:duration-300">
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4 divide-y divide-gray-200">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between pt-4 first:pt-0 hover:bg-gray-50 -mx-6 px-6 py-4 rounded-lg motion-safe:transition-colors motion-safe:duration-300">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {appointment.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                        <p className="text-gray-700">{appointment.specialty}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            appointment.type === 'Video Consultation' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{appointment.date}</p>
                      <p className="text-gray-700">{appointment.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" aria-hidden="true" />
                <p className="text-lg mb-4">No upcoming appointments</p>
                <Link 
                  to="/appointments" 
                  className="inline-flex items-center justify-center min-h-[44px] rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 motion-safe:transition-colors motion-safe:duration-300"
                >
                  Schedule Appointment
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Health Tips */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Daily Health Tips</h2>
            <p className="text-lg sm:text-xl text-gray-700">Simple habits for a healthier lifestyle</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {healthTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg group motion-safe:transition-shadow motion-safe:duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-r ${tip.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 motion-safe:transition-transform motion-safe:duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{tip.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of patients who trust our platform for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/triage"
              className="inline-flex items-center justify-center min-h-[48px] bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:transition-all motion-safe:duration-300"
            >
              Get Health Assessment
            </Link>
            <Link 
              to="/kiosk"
              className="inline-flex items-center justify-center min-h-[48px] bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:transition-all motion-safe:duration-300"
            >
              Visit Health Kiosk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
