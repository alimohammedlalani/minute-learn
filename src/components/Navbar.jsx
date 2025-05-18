import { NavLink } from 'react-router-dom';
import { FiHome, FiSearch, FiVideo, FiLink, FiUser, FiUpload, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md bg-[#475184] rounded-full py-5 px-9 flex justify-between items-center shadow-lg z-50">
      <NavLink to="/home" className={({ isActive }) => isActive ? 'text-[#ffffff]' : 'text-white '}>
        <FiHome className="text-x1 h-6.5 w-6.5 hover:text-[#1F1F43] " />
      </NavLink>
      <NavLink to="/Progress" className={({ isActive }) => isActive ? 'text-[#ffffff]' : 'text-white'}>
        <FiActivity className="text-xl h-6.5 w-6.5 hover:text-[#1F1F43]" />
      </NavLink>
      <NavLink to="/micros" className={({ isActive }) => isActive ? 'text-[#ffffff]' : 'text-white'}>
        <FiVideo className="text-xl h-6.5 w-6.5 hover:text-[#1F1F43]" />
      </NavLink>
      <NavLink to="/Upload" className={({ isActive }) => isActive ? 'text-[#ffffff]' : 'text-white'}>
        <FiUpload className="text-xl h-6.5 w-6.5 hover:text-[#1F1F43]" />
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-[#ffffff]' : 'text-white'}>
        <FiUser className="text-xl h-6.5 w-6.5 hover:text-[#1F1F43]" />
      </NavLink>
    </div>
  );
};

export default Navbar;
