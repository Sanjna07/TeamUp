import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Edit, Github, Linkedin, Users } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [friends, setFriends] = useState<Friend[]>([]);

  // Mock data - replace with MongoDB data
  const userProfile = {
    bio: "Full-stack developer passionate about web technologies",
    interests: ['Web Development', 'AI/ML', 'Cloud Computing'],
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    coverImage: 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?auto=format&fit=crop&w=2000&q=80'
  };

  useEffect(() => {
    // TODO: Fetch friends from MongoDB
    const mockFriends = [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        bio: 'Full-stack developer'
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        bio: 'DevOps engineer'
      }
    ];
    setFriends(mockFriends);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div 
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${userProfile.coverImage})` }}
          />
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex justify-between items-start">
              <div className="-mt-16 flex items-end space-x-5">
                <img
                  src={user?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.fullName}`}
                  alt={user?.fullName || "Profile"}
                  className="h-32 w-32 rounded-full ring-4 ring-white bg-white"
                />
                <div className="pt-16">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.fullName}</h1>
                  <p className="text-sm text-gray-500">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/edit-profile')}
                className="mt-4 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">About</h2>
              <p className="mt-2 text-gray-600">{userProfile.bio}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {userProfile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
              <div className="mt-2 flex space-x-4">
                <a
                  href={userProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={userProfile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Friends</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;