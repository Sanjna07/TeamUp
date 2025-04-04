import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Pusher from 'pusher-js';
import { Send, Users, ArrowLeft } from 'lucide-react';
import UserList from '../components/UserList';
import Message from '../components/Message';
import toast from 'react-hot-toast';

interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
}

interface Room {
  id: string;
  name: string;
  description: string;
  category: string;
}

const ChatRoom = () => {
  const { roomId } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Fetch room details from MongoDB
    // Example API call:
    // const fetchRoom = async () => {
    //   const response = await fetch(`/api/rooms/${roomId}`);
    //   const data = await response.json();
    //   setRoom(data);
    // };
    // fetchRoom();

    // TODO: Fetch messages from MongoDB
    // Example API call:
    // const fetchMessages = async () => {
    //   const response = await fetch(`/api/rooms/${roomId}/messages`);
    //   const data = await response.json();
    //   setMessages(data);
    // };
    // fetchMessages();

    // For now, using mock data
    setRoom({
      id: roomId!,
      name: 'General Chat',
      description: 'Welcome to TeamUp! Connect with everyone here.',
      category: 'General'
    });

    setMessages([
      {
        id: '1',
        content: 'Welcome to the chat room!',
        sender: {
          id: 'system',
          name: 'System',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=system'
        },
        timestamp: new Date().toISOString()
      }
    ]);
  }, [roomId]);

  useEffect(() => {
    const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
      cluster: import.meta.env.VITE_PUSHER_CLUSTER
    });

    const channel = pusher.subscribe(`room-${roomId}`);
    channel.bind('new-message', (data: ChatMessage) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // TODO: Send message to MongoDB
      // Example API call:
      // const response = await fetch(`/api/rooms/${roomId}/messages`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     content: newMessage,
      //     senderId: user.id
      //   })
      // });

      // For now, simulate message sending
      const mockMessage: ChatMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender: {
          id: user?.id || '',
          name: user?.fullName || '',
          avatar: user?.imageUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'
        },
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, mockMessage]);
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b px-6 py-4 flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="text-sm text-gray-500">{room.description}</p>
          </div>
          <button
            onClick={() => setShowUserList(!showUserList)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Users className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={message.sender.id === user?.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>
      </div>

      {showUserList && (
        <div className="w-80 border-l bg-white p-4 overflow-y-auto">
          <UserList roomId={roomId} />
        </div>
      )}
    </div>
  );
};

export default ChatRoom;