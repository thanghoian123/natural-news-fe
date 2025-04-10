import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../apis/axiosInstance'; // Ensure axios is set up with interceptors

// ✅ Fetch chat sessions from API
export const fetchChatSessions = createAsyncThunk(
  'chat/fetchChatSessions',
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chats/user/${userid}`); // replace it with user ID
      // Convert API response format to Redux-friendly state
      return response.map((session) => ({
        id: session.id.toString(),
        userId: session.user_id,
        createdAt: session.created_at,
        title: session.title || '',
        history: session.messages.map((msg) => ({
          sender: msg.role === 'user' ? 'user' : 'assistant',
          text: msg.content,
          tokens: msg.tokens,
          createdAt: msg.created_at,
        })),
      }));
    } catch (error) {
      console.error('❌ Error fetching chat sessions:', error);
      return rejectWithValue(error.response?.data || 'Failed to fetch chat sessions');
    }
  }
);

export const sendMessage = createAsyncThunk('chat/sendMessage', async ({ sessionId, message }) => {
  return { sessionId, message };
});

export const removeChatSession = createAsyncThunk(
  'chat/removeChatSession',
  async (sessionId, { rejectWithValue }) => {
    try {
      const result = await axiosInstance.delete(`/chats/${sessionId}`); // replace it with user ID
      if (result) {
        return sessionId;
      }
      return null;
    } catch (error) {
      console.error('❌ Error fetching chat sessions:', error);
      return rejectWithValue(error.response?.data || 'Failed to delete chat sessions');
    }
  }
);

export const deleteMyChatHistory = createAsyncThunk(
  'chat/deleteMyChatHistory',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/chats/delete-my-history`);
    } catch (err) {
      console.error('❌ Failed to delete chat history:', err);
      return rejectWithValue(err.response?.data || 'Failed to delete chat history');
    }
  }
);

const initialState = {
  sessions: [], // ✅ Stores chat sessions
  activeSession: null, // Active chat session ID
  status: 'idle', // Loading state: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Stores error messages
  isLoading: false,
  toolName: 'chat-with-enoch', // New state for tool name
  modelType: 'default', // New state for service name
};

// ✅ Create a new chat session
export const startNewSession = createAsyncThunk(
  'chat/startNewSession',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/chats/?user_id=${userId}`);
      return {
        id: response.id.toString(),
        userId: response.user_id,
        createdAt: response.created_at,
        title: 'New Chat',
        history: [],
      };
    } catch (error) {
      console.error('❌ Error creating chat session:', error);
      return rejectWithValue(error.response?.data || 'Failed to create session');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    appendMessage: (state, action) => {
      const { sessionId, text, sender } = action.payload;
      const session = state.sessions.find((s) => s.id === sessionId);

      if (session) {
        const lastMessage = session.history.length
          ? session.history[session.history.length - 1]
          : null;

        if (lastMessage && lastMessage.sender === sender) {
          // Append to the last message if it's from the same sender
          lastMessage.text += text;
        } else {
          // Create a new message if sender is different
          session.history.push({ sender, text, createdAt: new Date().toISOString() });
        }
      }

      if (state.isLoading) {
        state.isLoading = false;
      }
    },
    regenerateMessage: (state) => {
      state.isLoading = true;
      const { activeSession } = state;
      const session = state.sessions.find((s) => s.id === activeSession);

      if (session && session.history.length > 0) {
        const lastMessage = session.history[session.history.length - 1];

        // Check if the last message is from the assistant
        if (lastMessage.sender === 'assistant') {
          session.history.pop(); // Remove the last message
        }
      }
    },
    setActiveSession: (state, action) => {
      state.activeSession = action.payload;
    },
    deleteSession: (state, action) => {
      state.sessions = state.sessions.filter((session) => session.id !== action.payload);
      if (state.activeSession === action.payload) {
        state.activeSession = null;
      }
    },
    clearChatHistory: (state, action) => {
      const session = state.sessions.find((s) => s.id === action.payload);
      if (session) {
        session.history = [];
      }
    },
    startLoading: (state) => {
      state.isLoading = true; // ✅ Start loading
    },
    stopLoading: (state) => {
      state.isLoading = false; // ✅ Stop loading
    },
    // Add reducers to handle the new state variables
    setToolName: (state, action) => {
      state.toolName = action.payload; // Set tool name
    },
    setModelType: (state, action) => {
      state.modelType = action.payload; // Set service name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = true;
        const { sessionId, message } = action.payload;
        const session = state.sessions.find((s) => s.id === sessionId);

        if (session) {
          session.history.push(message); // Append message to history
        }
      })
      .addCase(fetchChatSessions.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchChatSessions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sessions = action.payload;
      })
      .addCase(fetchChatSessions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(startNewSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
        state.activeSession = action.payload.id; // ✅ Set active session
      })
      .addCase(startNewSession.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeChatSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter((session) => session.id !== action.payload);
        if (state.activeSession === action.payload) {
          state.activeSession = null;
        }
      })
      .addCase(removeChatSession.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMyChatHistory.fulfilled, (state) => {
        state.sessions = [];
        state.activeSession = null;
      })
      .addCase(deleteMyChatHistory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setActiveSession,
  deleteSession,
  clearChatHistory,
  appendMessage,
  regenerateMessage,
  startLoading,
  stopLoading,
  setToolName,
  setModelType,
} = chatSlice.actions;
export default chatSlice.reducer;
