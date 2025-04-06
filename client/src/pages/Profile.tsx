import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Edit, Github, Linkedin, Users, UserPlus } from 'lucide-react';
import axios from 'axios'; // For API requests

interface Friend {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

interface ProfileData {
  bio: string;
  interests: string[];
  githubUrl: string;
  linkedinUrl: string;
  coverImage: string;
  friends: Friend[];
}

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: "",
    interests: [],
    githubUrl: "",
    linkedinUrl: "",
    coverImage: "",
    friends: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch profile data from MongoDB when component mounts
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/profile/${user.id}`);
        
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // If profile doesn't exist yet, we'll use empty defaults already set
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  // Function to add a friend from chat room
  const addFriend = async (friendId: string) => {
    if (!user) return;
    
    try {
      // Send request to your backend to add friend
      const response = await axios.post('/api/friends/add', {
        userId: user.id,
        friendId
      });
      
      // Update local state with the new friend data
      if (response.data && response.data.newFriend) {
        setProfileData(prev => ({
          ...prev,
          friends: [...prev.friends, response.data.newFriend]
        }));
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  // Navigate to chat room with friend request functionality
  const navigateToChatRoom = () => {
    // Replace with your actual chat room URL
    navigate('/chat/general');
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Cover Image */}
          <div 
            className="h-48 bg-cover bg-center"
            style={{ backgroundImage: `url(${profileData.coverImage || 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?auto=format&fit=crop&w=2000&q=80'})` }}
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
              <p className="mt-2 text-gray-600">{profileData.bio || "No bio yet"}</p>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Interests</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.interests && profileData.interests.length > 0 ? (
                  profileData.interests.map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No interests added yet</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
              <div className="mt-2 flex space-x-4">
                {profileData.githubUrl && (
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                )}
                {profileData.linkedinUrl && (
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Friends</h2>
                </div>
                <button
                  onClick={navigateToChatRoom}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Find Friends</span>
                </button>
              </div>
              
              {profileData.friends && profileData.friends.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profileData.friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/profile/${friend.id}`)}
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{friend.name}</h3>
                        <p className="text-sm text-gray-500">{friend.bio || "No bio"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No friends yet. Click "Find Friends" to connect with others!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;  