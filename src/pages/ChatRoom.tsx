import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Pusher from 'pusher-js';
import { Send, Users, ArrowLeft, UserPlus, Star, X, MessageSquare, Code, Briefcase, MapPin } from 'lucide-react';
import Message from '../components/Message';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

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

interface Participant {
  id: string;
  name: string;
  isOnline: boolean;
  lastSeen?: string;
  title: string;
  company: string;
  location: string;
  bio: string;
  techStack: string[];
  projects: number;
  followers: number;
  following: number;
}

// Mock data for users with enhanced profile information
const mockParticipants: Participant[] = [
  {
    id: "user1",
    name: "Rahul Sharma",
    isOnline: true,
    title: "Senior Frontend Developer",
    company: "TechVista Solutions",
    location: "Bangalore, India",
    bio: "Building scalable web applications with React and TypeScript. Open source contributor and tech blogger.",
    techStack: ["React", "TypeScript", "Next.js", "GraphQL"],
    projects: 27,
    followers: 348,
    following: 112
  },
  {
    id: "user2",
    name: "Priya Patel",
    isOnline: true,
    title: "Full Stack Engineer",
    company: "InnovateX",
    location: "Mumbai, India",
    bio: "Full stack developer passionate about building user-friendly applications. Currently exploring AI integrations.",
    techStack: ["Node.js", "React", "MongoDB", "Docker"],
    projects: 19,
    followers: 215,
    following: 98
  },
  {
    id: "user3",
    name: "Arjun Verma",
    isOnline: false,
    lastSeen: "10 min ago",
    title: "DevOps Specialist",
    company: "CloudNative Systems",
    location: "Hyderabad, India",
    bio: "Automating infrastructure and optimizing deployment pipelines. AWS certified and Kubernetes enthusiast.",
    techStack: ["Kubernetes", "AWS", "Terraform", "CI/CD"],
    projects: 14,
    followers: 176,
    following: 83
  },
  {
    id: "user4",
    name: "Anjali Singh",
    isOnline: true,
    title: "UI/UX Developer",
    company: "DesignFirst Digital",
    location: "Delhi, India",
    bio: "Creating beautiful and intuitive user interfaces. Specialized in responsive design and accessibility.",
    techStack: ["React", "Tailwind CSS", "Figma", "Accessibility"],
    projects: 31,
    followers: 289,
    following: 104
  }
];

