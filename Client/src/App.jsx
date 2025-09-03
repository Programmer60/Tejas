import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Doctors from './Components/Doctors';
import Appointments from './Components/Appointments';
import Consultations from './Components/Consultations';
import MedicalRecords from './Components/MedicalRecords';
import AITriage from './Components/AITriage';
import CommunityDashboard from './Components/CommunityDashboard';
import KioskInterface from './Components/KioskInterface';
import MedicineDelivery from './Components/MedicineDelivery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 w-full">
        <Header />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/records" element={<MedicalRecords />} />
            <Route path="/triage" element={<AITriage />} />
            <Route path="/dashboard" element={<CommunityDashboard />} />
            <Route path="/kiosk" element={<KioskInterface />} />
            <Route path="/delivery" element={<MedicineDelivery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
