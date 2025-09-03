import { useState } from 'react';
import { 
  Monitor, 
  User, 
  Phone, 
  Mic, 
  Volume2, 
  Camera, 
  FileText, 
  Upload,
  Wifi,
  WifiOff,
  Languages,
  HelpCircle
} from 'lucide-react';

const KioskInterface = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('hindi');
  const [currentPatient, setCurrentPatient] = useState(null);
  const [consultationMode, setConsultationMode] = useState('registration');
  const [voiceMode, setVoiceMode] = useState(false);

  const languages = [
    { code: 'hindi', name: 'हिंदी', nativeName: 'Hindi' },
    { code: 'kannada', name: 'ಕನ್ನಡ', nativeName: 'Kannada' },
    { code: 'telugu', name: 'తెలుగు', nativeName: 'Telugu' },
    { code: 'marathi', name: 'मराठी', nativeName: 'Marathi' },
    { code: 'english', name: 'English', nativeName: 'English' }
  ];

  const patientQueue = [
    { id: 1, name: 'राम कुमार', age: 45, priority: 'medium', symptoms: 'बुखार, सिरदर्द' },
    { id: 2, name: 'सुनीता देवी', age: 32, priority: 'high', symptoms: 'पेट दर्द, चक्कर आना' },
    { id: 3, name: 'अमित सिंह', age: 28, priority: 'low', symptoms: 'खांसी, गले में दर्द' }
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    // Simulate language change announcement
    speak(`भाषा बदली गई: ${languages.find(l => l.code === langCode)?.name}`);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'english' ? 'en-IN' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const startVoiceMode = () => {
    setVoiceMode(true);
    speak('आवाज मोड चालू है। कृपया अपने लक्षण बताएं।');
  };

  const stopVoiceMode = () => {
    setVoiceMode(false);
    speak('आवाज मोड बंद है।');
  };

  const handleEmergency = () => {
    speak('आपातकाल! डॉक्टर से तुरंत संपर्क किया जा रहा है।');
    alert('Emergency protocol activated! Connecting to doctor immediately.');
  };

  const translations = {
    hindi: {
      title: 'ग्रामीण स्वास्थ्य किओस्क',
      subtitle: 'समुदायिक स्वास्थ्य सेवा केंद्र',
      registration: 'नया मरीज पंजीकरण',
      consultation: 'डॉक्टर से सलाह',
      emergency: 'आपातकाल',
      help: 'सहायता',
      name: 'नाम',
      age: 'उम्र',
      symptoms: 'लक्षण',
      startConsultation: 'सलाह शुरू करें',
      voiceInput: 'आवाज से बोलें',
      uploadDocument: 'दस्तावेज अपलोड करें',
      patientQueue: 'मरीजों की सूची',
      online: 'ऑनलाइन',
      offline: 'ऑफलाइन',
      connecting: 'कनेक्ट हो रहे हैं...'
    },
    english: {
      title: 'Rural Health Kiosk',
      subtitle: 'Community Healthcare Center',
      registration: 'New Patient Registration',
      consultation: 'Doctor Consultation',
      emergency: 'Emergency',
      help: 'Help',
      name: 'Name',
      age: 'Age',
      symptoms: 'Symptoms',
      startConsultation: 'Start Consultation',
      voiceInput: 'Voice Input',
      uploadDocument: 'Upload Document',
      patientQueue: 'Patient Queue',
      online: 'Online',
      offline: 'Offline',
      connecting: 'Connecting...'
    }
  };

  const t = translations[selectedLanguage] || translations.english;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Monitor className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">{t.title}</h1>
              <p className="text-blue-100">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Connection Status */}
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <>
                  <Wifi className="w-5 h-5 text-green-300" />
                  <span className="text-green-300">{t.online}</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-300" />
                  <span className="text-red-300">{t.offline}</span>
                </>
              )}
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5" />
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-blue-700 text-white border border-blue-500 rounded px-3 py-1 text-sm"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Sidebar - Patient Queue */}
        <div className="w-1/3 bg-white border-r border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.patientQueue}</h3>
          <div className="space-y-3">
            {patientQueue.map((patient) => (
              <div 
                key={patient.id}
                className={`p-4 border rounded-lg cursor-pointer transition duration-300 ${
                  currentPatient?.id === patient.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  patient.priority === 'high' ? 'border-l-4 border-l-red-500' :
                  patient.priority === 'medium' ? 'border-l-4 border-l-yellow-500' :
                  'border-l-4 border-l-green-500'
                }`}
                onClick={() => setCurrentPatient(patient)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{t.age}: {patient.age}</p>
                    <p className="text-sm text-gray-600">{t.symptoms}: {patient.symptoms}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    patient.priority === 'high' ? 'bg-red-100 text-red-800' :
                    patient.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {patient.priority.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setConsultationMode('registration')}
              className={`p-6 rounded-lg border-2 transition duration-300 ${
                consultationMode === 'registration'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-medium text-gray-900">{t.registration}</p>
            </button>

            <button
              onClick={() => setConsultationMode('consultation')}
              className={`p-6 rounded-lg border-2 transition duration-300 ${
                consultationMode === 'consultation'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Phone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-medium text-gray-900">{t.consultation}</p>
            </button>

            <button
              onClick={handleEmergency}
              className="p-6 rounded-lg border-2 border-red-200 hover:border-red-300 bg-red-50"
            >
              <Phone className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="font-medium text-red-900">{t.emergency}</p>
            </button>

            <button className="p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <p className="font-medium text-gray-900">{t.help}</p>
            </button>
          </div>

          {/* Registration Form */}
          {consultationMode === 'registration' && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{t.registration}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.name}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={selectedLanguage === 'hindi' ? 'पूरा नाम दर्ज करें' : 'Enter full name'}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.age}</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={selectedLanguage === 'hindi' ? 'उम्र दर्ज करें' : 'Enter age'}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.symptoms}</label>
                <div className="flex space-x-4">
                  <textarea
                    className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder={selectedLanguage === 'hindi' ? 'अपने लक्षण बताएं...' : 'Describe your symptoms...'}
                  />
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={voiceMode ? stopVoiceMode : startVoiceMode}
                      className={`p-4 rounded-lg transition duration-300 ${
                        voiceMode 
                          ? 'bg-red-500 text-white' 
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {voiceMode ? <Volume2 className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                    </button>
                    <button className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                      <Camera className="w-6 h-6" />
                    </button>
                    <button className="p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
                      <Upload className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setConsultationMode('consultation')}
                  className="bg-blue-600 text-white px-8 py-3 text-lg rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  {t.startConsultation}
                </button>
              </div>
            </div>
          )}

          {/* Consultation Interface */}
          {consultationMode === 'consultation' && currentPatient && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t.consultation}</h3>
                  <p className="text-gray-600">Patient: {currentPatient.name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">{t.connecting}</span>
                </div>
              </div>

              {/* Video Call Simulation */}
              <div className="bg-gray-900 rounded-lg p-8 mb-6 text-center">
                <div className="text-white mb-4">
                  <Monitor className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg">Doctor will join shortly...</p>
                  <p className="text-sm text-gray-300">Connection established with Telemedicine Center</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <button className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition duration-300">
                  <Phone className="w-6 h-6" />
                </button>
                <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition duration-300">
                  <Camera className="w-6 h-6" />
                </button>
                <button className="bg-purple-500 text-white p-4 rounded-full hover:bg-purple-600 transition duration-300">
                  <Mic className="w-6 h-6" />
                </button>
                <button className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition duration-300">
                  <Phone className="w-6 h-6 transform rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* Voice Mode Indicator */}
          {voiceMode && (
            <div className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-pulse">
              <div className="flex items-center space-x-2">
                <Mic className="w-5 h-5" />
                <span>सुन रहा है... / Listening...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KioskInterface;
