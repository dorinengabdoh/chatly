import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  id: string;
  conversationId: string;
  content: string;
  senderId: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage?: Message;
  unreadCount: number;
  online: boolean;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  messages: Record<string, Message[]>;
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [
    {
      id: "1",
      participantId: "2",
      participantName: "Sarah Parker",
      participantAvatar:
        "https://source.unsplash.com/random/100x100?portrait&1",
      unreadCount: 2,
      online: true,
    },
    {
      id: "2",
      participantId: "3",
      participantName: "Emily Johnson",
      participantAvatar:
        "https://source.unsplash.com/random/100x100?portrait&2",
      unreadCount: 0,
      online: false,
    },
  ],
  activeConversation: null,
  messages: {
    "1": [
      {
        id: "1",
        conversationId: "1",
        content: "Hey, how are you?",
        senderId: "2",
        timestamp: "2024-03-15T10:30:00Z",
        read: true,
      },
      {
        id: "2",
        conversationId: "1",
        content: "I'm good, thanks! How about you?",
        senderId: "1",
        timestamp: "2024-03-15T10:31:00Z",
        read: true,
      },
      {
        id: "3",
        conversationId: "1",
        content: "Great! Would you like to grab coffee sometime?",
        senderId: "2",
        timestamp: "2024-03-15T10:32:00Z",
        read: false,
      },
    ],
  },
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveConversation: (state, action: PayloadAction<string>) => {
      state.activeConversation = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const { conversationId } = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(action.payload);
    },
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conversation = state.conversations.find(
        (c) => c.id === action.payload
      );
      if (conversation) {
        conversation.unreadCount = 0;
      }
      if (state.messages[action.payload]) {
        state.messages[action.payload].forEach((message) => {
          message.read = true;
        });
      }
    },
    setOnlineStatus: (
      state,
      action: PayloadAction<{ userId: string; online: boolean }>
    ) => {
      const conversation = state.conversations.find(
        (c) => c.participantId === action.payload.userId
      );
      if (conversation) {
        conversation.online = action.payload.online;
      }
    },
  },
});

export const {
  setActiveConversation,
  addMessage,
  markConversationAsRead,
  setOnlineStatus,
} = chatSlice.actions;

export default chatSlice.reducer;
