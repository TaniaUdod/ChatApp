import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../types";
import { addChat, deleteChat, fetchChats, updateChat } from "./chatOperations";

interface ChatState {
  chats: Chat[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chats: [],
  isLoading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const { chatId, ...message } = action.payload;
      const chat = state.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push({ ...message, chatId });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats.push(action.payload);
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedChat = action.payload;
        const existingChatIndex = state.chats.findIndex(
          (chat) => chat.id === updatedChat.id
        );
        if (existingChatIndex !== -1) {
          state.chats[existingChatIndex] = updatedChat;
        }
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedChatId = action.payload;
        state.chats = state.chats.filter((chat) => chat.id !== deletedChatId);
      });
  },
});

export const { addMessage } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
