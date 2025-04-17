import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // other reducers...
  },
});

// Export the actions
export const { addMessage } = chatSlice.actions;

// Export the reducer as default
export default chatSlice.reducer;
