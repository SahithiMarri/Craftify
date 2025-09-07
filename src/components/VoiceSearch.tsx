import React, { useState, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceSearchProps {
  onClose: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          setIsListening(false);
          recognitionInstance.stop();
          
          // Simulate search with voice command
          setTimeout(() => {
            alert(`Searching for: "${finalTranscript}"`);
            onClose();
          }, 500);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onClose]);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      setTranscript('');
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Voice Search</h3>
          
          <div className="mb-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-gradient-to-br from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </motion.button>
          </div>

          {isListening && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="text-orange-600 font-medium mb-4"
            >
              Listening...
            </motion.div>
          )}

          <p className="text-gray-600 text-sm">
            {isListening 
              ? "Speak now to search for products..." 
              : "Click the microphone to start voice search"
            }
          </p>

          {transcript && (
            <div className="mt-4 p-3 bg-gray-100 rounded-lg">
              <p className="text-gray-700">"{transcript}"</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceSearch;