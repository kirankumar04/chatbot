import { useState } from 'react';
import { Bot } from 'lucide-react';
import ChatbotWindow from './ChatbotWindow';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 w-14 bg-blue-600 text-white shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Open chatbot"
      >
        <Bot className="h-6 w-6" />
      </button>
      
      {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;
