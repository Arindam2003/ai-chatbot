import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const App = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io('http://localhost:3000');
    setSocket(socketInstance);

    // Listen for AI responses
    socketInstance.on('ai-response', (data) => {
      setChat((prevChat) => [...prevChat, { text: data.response, received: true }]);
    });

    return () => socketInstance.disconnect();
  }, []);

  useEffect(() => {
    // Auto scroll to bottom on new messages
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      // Add user message to chat
      setChat((prevChat) => [...prevChat, { text: message, received: false }]);

      // Send message to AI service
      socket.emit('ai-message', { prompt: message });

      setMessage('');
    }
  };

// Rest of your component JSX remains the same

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1 className='text-3xl text-center p-3 bg-blue-100 rounded-2xl'>Chatbot</h1>
      <div className="flex-1 p-4 overflow-hidden">
        <div
          ref={chatContainerRef}
          className="h-full overflow-y-auto space-y-4 p-4"
        >
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.received ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${msg.received
                    ? 'bg-white text-gray-800'
                    : 'bg-blue-500 text-white'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={sendMessage}
        className="p-4 border-t bg-white"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;