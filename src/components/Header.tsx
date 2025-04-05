import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import { ChevronDown, Settings, LogOut, User, Edit } from 'lucide-react';

const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-black border-b border-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 text-transparent bg-clip-text"
            >
              TeamUp
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 hover:bg-gray-900 rounded-full p-2 transition-colors duration-200"
            >
              <img
                src={
                  user?.imageUrl ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName || "user"}`
                }
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />

              <span className="text-white font-medium">{user?.fullName}</span>
              <ChevronDown className="w-4 h-4 text-blue-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg py-1 ring-1 ring-purple-700 ring-opacity-50">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-900"
                >
                  <User className="w-4 h-4 mr-3 text-blue-400" />
                  View Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/edit-profile');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-900"
                >
                  <Edit className="w-4 h-4 mr-3 text-blue-400" />
                  Edit Profile
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setShowProfileMenu(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-900"
                >
                  <Settings className="w-4 h-4 mr-3 text-blue-400" />
                  Settings
                </button>
                <hr className="my-1 border-purple-700" />
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;