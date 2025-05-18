import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Login from './pages/Login';
import Home from './pages/Home';
import Micros from './pages/Micros';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Home" element={<><Navbar /><Home /></>} />
        <Route path="/Micros" element={<><Navbar /><Micros /></>} />
        <Route path="/Upload" element={<><Navbar /><Upload /></>} />
        <Route path="/Progress" element={<><Navbar /><Progress /></>} />
        <Route path="/Profile" element={<><Navbar /><Profile /></>} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Login" element={<Navigate to="/Home" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
