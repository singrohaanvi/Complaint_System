import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Chatbot({ user, handleLogout }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMsg = { id: Date.now(), text: inputMessage, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInputMessage('');
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/chatbot', {
        message: inputMessage,
      });

      // Add bot response
      const botMsg = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get response');
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">College Chatbot</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 h-96 overflow-y-auto mb-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg">
                Hi! I'm your college chatbot. Ask me about:
              </p>
              <ul className="mt-4 space-y-2">
                <li>📚 College timings</li>
                <li>🏫 Department information</li>
                <li>🏨 Hostel information</li>
                <li>📖 Library information</li>
                <li>📋 Admission process</li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                    <p className="text-sm">Typing...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about the college..."
            disabled={loading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
