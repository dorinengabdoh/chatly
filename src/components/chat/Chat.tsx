import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, Smile, Paperclip, Search, Phone, Video, Image, File, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { RootState } from '../../store';
import {
  setActiveConversation,
  addMessage,
  markConversationAsRead,
} from '../../store/slices/chatSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversations = useSelector((state: RootState) => state.chat.conversations);
  const activeConversation = useSelector((state: RootState) => state.chat.activeConversation);
  const messages = useSelector((state: RootState) => 
    activeConversation ? state.chat.messages[activeConversation] : []
  );

  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      dispatch(markConversationAsRead(activeConversation));
    }
  }, [activeConversation, dispatch]);

  const handleSendMessage = () => {
    if (!message.trim() || !activeConversation) return;

    const newMessage = {
      id: Date.now().toString(),
      conversationId: activeConversation,
      content: message,
      senderId: currentUser?.id || '',
      timestamp: new Date().toISOString(),
      read: false,
    };

    dispatch(addMessage(newMessage));
    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeConversationData = conversations.find(
    (conv) => conv.id === activeConversation
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => dispatch(setActiveConversation(conversation.id))}
              className={`px-4 py-3 cursor-pointer ${
                activeConversation === conversation.id
                  ? 'bg-primary-50 dark:bg-primary-900/20'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.participantAvatar}
                    alt={conversation.participantName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.participantName}
                    </h3>
                    {conversation.unreadCount > 0 && (
                      <div className="w-5 h-5 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                  {conversation.lastMessage && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {conversation.lastMessage.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
          {/* Chat Header */}
          <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={activeConversationData?.participantAvatar}
                alt={activeConversationData?.participantName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {activeConversationData?.participantName}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeConversationData?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Video className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.senderId === currentUser?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                    msg.senderId === currentUser?.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="w-full pl-4 pr-32 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <div className="absolute right-2 top-2 flex items-center space-x-2">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowAttachMenu(!showAttachMenu)}
                    className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  {showAttachMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2">
                      <button className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Image className="w-5 h-5" />
                        <span>Image</span>
                      </button>
                      <button className="w-full px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <File className="w-5 h-5" />
                        <span>File</span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowEmojiPicker(false)}
                      className="absolute -top-2 -right-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Select a conversation to start chatting
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose from your matches on the left
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;