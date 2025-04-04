import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import UserProfileModal from './UserProfileModal';
import DirectMessage from './DirectMessage';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  bio?: string;
  interests?: string[];
}

interface Props {
  roomId?: string;
}

const UserList = ({ roomId }: Props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDM, setShowDM] = useState(false);
  const [friends, setFriends] = useState<string[]>([]);

  useEffect(() => {
    // TODO: Fetch users from MongoDB
    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        status: 'online' as const,
        bio: 'Full-stack developer passionate about AI',
        interests: ['AI/ML', 'Web Development']
      },
      {
        id: '2',
        name: 'Jane Smith',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        status: 'online' as const,
        bio: 'DevOps engineer',
        interests: ['DevOps', 'Cloud Computing']
      }
    ];
    setUsers(mockUsers);
  }, [roomId]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowProfileModal(true);
  };

  const handleSendMessage = () => {
    if (selectedUser) {
      setShowProfileModal(false);
      setShowDM(true);
    }
  };

  const handleToggleFriend = () => {
    if (selectedUser) {
      setFriends(prev => 
        prev.includes(selectedUser.id)
          ? prev.filter(id => id !== selectedUser.id)
          : [...prev, selectedUser.id]
      );
      // TODO: Update friendship status in MongoDB
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Members</h3>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            onClick={() => handleUserClick(user)}
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                    user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="flex-1">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.bio}</p>
              </div>
              <MessageSquare className="w-5 h-5 text-gray-400 hover:text-purple-600" />
            </div>
            {user.interests && (
              <div className="mt-2 flex flex-wrap gap-2">
                {user.interests.map(interest => (
                  <span
                    key={interest}
                    className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedUser && (
        <>
          <UserProfileModal
            isOpen={showProfileModal}
            onClose={() => setShowProfileModal(false)}
            user={selectedUser}
            onSendMessage={handleSendMessage}
            onToggleFriend={handleToggleFriend}
            isFriend={friends.includes(selectedUser.id)}
          />
          <DirectMessage
            isOpen={showDM}
            onClose={() => setShowDM(false)}
            recipient={selectedUser}
          />
        </>
      )}
    </div>
  );
};

export default UserList;