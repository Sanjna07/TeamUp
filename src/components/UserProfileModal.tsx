import React from 'react';
import { X, MessageSquare, UserPlus, UserMinus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
    interests?: string[];
  };
  onSendMessage: () => void;
  onToggleFriend: () => void;
  isFriend: boolean;
}

const UserProfileModal = ({ isOpen, onClose, user, onSendMessage, onToggleFriend, isFriend }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              {user.bio && <p className="text-gray-600 text-sm">{user.bio}</p>}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {user.interests && user.interests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onSendMessage}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Message</span>
          </button>
          <button
            onClick={onToggleFriend}
            className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-md ${
              isFriend
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isFriend ? (
              <>
                <UserMinus className="w-4 h-4" />
                <span>Remove Friend</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Add Friend</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;