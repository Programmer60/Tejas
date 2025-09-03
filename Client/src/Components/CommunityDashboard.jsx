import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Package, 
  Truck,
  Activity,
  Calendar,
  Phone,
  Stethoscope
} from 'lucide-react';

const CommunityDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [timeFilter, setTimeFilter] = useState('7days');

  // Mock data for demonstration
  const dashboardStats = {
    totalConsultations: 1247,
    emergencyCases: 23,
    medicineDeliveries: 892,
    activePatients: 3456,
    kioskUtilization: 78,
    avgResponseTime: '4.2 min'
  };

  const regionalData = [
    { district: 'Raichur', consultations: 245, emergencies: 8, population: 50000, coverage: 85 },
    { district: 'Kalaburagi', consultations: 189, emergencies: 3, population: 42000, coverage: 72 },
    { district: 'Bidar', consultations: 156, emergencies: 5, population: 38000, coverage: 68 },
    { district: 'Yadgir', consultations: 134, emergencies: 2, population: 35000, coverage: 61 },
    { district: 'Ballari', consultations: 203, emergencies: 5, population: 48000, coverage: 79 }
  ];

  const commonDiseases = [
    { disease: 'Fever & Cold', cases: 234, trend: '+12%', color: 'blue' },
    { disease: 'Hypertension', cases: 189, trend: '+8%', color: 'red' },
    { disease: 'Diabetes', cases: 156, trend: '+5%', color: 'orange' },
    { disease: 'Skin Conditions', cases: 134, trend: '-3%', color: 'green' },
    { disease: 'Respiratory Issues', cases: 98, trend: '+15%', color: 'purple' }
  ];

  const deliveryStatus = [
    { type: 'Drone Delivery', completed: 234, pending: 12, success_rate: 95 },
    { type: 'Community Agent', completed: 456, pending: 23, success_rate: 98 },
    { type: 'PHC Pickup', completed: 202, pending: 8, success_rate: 99 }
  ];

  const kioskData = [
    { location: 'Manvi PHC', patients_today: 45, status: 'active', volunteer: 'Rajesh Kumar' },
    { location: 'Sindhanur Panchayat', patients_today: 32, status: 'active', volunteer: 'Sunita Devi' },
    { location: 'Lingasugur CSC', patients_today: 28, status: 'maintenance', volunteer: 'Amit Singh' },
    { location: 'Devadurga PHC', patients_today: 51, status: 'active', volunteer: 'Lakshmi Patil' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Health Dashboard</h1>
          <p className="text-gray-600">Real-time monitoring of rural telemedicine network</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Districts</option>
                <option value="raichur">Raichur</option>
                <option value="kalaburagi">Kalaburagi</option>
                <option value="bidar">Bidar</option>
                <option value="yadgir">Yadgir</option>
                <option value="ballari">Ballari</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="24hours">Last 24 Hours</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.totalConsultations}</h3>
                <p className="text-gray-600 text-sm">Total Consultations</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.emergencyCases}</h3>
                <p className="text-gray-600 text-sm">Emergency Cases</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.medicineDeliveries}</h3>
                <p className="text-gray-600 text-sm">Medicine Deliveries</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.activePatients}</h3>
                <p className="text-gray-600 text-sm">Active Patients</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.kioskUtilization}%</h3>
                <p className="text-gray-600 text-sm">Kiosk Utilization</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.avgResponseTime}</h3>
                <p className="text-gray-600 text-sm">Avg Response Time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Regional Performance
            </h3>
            <div className="space-y-4">
              {regionalData.map((region, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{region.district}</h4>
                    <span className="text-sm text-gray-500">Population: {region.population.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Consultations:</span>
                      <span className="font-medium text-gray-900 ml-1">{region.consultations}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Emergencies:</span>
                      <span className="font-medium text-red-600 ml-1">{region.emergencies}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium text-green-600 ml-1">{region.coverage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Common Diseases
            </h3>
            <div className="space-y-3">
              {commonDiseases.map((disease, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{disease.disease}</h4>
                    <p className="text-sm text-gray-600">{disease.cases} cases</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${disease.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`} />
                    <span className={`text-sm font-medium ${disease.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {disease.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery Status & Kiosk Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Medicine Delivery Status
            </h3>
            <div className="space-y-4">
              {deliveryStatus.map((delivery, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{delivery.type}</h4>
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      {delivery.success_rate}% Success
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium text-green-600 ml-1">{delivery.completed}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-orange-600 ml-1">{delivery.pending}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Kiosk Performance
            </h3>
            <div className="space-y-4">
              {kioskData.map((kiosk, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{kiosk.location}</h4>
                    <span className={`text-sm px-2 py-1 rounded ${
                      kiosk.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {kiosk.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Patients Today: <span className="font-medium text-gray-900">{kiosk.patients_today}</span></p>
                    <p>Volunteer: <span className="font-medium text-gray-900">{kiosk.volunteer}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
