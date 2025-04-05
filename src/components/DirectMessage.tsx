import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Send, X } from 'lucide-react';
import Message from './Message';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: string;
    name: string;
    avatar: string;
  };
}

interface DirectMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
}

const DirectMessage = ({ isOpen, onClose, recipient }: Props) => {
  const { user } = useUser();
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: Fetch DM history from MongoDB
    // For now, using mock data
    setMessages([
      {
        id: '1',
        content: `Start of your conversation with ${recipient.name}`,
        sender: {
          id: 'system',
          name: 'System',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=system'
        },
        timestamp: new Date().toISOString()
      }
    ]);
  }, [recipient.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // TODO: Send message to MongoDB
      const mockMessage: DirectMessage = {
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

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-4 w-96 bg-black rounded-t-lg shadow-lg z-40 border border-gray-800 border-b-0">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src={recipient.avatar}
              alt={recipient.name}
              className="w-full h-full rounded-full"
            />
          </div>
          <span className="font-medium text-white">{recipient.name}</span>
        </div>
  
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
  
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-900">
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            isOwnMessage={message.sender.id === user?.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
  
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 bg-black">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 hover:from-blue-500 hover:to-purple-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
  
  export default DirectMessage;