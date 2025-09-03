import { useState } from 'react';
import { Brain, AlertTriangle, Clock, CheckCircle, Phone, Ambulance } from 'lucide-react';

const AITriage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [symptoms, setSymptoms] = useState({
    chestPain: false,
    breathingDifficulty: false,
    severePain: false,
    fever: false,
    headache: false,
    nausea: false,
    dizziness: false,
    bleeding: false
  });
  const [triageResult, setTriageResult] = useState(null);
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    location: '',
    phone: ''
  });

  const symptomQuestions = [
    { key: 'chestPain', question: 'Are you experiencing chest pain or tightness?', critical: true },
    { key: 'breathingDifficulty', question: 'Are you having trouble breathing?', critical: true },
    { key: 'severePain', question: 'Are you experiencing severe pain (8-10 on pain scale)?', critical: true },
    { key: 'bleeding', question: 'Are you experiencing any severe bleeding?', critical: true },
    { key: 'fever', question: 'Do you have fever (above 101°F)?', critical: false },
    { key: 'headache', question: 'Do you have a severe headache?', critical: false },
    { key: 'nausea', question: 'Are you feeling nauseous or vomiting?', critical: false },
    { key: 'dizziness', question: 'Are you feeling dizzy or lightheaded?', critical: false }
  ];

  const calculatePriority = () => {
    const criticalSymptoms = symptomQuestions.filter(q => q.critical && symptoms[q.key]).length;
    const totalSymptoms = Object.values(symptoms).filter(Boolean).length;
    
    if (criticalSymptoms > 0) {
      return {
        level: 'EMERGENCY',
        color: 'red',
        action: 'immediate_attention',
        waitTime: '0 minutes',
        message: 'Emergency case detected. Connecting to emergency services and nearest hospital.',
        icon: Ambulance
      };
    } else if (totalSymptoms >= 3) {
      return {
        level: 'HIGH',
        color: 'orange',
        action: 'priority_queue',
        waitTime: '5-10 minutes',
        message: 'High priority case. You will be connected to next available doctor.',
        icon: AlertTriangle
      };
    } else if (totalSymptoms >= 1) {
      return {
        level: 'MEDIUM',
        color: 'yellow',
        action: 'normal_queue',
        waitTime: '15-30 minutes',
        message: 'Medium priority. Expected wait time for consultation.',
        icon: Clock
      };
    } else {
      return {
        level: 'LOW',
        color: 'green',
        action: 'schedule',
        waitTime: '1-2 hours',
        message: 'General consultation. You can schedule an appointment.',
        icon: CheckCircle
      };
    }
  };

  const handleSymptomChange = (symptomKey, value) => {
    setSymptoms(prev => ({
      ...prev,
      [symptomKey]: value
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const result = calculatePriority();
      setTriageResult(result);
      setCurrentStep(3);
    }
  };

  const handleEmergencyCall = () => {
    // Simulate emergency call
    alert('Connecting to emergency services: 108\nAlso notifying nearest hospital.');
  };

  const handleConnectDoctor = () => {
    // Simulate doctor connection
    alert(`Connecting you to doctor queue with ${triageResult.level} priority.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">AI Medical Triage</h1>
          </div>
          <p className="text-gray-600">
            Smart symptom assessment to prioritize your healthcare needs
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">{currentStep}/3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Patient Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={patientInfo.age}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={patientInfo.gender}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Village/District)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={patientInfo.location}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter your location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={patientInfo.phone}
                  onChange={(e) => setPatientInfo(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleNext}
                disabled={!patientInfo.age || !patientInfo.gender || !patientInfo.location || !patientInfo.phone}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-300"
              >
                Next: Symptom Assessment
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Symptom Assessment */}
        {currentStep === 2 && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Symptom Assessment</h2>
            <p className="text-gray-600 mb-6">
              Please answer the following questions honestly. This will help us prioritize your care.
            </p>
            <div className="space-y-4">
              {symptomQuestions.map((question, index) => (
                <div key={question.key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {question.critical && (
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium mb-3">{question.question}</p>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleSymptomChange(question.key, true)}
                          className={`px-4 py-2 rounded-lg transition duration-300 ${
                            symptoms[question.key] === true
                              ? 'bg-red-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => handleSymptomChange(question.key, false)}
                          className={`px-4 py-2 rounded-lg transition duration-300 ${
                            symptoms[question.key] === false
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Get Triage Result
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Triage Result */}
        {currentStep === 3 && triageResult && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                triageResult.color === 'red' ? 'bg-red-100' :
                triageResult.color === 'orange' ? 'bg-orange-100' :
                triageResult.color === 'yellow' ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                <triageResult.icon className={`w-8 h-8 ${
                  triageResult.color === 'red' ? 'text-red-600' :
                  triageResult.color === 'orange' ? 'text-orange-600' :
                  triageResult.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
                }`} />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${
                triageResult.color === 'red' ? 'text-red-600' :
                triageResult.color === 'orange' ? 'text-orange-600' :
                triageResult.color === 'yellow' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {triageResult.level} PRIORITY
              </h2>
              <p className="text-gray-600 mb-4">{triageResult.message}</p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Expected Wait Time: {triageResult.waitTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {triageResult.level === 'EMERGENCY' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Ambulance className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-800">Emergency Protocol Activated</span>
                  </div>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Emergency services have been notified</li>
                    <li>• Nearest hospital alerted</li>
                    <li>• Doctor will join immediately</li>
                  </ul>
                  <button
                    onClick={handleEmergencyCall}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Emergency Services</span>
                  </button>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handleConnectDoctor}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <Brain className="w-5 h-5" />
                  <span>Connect to Doctor</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setTriageResult(null);
                    setSymptoms({
                      chestPain: false,
                      breathingDifficulty: false,
                      severePain: false,
                      fever: false,
                      headache: false,
                      nausea: false,
                      dizziness: false,
                      bleeding: false
                    });
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AITriage;
