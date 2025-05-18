import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, logout } from '../firebase/auth';
import { FiSettings, FiGrid, FiBookmark, FiUser } from 'react-icons/fi';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    { id: 1, title: 'Python Basics', thumbnail: 'src/assets/img1.png', progress: 75 },
    { id: 2, title: 'Web Development', thumbnail: 'src/assets/img2.png', progress: 40 },
    { id: 3, title: 'Machine Learning', thumbnail: 'src/assets/img3.png', progress: 20 },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1B3E] to-[#2A2A60] flex items-center justify-center p-4">
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl border border-white/10 p-8 text-center">
          <p className="text-lg text-gray-300">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pb-20 from-[#1A1B3E] to-[#2A2A60] p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center justify-between p-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur opacity-30" />
              <img
                src={'src/assets/img.jpg'}
                alt="Profile"
                className="w-20 h-20 rounded-full border-2 border-white/20"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/settings"
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FiSettings className="w-6 h-6 text-white" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around p-4 mb-8 border-b border-white/10">
          <div className="text-center">
            <span className="block text-white font-bold">12</span>
            <span className="text-gray-400 text-sm">Courses</span>
          </div>
          <div className="text-center">
            <span className="block text-white font-bold">1.2k</span>
            <span className="text-gray-400 text-sm">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-white font-bold">450</span>
            <span className="text-gray-400 text-sm">Following</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-8 py-4 ${
              activeTab === 'courses' 
                ? 'border-b-2 border-purple-400 text-white'
                : 'text-gray-400'
            }`}
          >
            <FiGrid className="w-5 h-5" />
            Courses
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-8 py-4 ${
              activeTab === 'saved' 
                ? 'border-b-2 border-purple-400 text-white'
                : 'text-gray-400'
            }`}
          >
            <FiBookmark className="w-5 h-5" />
            Saved
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex items-center gap-2 px-8 py-4 ${
              activeTab === 'progress' 
                ? 'border-b-2 border-purple-400 text-white'
                : 'text-gray-400'
            }`}
          >
            <FiUser className="w-5 h-5" />
            Progress
          </button>
        </div>

        {/* Courses Grid */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-3 gap-4">
            {courses.map(course => (
              <div key={course.id} className="relative group">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg border border-white/10"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-lg">
                  <h3 className="text-white font-medium">{course.title}</h3>
                  <div className="w-full bg-white/20 h-1 rounded-full mt-2">
                    <div 
                      className="bg-purple-400 h-1 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Saved Content */}
        {activeTab === 'saved' && (
          <div className="text-center py-12 text-gray-400">
            No saved courses yet
          </div>
        )}

        {/* Progress Content */}
        {activeTab === 'progress' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {['Python Beginner', 'Web Dev Pro', 'ML Enthusiast'].map(badge => (
                  <span 
                    key={badge}
                    className="px-3 py-1 text-sm bg-purple-400/20 rounded-full text-purple-300"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-white font-bold mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>XP Earned</span>
                  <span className="text-white">1,240</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Current Streak</span>
                  <span className="text-white">7 days</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="p-4 border-t pb-20 border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r   from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 rounded-xl text-sm font-semibold text-white shadow-lg shadow-red-500/20 transition-all transform hover:scale-[1.02]"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

