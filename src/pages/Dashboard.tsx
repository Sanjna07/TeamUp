import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Plus } from 'lucide-react';
import ChatRoomCard from '../components/ChatRoomCard';
import CreateRoomModal from '../components/CreateRoomModal';

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
  members: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch rooms from your MongoDB backend
    const mockRooms = [
      {
        id: 'general',
        name: 'General Chat',
        description: 'Welcome to TeamUp! Connect with everyone here.',
        category: 'General',
        members: 150
      },
      {
        id: 'ai-ml',
        name: 'AI/ML Hub',
        description: 'Discuss AI and Machine Learning projects',
        category: 'AI/ML',
        members: 75
      },
      // Add more mock rooms
    ];
    setRooms(mockRooms);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chat Rooms</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Room
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <ChatRoomCard
              key={room.id}
              room={room}
              onClick={() => navigate(`/chat/${room.id}`)}
            />
          ))}
        </div>
      </div>

      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={async (roomData) => {
          // TODO: Send room data to your MongoDB backend
          console.log('Create room:', roomData);
          setIsCreateModalOpen(false);
        }}
      />
    </div>
  );
};

export default Dashboard;