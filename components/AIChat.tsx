import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { ChatMessage, LoadingState } from '../types';
import { streamPerformanceAdvice } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm your AI Performance Consultant. Ask me about upgrades for your car, maintenance tips, or what services D&D offers."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoadingState(LoadingState.LOADING);

    // Create a placeholder for the model response
    const modelMessageId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

    try {
      await streamPerformanceAdvice(userMessage.text, (chunk) => {
        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: msg.text + chunk }
            : msg
        ));
      });
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, text: "I'm having trouble connecting to the garage server. Please try again later or call the shop directly.", isError: true }
          : msg
      ));
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-race-red text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition-colors ${isOpen ? 'hidden' : 'flex'}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-race-carbon border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-race-dark to-gray-900 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-race-red p-1.5 rounded-full">
                   <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">D&D Assistant</h3>
                  <p className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === 'user' 
                        ? 'bg-race-red text-white rounded-br-none' 
                        : 'bg-gray-800 text-gray-200 rounded-bl-none'
                    } ${msg.isError ? 'border border-red-500' : ''}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loadingState === LoadingState.LOADING && messages[messages.length - 1].role === 'user' && (
                 <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-race-red" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-race-dark border-t border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about mods for your car..."
                  className="w-full bg-gray-900 text-white rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-race-red border border-gray-700 placeholder-gray-500"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loadingState === LoadingState.LOADING}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-race-red text-white rounded-full hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-race-red transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-center mt-2">
                 <p className="text-[10px] text-gray-600">AI can make mistakes. Consult our mechanics for quotes.</p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;