// Mock data for different rooms
const mockRooms = {
  "general": {
    id: "general",
    name: "General Chat",
    description: "Welcome to TeamUp! Connect with everyone here.",
    category: "General",
    messages: [
      {
        id: uuidv4(),
        content: "Welcome everyone to our General Chat room!",
        sender: {
          id: "user1",
          name: "Rahul Sharma",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: uuidv4(),
        content: "Thanks! Excited to be here and collaborate with everyone.",
        sender: {
          id: "user2",
          name: "Priya Patel",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3500000).toISOString()
      },
      {
        id: uuidv4(),
        content: "What kind of projects is everyone working on?",
        sender: {
          id: "user4",
          name: "Anjali Singh",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3400000).toISOString()
      }
    ]
  },
  "ai-ml": {
    id: "ai-ml",
    name: "AI/ML Enthusiast",
    description: "Discuss AI and Machine Learning projects",
    category: "AI/ML",
    messages: [
      {
        id: uuidv4(),
        content: "Has anyone tried implementing transformers from scratch?",
        sender: {
          id: "user3",
          name: "Arjun Verma",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: uuidv4(),
        content: "I've been working with PyTorch's implementation. The attention mechanism is fascinating!",
        sender: {
          id: "user1",
          name: "Rahul Sharma",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3500000).toISOString()
      },
      {
        id: uuidv4(),
        content: "I'm focusing on fine-tuning for specific NLP tasks. Anyone have tips on reducing hallucination?",
        sender: {
          id: "user2",
          name: "Priya Patel",
          avatar: ""
        },
        timestamp: new Date(Date.now() - 3400000).toISOString()
      }
    ]
  }
};

// These are common tech discussion topics our mock users will use
const mockResponses = {
  "general": [
    "I'm working on a collaboration tool for remote teams - would love some feedback!",
    "Has anyone tried the new project management software everyone's talking about?",
    "Just finished a really interesting book on team productivity - highly recommended!",
    "What's your preferred tech stack for new projects these days?",
    "Anyone attending the tech meetup downtown this weekend?",
    "Just pushed a major update to our design system - check it out if you have time!",
    "Looking for recommendations on good documentation tools for technical teams",
    "How do you all handle sprint planning in your teams?",
    "I'm building a dashboard for our marketing team - any UI library suggestions?",
    "Just joined a new project team - any advice for the first few weeks?"
  ],
  "ai-ml": [
    "I'm experimenting with fine-tuning LLMs for domain-specific tasks",
    "Has anyone integrated OpenAI's APIs with their React app? Looking for best practices",
    "Just published my research on transfer learning techniques",
    "I've been exploring reinforcement learning from human feedback - fascinating results!",
    "Anyone tried the new TensorFlow features in the latest release?",
    "Looking for datasets for sentiment analysis in Indian languages",
    "Just built a computer vision pipeline for our retail client - deployment was challenging",
    "What's everyone's take on the latest SOTA models for image recognition?",
    "I'm working on an NLP project for legal document analysis - any tips?",
    "Anyone using MLflow for experiment tracking? How's your experience been?"
  ]
};

// New: Direct message pop-up related types
interface DirectMessagePopup {
  isOpen: boolean;
  recipient: Participant | null;
  messages: ChatMessage[];
  newMessage: string;
}

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { user } = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedUser, setSelectedUser] = useState<Participant | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dmMessagesEndRef = useRef<HTMLDivElement>(null);
  const botResponseTimer = useRef<NodeJS.Timeout | null>(null);
  
  // New: Direct message popup state
  const [directMessage, setDirectMessage] = useState<DirectMessagePopup>({
    isOpen: false,
    recipient: null,
    messages: [],
    newMessage: ''
  });

  // Mock API calls for initial data loading
  useEffect(() => {
    // Clear any existing data
    setMessages([]);
    setRoom(null);
    
    // Simulate API delay
    const loadDelay = setTimeout(() => {
      if (roomId && mockRooms[roomId as keyof typeof mockRooms]) {
        const roomData = mockRooms[roomId as keyof typeof mockRooms];
        setRoom({
          id: roomData.id,
          name: roomData.name,
          description: roomData.description,
          category: roomData.category
        });
        setMessages(roomData.messages);
      } else {
        // Fallback if room doesn't exist
        toast.error("Chat room not found");
        navigate('/dashboard');
      }
      setParticipants(mockParticipants);
    }, 1000);

    return () => clearTimeout(loadDelay);
  }, [roomId, navigate]);

  // Set up Pusher for real-time chat
  useEffect(() => {
    let pusher: Pusher;
    
    try {
      pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        cluster: import.meta.env.VITE_PUSHER_CLUSTER
      });

      const channel = pusher.subscribe(`room-${roomId}`);
      
      channel.bind('new-message', (data: ChatMessage) => {
        setMessages((prev) => [...prev, data]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
        pusher.disconnect();
      };
    } catch (error) {
      console.error("Pusher setup failed, falling back to mock real-time", error);
      // If Pusher fails, we'll simulate real-time with our mock system
    }
  }, [roomId]);

  // Simulate responses from other participants
  useEffect(() => {
    // Only start the bot responses if we have messages loaded
    if (messages.length > 0 && roomId) {
      const simulateParticipantResponse = () => {
        // Pick a random participant (not the current user)
        const availableParticipants = participants.filter(p => p.id !== user?.id);
        if (availableParticipants.length === 0) return;
        
        const randomParticipant = availableParticipants[Math.floor(Math.random() * availableParticipants.length)];
        
        // Get room-specific responses
        const roomResponses = mockResponses[roomId as keyof typeof mockResponses] || mockResponses.general;
        const randomResponse = roomResponses[Math.floor(Math.random() * roomResponses.length)];
        
        const newMockMessage: ChatMessage = {
          id: uuidv4(),
          content: randomResponse,
          sender: {
            id: randomParticipant.id,
            name: randomParticipant.name,
            avatar: ""
          },
          timestamp: new Date().toISOString()
        };
        
        // Simulate a network event - either using Pusher or direct state update
        try {
          // Try to trigger via Pusher if available
          const pusherChannel = `room-${roomId}`;
          const eventName = 'new-message';
          
          // Directly update state as fallback
          setMessages(prev => [...prev, newMockMessage]);
        } catch (error) {
          // Just update state directly if Pusher fails
          setMessages(prev => [...prev, newMockMessage]);
        }
        
        // Schedule next response in 5-15 seconds
        const nextResponseTime = 5000 + Math.random() * 10000;
        botResponseTimer.current = setTimeout(simulateParticipantResponse, nextResponseTime);
      };
      
      // Start the first response timer (3-8 seconds)
      const initialDelay = 3000 + Math.random() * 5000;
      botResponseTimer.current = setTimeout(simulateParticipantResponse, initialDelay);
      
      // Clean up timers on unmount
      return () => {
        if (botResponseTimer.current) {
          clearTimeout(botResponseTimer.current);
        }
      };
    }
  }, [participants, messages.length, roomId, user?.id]);

  // Scroll to Bottom when New Message is Received
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Scroll to bottom in DM popup when new message is received
  useEffect(() => {
    if (directMessage.isOpen) {
      dmMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [directMessage.messages, directMessage.isOpen]);

  // Send a New Message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      // Create the new message object
      const messageData: ChatMessage = {
        id: uuidv4(),
        content: newMessage,
        sender: {
          id: user?.id || 'current-user',
          name: user?.fullName || 'You',
          avatar: ""
        },
        timestamp: new Date().toISOString()
      };

      // Update UI immediately (optimistic update)
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Simulate API call
      toast.success('Message sent');
      
      // In a real app, you'd send this to your backend which would trigger Pusher
      // Since we're mocking, we don't need to do anything else
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  // New: Send a direct message
  const handleSendDirectMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!directMessage.newMessage.trim() || !directMessage.recipient) return;

    try {
      // Create the new message object
      const messageData: ChatMessage = {
        id: uuidv4(),
        content: directMessage.newMessage,
        sender: {
          id: user?.id || 'current-user',
          name: user?.fullName || 'You',
          avatar: ""
        },
        timestamp: new Date().toISOString()
      };

      // Update UI immediately (optimistic update)
      setDirectMessage(prev => ({
        ...prev,
        messages: [...prev.messages, messageData],
        newMessage: ''
      }));

      // Simulate API call
      toast.success('Direct message sent');
      
      // Simulate automated response after a short delay
      setTimeout(() => {
        if (directMessage.recipient) {
          const responseMessage: ChatMessage = {
            id: uuidv4(),
            content: `Thanks for reaching out! This is an automated response from ${directMessage.recipient.name}.`,
            sender: {
              id: directMessage.recipient.id,
              name: directMessage.recipient.name,
              avatar: ""
            },
            timestamp: new Date().toISOString()
          };
          
          setDirectMessage(prev => ({
            ...prev,
            messages: [...prev.messages, responseMessage]
          }));
        }
      }, 1500);
    } catch (error) {
      toast.error('Failed to send direct message');
    }
  };

  const handleShowUserProfile = (userId: string) => {
    const user = participants.find(p => p.id === userId);
    if (user) {
      setSelectedUser(user);
    }
  };

  const handleAddFriend = (userId: string) => {
    toast.success(`Friend request sent to ${participants.find(p => p.id === userId)?.name}`);
  };

  const handleFollow = (userId: string) => {
    toast.success(`You are now following ${participants.find(p => p.id === userId)?.name}`);
  };

  // Updated to open the direct message popup
  const handleOpenDirectMessage = (userId: string) => {
    const recipient = participants.find(p => p.id === userId);
    if (recipient) {
      setDirectMessage({
        isOpen: true,
        recipient: recipient,
        messages: [],
        newMessage: ''
      });
    }
  };

  // Close the direct message popup
  const handleCloseDirectMessage = () => {
    setDirectMessage({
      isOpen: false,
      recipient: null,
      messages: [],
      newMessage: ''
    });
  };

  // ParticipantsList component
  const ParticipantsList = () => {
    if (selectedUser) {
      return (
        <div className="h-full flex flex-col">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Profile</h3>
            <button 
              onClick={() => setSelectedUser(null)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* User Profile */}
          <div className="flex flex-col items-center space-y-4 mb-6">
            {/* Animal/Flower avatar instead of initials */}
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-4xl">
              {/* Generate a consistent emoji based on the name */}
              {getAvatarEmoji(selectedUser.name)}
            </div>
            
            <div className="text-center">
              <h4 className="text-xl font-bold">{selectedUser.name}</h4>
              <p className="text-gray-600">{selectedUser.title}</p>
              
              <div className="flex items-center justify-center mt-1 text-sm text-gray-500">
                <span className={`w-2 h-2 rounded-full ${selectedUser.isOnline ? 'bg-green-500' : 'bg-gray-400'} mr-1`}></span>
                <span>{selectedUser.isOnline ? 'Online' : `Last seen ${selectedUser.lastSeen}`}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-3 mb-6">
            <button 
              onClick={() => handleAddFriend(selectedUser.id)}
              className="flex items-center space-x-1 px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Friend</span>
            </button>
            
            <button 
              onClick={() => handleFollow(selectedUser.id)}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Star className="w-4 h-4" />
              <span>Follow</span>
            </button>
            
            <button 
              onClick={() => handleOpenDirectMessage(selectedUser.id)}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>
          
          {/* User Info */}
          <div className="space-y-4 text-sm">
            <div className="flex items-start space-x-2">
              <Briefcase className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Company</p>
                <p className="text-gray-600">{selectedUser.company}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-gray-600">{selectedUser.location}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Code className="w-4 h-4 text-gray-500 mt-0.5" />
              <div>
                <p className="font-medium">Tech Stack</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedUser.techStack.map((tech, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-xs rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <p className="font-medium mb-1">Bio</p>
              <p className="text-gray-600">{selectedUser.bio}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-6 grid grid-cols-3 text-center">
            <div>
              <p className="font-bold">{selectedUser.projects}</p>
              <p className="text-xs text-gray-500">Projects</p>
            </div>
            <div>
              <p className="font-bold">{selectedUser.followers}</p>
              <p className="text-xs text-gray-500">Followers</p>
            </div>
            <div>
              <p className="font-bold">{selectedUser.following}</p>
              <p className="text-xs text-gray-500">Following</p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Participants ({participants.length})</h3>
        <div className="space-y-4">
          {participants.map(participant => (
            <div 
              key={participant.id} 
              className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              onClick={() => handleShowUserProfile(participant.id)}
            >
              {/* Animal/Flower avatar instead of initials */}
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl relative">
                {getAvatarEmoji(participant.name)}
                {participant.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <div>
                <p className="font-medium">{participant.name}</p>
                <p className="text-xs text-gray-500">
                  {participant.isOnline ? 'Online' : `Last seen ${participant.lastSeen}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to generate a consistent emoji avatar based on name
  const avatarEmojis = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🦁", "🐨", "🐯", "🦄", 
                         "🌸", "🌹", "🌺", "🌻", "🌼", "🌷", "💐", "🌱", "🪴", "🍀"];
                     
  const getAvatarEmoji = (name: string) => {
    // Create a simple hash from the name
    const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Use the hash to get a consistent emoji
    return avatarEmojis[nameHash % avatarEmojis.length];
  };

  if (!room) {
    return <div className="flex items-center justify-center h-screen text-lg">Loading chat room...</div>;
  }

  return (
    <div className="h-screen flex bg-gray-50">
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
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

        {/* Messages List */}
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

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 px-4 py-2"
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

      {/* User List Sidebar */}
      {showUserList && (
        <div className="w-80 border-l bg-white p-4 overflow-y-auto">
          <ParticipantsList />
        </div>
      )}

      {/* Direct Message Popup */}
      {directMessage.isOpen && directMessage.recipient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 flex flex-col" style={{ height: '70vh' }}>
            {/* DM Header */}
            <div className="p-4 border-b flex items-center space-x-3">
              <div className="text-2xl">{getAvatarEmoji(directMessage.recipient.name)}</div>
              <div className="flex-1">
                <h3 className="font-semibold">{directMessage.recipient.name}</h3>
                <p className="text-xs text-gray-500">{directMessage.recipient.title}</p>
              </div>
              <button 
                onClick={handleCloseDirectMessage}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* DM Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {directMessage.messages.length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                  <p>No messages yet</p>
                  <p className="text-sm">Start a conversation with {directMessage.recipient.name}</p>
                </div>
              ) : (
                directMessage.messages.map((message) => (
                  <Message
                    key={message.id}
                    message={message}
                    isOwnMessage={message.sender.id === user?.id}
                  />
                ))
              )}
              <div ref={dmMessagesEndRef} />
            </div>
            
            {/* DM Input */}
            <form onSubmit={handleSendDirectMessage} className="p-4 border-t">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={directMessage.newMessage}
                  onChange={(e) => setDirectMessage(prev => ({ ...prev, newMessage: e.target.value }))}
                  placeholder={`Message ${directMessage.recipient.name}...`}
                  className="flex-1 rounded-full border-gray-300 focus:border-purple-500 focus:ring-purple-500 px-4 py-2"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;