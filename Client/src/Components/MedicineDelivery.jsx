import { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plane,
  User,
  Phone,
  Navigation
} from 'lucide-react';

const MedicineDelivery = () => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState('all');
  const [trackingId, setTrackingId] = useState('');

  const deliveries = [
    {
      id: 'TM001',
      patientName: 'राम कुमार',
      medicines: ['Paracetamol 500mg', 'Cough Syrup', 'Vitamin D3'],
      status: 'in_transit',
      method: 'drone',
      estimatedTime: '15 minutes',
      currentLocation: 'En route to Manvi Village',
      distance: '2.3 km',
      deliveryAgent: 'Drone Unit Alpha-1',
      prescribedBy: 'Dr. Sarah Johnson',
      priority: 'medium',
      coordinates: { lat: 15.9969, lng: 76.4602 }
    },
    {
      id: 'TM002',
      patientName: 'सुनीता देवी',
      medicines: ['Insulin 100IU', 'Glucose strips', 'Metformin 500mg'],
      status: 'delivered',
      method: 'agent',
      estimatedTime: 'Delivered',
      currentLocation: 'Sindhanur PHC',
      distance: '0 km',
      deliveryAgent: 'Rajesh Kumar',
      prescribedBy: 'Dr. Michael Chen',
      priority: 'high',
      deliveredAt: '2025-09-02 14:30'
    },
    {
      id: 'TM003',
      patientName: 'अमित सिंह',
      medicines: ['Antibiotics', 'Pain reliever'],
      status: 'preparing',
      method: 'pickup',
      estimatedTime: '45 minutes',
      currentLocation: 'Lingasugur Pharmacy',
      distance: '5.2 km',
      deliveryAgent: 'Self Pickup',
      prescribedBy: 'Dr. Priya Sharma',
      priority: 'low'
    },
    {
      id: 'TM004',
      patientName: 'लक्ष्मी पाटिल',
      medicines: ['Heart medication', 'Blood pressure tablets'],
      status: 'dispatched',
      method: 'community_agent',
      estimatedTime: '30 minutes',
      currentLocation: 'Devadurga CSC',
      distance: '1.8 km',
      deliveryAgent: 'Sunita Devi',
      prescribedBy: 'Dr. Emily Davis',
      priority: 'high'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800';
      case 'in_transit':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'drone':
        return Plane;
      case 'agent':
      case 'community_agent':
        return User;
      case 'pickup':
        return MapPin;
      default:
        return Truck;
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'drone':
        return 'text-blue-600';
      case 'agent':
      case 'community_agent':
        return 'text-green-600';
      case 'pickup':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const filteredDeliveries = deliveryMethod === 'all' 
    ? deliveries 
    : deliveries.filter(d => d.method === deliveryMethod);

  const trackDelivery = () => {
    const delivery = deliveries.find(d => d.id === trackingId.toUpperCase());
    if (delivery) {
      setSelectedDelivery(delivery);
    } else {
      alert('Delivery not found. Please check the tracking ID.');
    }
  };

  const simulateLocationUpdate = (deliveryId) => {
    // Simulate real-time location updates
    console.log(`Updating location for delivery ${deliveryId}`);
    // In a real app, this would connect to GPS/tracking API
  };

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      deliveries.forEach(delivery => {
        if (delivery.status === 'in_transit' || delivery.status === 'dispatched') {
          simulateLocationUpdate(delivery.id);
        }
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medicine Delivery Tracking</h1>
          <p className="text-gray-600">Real-time tracking of medicine deliveries across rural areas</p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Track Your Delivery</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Enter Tracking ID (e.g., TM001)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button
              onClick={trackDelivery}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Track
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="font-medium text-gray-700">Filter by delivery method:</span>
            <div className="flex space-x-2">
              {['all', 'drone', 'agent', 'community_agent', 'pickup'].map((method) => (
                <button
                  key={method}
                  onClick={() => setDeliveryMethod(method)}
                  className={`px-4 py-2 rounded-lg transition duration-300 ${
                    deliveryMethod === method
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {method === 'all' ? 'All' :
                   method === 'drone' ? 'Drone' :
                   method === 'agent' ? 'Agent' :
                   method === 'community_agent' ? 'Community Agent' :
                   'Self Pickup'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDeliveries.map((delivery) => {
            const MethodIcon = getMethodIcon(delivery.method);
            return (
              <div
                key={delivery.id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => setSelectedDelivery(delivery)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{delivery.id}</h3>
                    <p className="text-gray-600">{delivery.patientName}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                      {delivery.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      delivery.priority === 'high' ? 'bg-red-100 text-red-800' :
                      delivery.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {delivery.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MethodIcon className={`w-5 h-5 ${getMethodColor(delivery.method)}`} />
                    <span className="text-sm text-gray-600">{delivery.deliveryAgent}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">{delivery.currentLocation}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {delivery.status === 'delivered' ? delivery.deliveredAt : delivery.estimatedTime}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Medicines:</p>
                    <div className="flex flex-wrap gap-1">
                      {delivery.medicines.slice(0, 2).map((medicine, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {medicine}
                        </span>
                      ))}
                      {delivery.medicines.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{delivery.medicines.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed View Modal */}
        {selectedDelivery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Delivery Details</h3>
                    <p className="text-gray-600">Tracking ID: {selectedDelivery.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedDelivery(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Patient Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Name:</span> {selectedDelivery.patientName}</p>
                      <p><span className="text-gray-600">Prescribed by:</span> {selectedDelivery.prescribedBy}</p>
                      <p><span className="text-gray-600">Priority:</span> 
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${
                          selectedDelivery.priority === 'high' ? 'bg-red-100 text-red-800' :
                          selectedDelivery.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {selectedDelivery.priority.toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-600">Method:</span> {selectedDelivery.method.replace('_', ' ')}</p>
                      <p><span className="text-gray-600">Agent:</span> {selectedDelivery.deliveryAgent}</p>
                      <p><span className="text-gray-600">Status:</span> 
                        <span className={`ml-1 px-2 py-1 rounded text-xs ${getStatusColor(selectedDelivery.status)}`}>
                          {selectedDelivery.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Medicines</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedDelivery.medicines.map((medicine, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Package className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-900">{medicine}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Live Tracking</h4>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Navigation className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Current Location</span>
                    </div>
                    <p className="text-gray-700 mb-2">{selectedDelivery.currentLocation}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Distance: {selectedDelivery.distance}</span>
                      <span>ETA: {selectedDelivery.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                {selectedDelivery.method === 'drone' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Plane className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Drone Delivery Active</span>
                    </div>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Real-time GPS tracking enabled</li>
                      <li>• Weather conditions: Favorable</li>
                      <li>• Flight altitude: 120 feet</li>
                      <li>• Estimated delivery accuracy: ±2 meters</li>
                    </ul>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Contact Agent</span>
                  </button>
                  <button
                    onClick={() => setSelectedDelivery(null)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineDelivery;
