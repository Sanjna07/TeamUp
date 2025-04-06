import React from 'react';

interface MessageProps {
  message: {
    content: string;
    sender: {
      name: string;
      avatar: string;
    };
    timestamp: string;
  };
  isOwnMessage: boolean;
}

const Message = ({ message, isOwnMessage }: MessageProps) => {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[70%]`}>
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="w-8 h-8 rounded-full border-2 border-purple-500"
        />
        <div 
          className={`mx-2 ${
            isOwnMessage 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
              : 'bg-gray-200 text-black'
          } rounded-lg px-4 py-2`}
        >
          <div className={`text-sm font-medium mb-1 ${
            isOwnMessage ? 'text-black' : 'text-blue-700'
          }`}>
            {message.sender.name}
          </div>
          <div className="text-sm">{message.content}</div>
          <div className={`text-xs mt-1 ${
            isOwnMessage ? 'text-purple-200' : 'text-blue-500'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;