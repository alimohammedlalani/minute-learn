import { useState, useEffect } from 'react';
import { FiUpload, FiUser, FiMail, FiLock, FiBell, FiTrash2 } from 'react-icons/fi';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(() => 
    localStorage.getItem('theme') === 'dark' || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))
  );
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    username: '@johndoe',
    email: 'john@example.com',
    avatar: null
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyDigest: true
  });

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, []);

  // Profile
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Notification
  const handleNotificationChange = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  // Delete account
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1B3E] to-[#2A2A60] p-4 md:p-8">
      <div className="max-w-3xl mx-auto backdrop-blur-lg bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-6 md:p-8 space-y-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Account Settings
        </h1>

        {/* Profile Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiUser className="text-purple-400" />
            Profile
          </h2>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <img
                src={profile.avatar || '/avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-white/20"
              />
              <label className="absolute bottom-0 right-0 bg-white/20 p-2 rounded-full cursor-pointer hover:bg-white/30 transition-all">
                <FiUpload className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleProfileChange}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiLock className="text-purple-400" />
            Account
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Password</label>
              <button className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 text-gray-200 hover:bg-white/20 transition-all">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FiBell className="text-purple-400" />
            Preferences
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <span>Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full p-1 transition-colors ${
                  darkMode ? 'bg-purple-500' : 'bg-gray-500'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                  className="w-5 h-5 accent-purple-500"
                />
                Email Notifications
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                  className="w-5 h-5 accent-purple-500"
                />
                Push Notifications
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.weeklyDigest}
                  onChange={() => handleNotificationChange('weeklyDigest')}
                  className="w-5 h-5 accent-purple-500"
                />
                Weekly Digest
              </label>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-red-400">
            <FiTrash2 />
            Danger Zone
          </h2>

          <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full py-3 px-6 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 max-w-md w-full space-y-4">
              <h3 className="text-xl font-semibold">Delete Account</h3>
              <p className="text-gray-400">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all">
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;