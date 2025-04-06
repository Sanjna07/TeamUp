import React from 'react';
import { MessageSquare, Users } from 'lucide-react';

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
}

interface Props {
  room: Room;
  onClick: () => void;
}

const ChatRoomCard = ({ room, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="text-black text-lg font-semibold mb-2">{room.name}</h3>
      <p className="text-gray-700 text-sm mb-4">{room.description}</p>
      
      <div className="flex items-center justify-between text-sm">
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full">
          {room.category}
        </span>
        <div className="flex items-center space-x-4 text-gray-800">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-purple-600" />
            <span>{room.members}</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1 text-blue-600" />
            <span>Join</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomCard;