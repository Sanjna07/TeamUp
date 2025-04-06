import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const RoomChat = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<{ text: string; sender: 'user' }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-purple-600 text-white p-4 text-lg font-bold">
        Room: {roomId}
      </header>

      <div className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className="bg-white p-3 rounded-lg shadow-md w-fit self-end"
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 flex border-t bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-l outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default RoomChat;
