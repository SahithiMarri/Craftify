import React, { useState, useRef, useEffect } from 'react';
import { Omnidimension, ConverseResponse } from '@omnidimension/client';
import { Mic } from 'lucide-react';

const omni = new Omnidimension({
  apiKey: import.meta.env.VITE_OMNI_API_KEY,
});

type Message = {
  id: number;
  type: 'user' | 'bot';
  message: string;
};

const VoiceAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleVoiceInteraction = async () => {
    setIsRecording(true);

    try {
      const response: ConverseResponse = await omni.converse({
        agent_id: import.meta.env.VITE_OMNI_AGENT_ID,
        type: 'voice',
      });

      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        message: response.transcription || '... (voice detected)',
      };

      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        message: response.response_text || 'Sorry, I did not understand that.',
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
    } catch (error) {
      console.error('Voice interaction failed:', error);
    } finally {
      setIsRecording(false);
    }
  };

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-3 rounded-t-lg w-80 text-center font-semibold">
        Craftify Buddy
      </div>

      {/* Messages */}
      <div className="messages bg-white shadow-lg rounded-b-lg p-4 w-80 h-80 overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.type === 'user' ? 'text-right' : 'text-left'}>
            <p
              className={`inline-block p-2 rounded ${
                msg.type === 'user' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Button */}
      <button
        onClick={handleVoiceInteraction}
        disabled={isRecording}
        className="mt-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isRecording ? <span className="animate-pulse">🎙️</span> : <Mic className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default VoiceAIChat;
