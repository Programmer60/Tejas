import { useState } from 'react';
import { FileText, Download, Upload, Calendar, User, Activity, Heart, Thermometer, Weight } from 'lucide-react';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('records');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const medicalRecords = [
    {
      id: 1,
      title: "Cardiology Consultation Report",
      doctor: "Dr. Sarah Johnson",
      date: "2025-08-28",
      type: "Consultation Report",
      category: "cardiology",
      fileSize: "2.3 MB",
      summary: "Routine cardiac checkup. ECG shows normal sinus rhythm. Blood pressure within normal limits."
    },
    {
      id: 2,
      title: "Blood Test Results",
      doctor: "Dr. Michael Chen",
      date: "2025-08-25",
      type: "Lab Report",
      category: "laboratory",
      fileSize: "1.1 MB",
      summary: "Complete blood count and lipid profile. All values within normal range."
    },
    {
      id: 3,
      title: "Chest X-Ray Report",
      doctor: "Dr. Emily Davis",
      date: "2025-08-20",
      type: "Imaging Report",
      category: "radiology",
      fileSize: "5.7 MB",
      summary: "Chest X-ray shows clear lung fields. No abnormalities detected."
    },
    {
      id: 4,
      title: "Dermatology Follow-up",
      doctor: "Dr. Priya Sharma",
      date: "2025-08-15",
      type: "Consultation Report",
      category: "dermatology",
      fileSize: "1.8 MB",
      summary: "Skin condition improving with current treatment. Continue prescribed medication."
    }
  ];

  const vitalSigns = [
    {
      id: 1,
      date: "2025-09-02",
      bloodPressure: "120/80",
      heartRate: "72",
      temperature: "98.6",
      weight: "70",
      height: "175"
    },
    {
      id: 2,
      date: "2025-08-28",
      bloodPressure: "118/78",
      heartRate: "68",
      temperature: "98.4",
      weight: "69.8",
      height: "175"
    },
    {
      id: 3,
      date: "2025-08-15",
      bloodPressure: "122/82",
      heartRate: "70",
      temperature: "98.5",
      weight: "70.2",
      height: "175"
    }
  ];

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Sarah Johnson",
      prescribedDate: "2025-08-28",
      duration: "30 days",
      status: "active"
    },
    {
      id: 2,
      medication: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Michael Chen",
      prescribedDate: "2025-08-25",
      duration: "90 days",
      status: "active"
    },
    {
      id: 3,
      medication: "Ibuprofen",
      dosage: "200mg",
      frequency: "As needed",
      prescribedBy: "Dr. Emily Davis",
      prescribedDate: "2025-08-20",
      duration: "7 days",
      status: "completed"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      cardiology: 'bg-red-100 text-red-800',
      laboratory: 'bg-blue-100 text-blue-800',
      radiology: 'bg-green-100 text-green-800',
      dermatology: 'bg-purple-100 text-purple-800',
      default: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.default;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const RecordCard = ({ record }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{record.title}</h3>
            <p className="text-gray-600 mb-2">{record.summary}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{record.doctor}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(record.date).toLocaleDateString()}</span>
              </div>
              <span>{record.fileSize}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(record.category)}`}>
            {record.type}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedRecord(record)}
              className="bg-blue-100 text-blue-700 p-2 rounded hover:bg-blue-200 transition duration-300"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button className="bg-green-100 text-green-700 p-2 rounded hover:bg-green-200 transition duration-300">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const VitalSignsCard = ({ vitals }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {new Date(vitals.date).toLocaleDateString()}
        </h3>
        <span className="text-sm text-gray-500">Recorded</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="bg-red-100 p-3 rounded-full mx-auto w-fit mb-2">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-sm text-gray-600">Blood Pressure</p>
          <p className="font-semibold text-gray-900">{vitals.bloodPressure} mmHg</p>
        </div>
        <div className="text-center">
          <div className="bg-pink-100 p-3 rounded-full mx-auto w-fit mb-2">
            <Activity className="w-6 h-6 text-pink-600" />
          </div>
          <p className="text-sm text-gray-600">Heart Rate</p>
          <p className="font-semibold text-gray-900">{vitals.heartRate} bpm</p>
        </div>
        <div className="text-center">
          <div className="bg-orange-100 p-3 rounded-full mx-auto w-fit mb-2">
            <Thermometer className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-600">Temperature</p>
          <p className="font-semibold text-gray-900">{vitals.temperature}°F</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 p-3 rounded-full mx-auto w-fit mb-2">
            <Weight className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600">Weight</p>
          <p className="font-semibold text-gray-900">{vitals.weight} kg</p>
        </div>
        <div className="text-center">
          <div className="bg-green-100 p-3 rounded-full mx-auto w-fit mb-2">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Height</p>
          <p className="font-semibold text-gray-900">{vitals.height} cm</p>
        </div>
      </div>
    </div>
  );

  const PrescriptionCard = ({ prescription }) => (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{prescription.medication}</h3>
          <p className="text-gray-600 mb-2">{prescription.dosage} - {prescription.frequency}</p>
          <div className="space-y-1 text-sm text-gray-500">
            <p>Prescribed by: {prescription.prescribedBy}</p>
            <p>Date: {new Date(prescription.prescribedDate).toLocaleDateString()}</p>
            <p>Duration: {prescription.duration}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
          {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
            <p className="text-gray-600 mt-1">Access and manage your health information</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload Record</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('records')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'records'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Medical Records ({medicalRecords.length})
            </button>
            <button
              onClick={() => setActiveTab('vitals')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'vitals'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Vital Signs ({vitalSigns.length})
            </button>
            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'prescriptions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Prescriptions ({prescriptions.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'records' && (
            <>
              {medicalRecords.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </>
          )}

          {activeTab === 'vitals' && (
            <>
              {vitalSigns.map((vitals) => (
                <VitalSignsCard key={vitals.id} vitals={vitals} />
              ))}
            </>
          )}

          {activeTab === 'prescriptions' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((prescription) => (
                  <PrescriptionCard key={prescription.id} prescription={prescription} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{medicalRecords.length}</h3>
                <p className="text-gray-600">Medical Records</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-full">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{vitalSigns.length}</h3>
                <p className="text-gray-600">Vital Readings</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {prescriptions.filter(p => p.status === 'active').length}
                </h3>
                <p className="text-gray-600">Active Prescriptions</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">24</h3>
                <p className="text-gray-600">Downloads</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedRecord.title}</h3>
                  <p className="text-gray-600">by {selectedRecord.doctor}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedRecord.date).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                <p className="text-gray-700">{selectedRecord.summary}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Document Preview</h4>
                <p className="text-gray-500 text-center py-8">
                  Document preview would be displayed here
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition duration-300"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
