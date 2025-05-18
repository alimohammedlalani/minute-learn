import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-[#1A1A40]">
      <img
        src="src\assets\logo.png" 
        alt="MinuteLearn Logo"
        className="w-70 h-50 object-contain"
      />

    </div>
  );
};

export default SplashScreen;
