import React, { useState } from 'react';
import { Omnidimension } from '@omnidimension/client';
import { Mic } from 'lucide-react';

const omni = new Omnidimension({
  apiKey: import.meta.env.VITE_OMNI_API_KEY,
});

const VoiceAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  const handleVoiceInteraction = async () => {
    setIsRecording(true);

    const response = await omni.converse({
      agent_id: import.meta.env.VITE_OMNI_AGENT_ID,
      type: 'voice',
    });

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: response.transcription || '... (voice detected)',
    };

    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      message: response.response_text,
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setIsRecording(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
      
      {/* Custom Header */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white p-3 rounded-t-lg w-80 text-center font-semibold">
        Craftify Buddy
      </div>

      <div className="messages bg-white shadow-lg rounded-b-lg p-4 w-80 h-80 overflow-y-auto space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={msg.type === 'user' ? 'text-right' : 'text-left'}>
            <p className={`inline-block p-2 rounded ${msg.type === 'user' ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-800'}`}>
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={handleVoiceInteraction}
        disabled={isRecording}
        className="mt-4 w-16 h-16 flex items-center justify-center bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isRecording ? (
          <span className="animate-pulse">🎙️</span>
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default VoiceAIChat;
