import React, { useState } from 'react';
import { Send } from 'lucide-react';

export const Discussion = () => {
  const users = [
    {
      id: '1',
      name: 'Alice Martin',
      initial: 'AM',
      lastMessage: 'Salut',
      lastTime: '10:10',
      isOnline: true,
      messages: [
        { id: '1', text: 'Bonjour!', time: '10:10', isSent: false },
        { id: '2', text: 'Salut!', time: '10:11', isSent: true },
        { id: '3', text: 'Comment ça va?', time: '10:11', isSent: true },
        { id: '4', text: 'Ça va bien, merci. Et toi?', time: '10:12', isSent: false },
        { id: '5', text: 'Très bien aussi.', time: '10:12', isSent: true },
      ]
    },
    {
      id: '2',
      name: 'Bob Dupont',
      initial: 'BD',
      lastMessage: 'Ça va?',
      lastTime: '09:45',
      isOnline: false,
      messages: [
        { id: '1', text: 'Hey Bob!', time: '09:40', isSent: true },
        { id: '2', text: 'Salut!', time: '09:42', isSent: false },
        { id: '3', text: 'Ça va?', time: '09:45', isSent: false },
      ]
    },
    {
      id: '3',
      name: 'Charlie Brown',
      initial: 'CB',
      lastMessage: 'A bientôt!',
      lastTime: '08:30',
      isOnline: true,
      messages: [
        { id: '1', text: 'A bientôt!', time: '08:30', isSent: false },
        { id: '2', text: 'Oui, à plus tard!', time: '08:31', isSent: true },
      ]
    },
  ];

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messages, setMessages] = useState(users[0].messages);
  const [newMessage, setNewMessage] = useState('');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages(user.messages);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMessages = [
        ...messages,
        {
          id: String(messages.length + 1),
          text: newMessage,
          time: new Date().toLocaleTimeString(),
          isSent: true,
        },
      ];
      setMessages(newMessages);

      // Update the user's messages
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, messages: newMessages }
          : user
      );
      selectedUser.messages = newMessages;

      setNewMessage('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex h-[600px] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        <div className="w-1/3 border-r border-gray-200">
          <div className="border-b border-gray-200 p-4">
            <h1 className="text-xl font-semibold">Discussions</h1>
          </div>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex cursor-pointer items-center p-4 hover:bg-gray-50 ${selectedUser.id === user.id ? 'bg-gray-100' : ''
                  }`}
                onClick={() => handleUserSelect(user)}
              >
                <div className={`flex size-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white`}>
                  {user.initial}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">{user.name}</h2>
                    <span className="text-sm text-gray-500">{user.lastTime}</span>
                  </div>
                  {user.isOnline && (
                    <span className="text-sm text-green-500">En ligne</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
            </div>
            {selectedUser.isOnline && (
              <div className="text-gray-500">En train d'écrire...</div>
            )}
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${message.isSent
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                    }`}
                >
                  <p>{message.text}</p>
                  <p className={`mt-1 text-xs ${message.isSent ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Saisissez un message..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
