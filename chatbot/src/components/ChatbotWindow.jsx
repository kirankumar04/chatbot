import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

const ChatbotWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Campus Connect assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user's message to state
    setMessages([...messages, { text: currentMessage, sender: 'user' }]);
    setCurrentMessage('');

    try {
      // Send the message to your backend server
      const response = await fetch('http://127.0.0.1:5000/ask_question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: currentMessage })
      });

      // Check if response is ok
      if (response.ok) {
        // Parse JSON response from the backend
        const data = await response.json();
        const botResponse = data.answer;
        setMessages((prev) => [...prev, { text: botResponse, sender: 'bot' }]);
      } else {
        setMessages((prev) => [...prev, { text: "Sorry, there was an error processing your message. Please try again.", sender: 'bot' }]);
      }
    } catch (error) {
      // Handle errors, like network issues
      console.error("Error:", error);
      setMessages((prev) => [...prev, { text: "Sorry, I couldn't get a response. Please try again.", sender: 'bot' }]);
    }
  };

  return (
    <div className="fixed bottom-24 right-4 w-100 h-120 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-blue-600 text-white">
        <span>Campus Connect</span>
        <button onClick={onClose} className="text-white">
          <X className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`my-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 m-1 rounded-md text-sm ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded">
          <Send className="w-5 h-5 cursor-pointer" />
        </button>
      </form>
    </div>
  );
};

export default ChatbotWindow;
