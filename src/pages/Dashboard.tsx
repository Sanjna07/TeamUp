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
        members: 5
      },
      {
        id: 'ai-ml',
        name: 'AI/ML Enthusiast',
        description: 'Discuss AI and Machine Learning projects',
        category: 'AI/ML',
        members: 5
      },
      // Add more mock rooms
    ];
    setRooms(mockRooms);
  }, []);

  // Function to handle room creation
  const handleCreateRoom = async (roomData: any) => {
    try {
      // TODO: Send room data to your MongoDB backend
      console.log('Create room:', roomData);
      
      // Generate a temporary ID (in production, this would come from your backend)
      const tempId = Date.now().toString();
      
      // Create a new room object with 0 members
      const newRoom: Room = {
        id: tempId,
        name: roomData.name,
        description: roomData.description,
        category: roomData.category || 'General', // Default category if not provided
        members: 0 // New room starts with 0 members
      };
      
      // Add the new room to the rooms array
      setRooms(prevRooms => [...prevRooms, newRoom]);
      
      // Close the modal
      setIsCreateModalOpen(false);
      
      // Optionally, navigate to the new room
      // navigate(`/chat/${tempId}`);
    } catch (error) {
      console.error('Error creating room:', error);
      // Handle error (show error message to user)
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
        onSubmit={handleCreateRoom}
      />
      
      {/* DevArchetype Button - Bottom Right */}
      <button 
        onClick={() => navigate('/DevArchetype')}
        className="fixed bottom-6 right-6 bg-purple-600 text-white px-5 py-3 rounded-full
                shadow-xl shadow-blue-500/50 hover:bg-purple-700 transition-all
                before:absolute before:inset-0 before:rounded-full before:blur-lg
                before:bg-blue-500/30 before:animate-pulse"
        style={{
          animation: "float 3s ease-in-out infinite",
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
        }}
      >
        DevArchetype
        <div
          className="text-sm mt-1"
          style={{
            animation: "pulse 2s infinite ease-in-out",
            display: "block",
            opacity: 0.8,
          }}
        >
          Take Test
        </div>
      </button>

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

      {/* AI Buddy Button - Bottom Left */}
<button 
  onClick={() => navigate('/AIbuddy')}
  className="fixed bottom-6 left-6 bg-cyan-600 text-white px-5 py-3 rounded-full
          shadow-xl shadow-cyan-500/50 hover:bg-cyan-700 transition-all
          before:absolute before:inset-0 before:rounded-full before:blur-lg
          before:bg-cyan-500/30 before:animate-pulse"
  style={{
    animation: "float 3s ease-in-out infinite",
    position: "fixed",
    bottom: "1.5rem",
    left: "1.5rem",
  }}
>
  AI Buddy
  <div
    className="text-sm mt-1"
    style={{
      animation: "pulse 2s infinite ease-in-out",
      display: "block",
      opacity: 0.8,
    }}
  >
    Chat Now
  </div>
</button>

    </div>
  );
};

export default Dashboard;