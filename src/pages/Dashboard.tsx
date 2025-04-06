import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import ChatRoomCard from '../components/ChatRoomCard';
import CreateRoomModal from '../components/CreateRoomModal';

interface Room {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  category: string;
  members: number;
}

const mockRooms: Room[] = [
  {
    id: 'general',
    name: 'General Chat',
    description: 'Welcome to TeamUp! Connect with everyone here.',
    category: 'General',
    members: 5,
  },
  {
    id: 'ai-ml',
    name: 'AI/ML Enthusiast',
    description: 'Discuss AI and Machine Learning projects',
    category: 'AI/ML',
    members: 5,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchRooms = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/rooms');
      const data = await res.json();

      const uniqueRooms = data.filter(
        (room: Room) =>
          !mockRooms.some(
            (mock) => mock.name.toLowerCase() === room.name.toLowerCase()
          )
      );

      setRooms([...mockRooms, ...uniqueRooms]);
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      setRooms(mockRooms); // fallback
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = async (roomData: any) => {
    try {
      const res = await fetch('http://localhost:5000/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!res.ok) throw new Error('Room creation failed');

      const newRoom = await res.json();

      // Add to state and redirect
      setRooms((prev) => [...prev, newRoom]);
      setIsCreateModalOpen(false);
      navigate(`/chat/${newRoom._id || newRoom.id}`);
    } catch (error) {
      console.error('Error creating room:', error);
      alert('Failed to create room');
    }
  };

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
              key={room._id || room.id}
              room={room}
              onClick={() => navigate(`/chat/${room._id || room.id}`)}
            />
          ))}
        </div>
      </div>
      
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRoom}
      />
      
      {/* Vertical stack of buttons in right corner */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4">
        {/* AI Matchmaking Button */}
        <button
          onClick={() => navigate('/AIMatch')}
          className="bg-purple-600 text-white px-5 py-3 rounded-full
            shadow-xl shadow-blue-500/50 hover:bg-purple-700 transition-all
            before:absolute before:inset-0 before:rounded-full before:blur-lg
            before:bg-blue-500/30 before:animate-pulse"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          AI Matchmaking
          <div
            className="text-sm mt-1"
            style={{
              animation: 'pulse 2s infinite ease-in-out',
              display: 'block',
              opacity: 0.8,
            }}
          >
            Find Buddy
          </div>
        </button>
        
        {/* AI Buddy Button */}
        <button
          onClick={() => navigate('/Aegis')}
          className="bg-purple-600 text-white px-5 py-3 rounded-full
            shadow-xl shadow-blue-500/50 hover:bg-purple-700 transition-all
            before:absolute before:inset-0 before:rounded-full before:blur-lg
            before:bg-blue-500/30 before:animate-pulse"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          AI Buddy
          <div
            className="text-sm mt-1"
            style={{
              animation: 'pulse 2s infinite ease-in-out',
              display: 'block',
              opacity: 0.8,
            }}
          >
            Chat Now
          </div>
        </button>
        
        {/* DevArchetype Button */}
        <button
          onClick={() => navigate('/DevArchetype')}
          className="bg-purple-600 text-white px-5 py-3 rounded-full
            shadow-xl shadow-blue-500/50 hover:bg-purple-700 transition-all
            before:absolute before:inset-0 before:rounded-full before:blur-lg
            before:bg-blue-500/30 before:animate-pulse"
          style={{
            animation: 'float 3s ease-in-out infinite',
          }}
        >
          DevArchetype
          <div
            className="text-sm mt-1"
            style={{
              animation: 'pulse 2s infinite ease-in-out',
              display: 'block',
              opacity: 0.8,
            }}
          >
            Take Test
          </div>
        </button>
      </div>
      
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
            100% { opacity: 0.6; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}
  export default Dashboard;