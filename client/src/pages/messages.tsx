import React from 'react'; 
import { formatDistanceToNow } from 'date-fns';

interface MessageProps {
  message: {
    id: string;
    content: string;
    sender: {
      id: string;
      name: string;
      avatar: string;
    };
    timestamp: string;
  };
  isOwnMessage: boolean;
}

// Array of animal and flower emoji to use as avatars
const avatarIcons = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🦁", "🐨", "🐯", "🦄", 
                     "🌸", "🌹", "🌺", "🌻", "🌼", "🌷", "💐", "🌱", "🪴", "🍀"];

const Message: React.FC<MessageProps> = ({ message, isOwnMessage }) => {
  // Format the timestamp to be more readable
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
  
  // Generate a consistent avatar for the same name
  const getConsistentAvatar = (name: string) => {
    // Create a simple hash from the name to always get the same avatar for the same person
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const avatarIndex = nameHash % avatarIcons.length;
    return avatarIcons[avatarIndex];
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[75%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar Circle with Animal/Flower */}
        <div className="flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
            isOwnMessage ? 'bg-purple-100' : 'bg-gray-100'
          }`}>
            {getConsistentAvatar(message.sender.name)}
          </div>
        </div>
        
        {/* Message Content */}
        <div className={`mx-3 ${isOwnMessage ? 'items-end' : 'items-start'}`}>
          <div className="flex flex-col">
            <span className={`text-xs text-gray-500 mb-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
              {isOwnMessage ? 'You' : message.sender.name} • {formattedTime}
            </span>
            <div
              className={`px-4 py-2 rounded-lg ${
                isOwnMessage
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;