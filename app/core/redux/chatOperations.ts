import { createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../api/chatService";
import { Chat, Message } from "../types";

export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const response = await chatService.fetchChats();
  return response.data;
});

export const addChat = createAsyncThunk(
  "chat/addChat",
  async (newChat: Chat) => {
    const response = await chatService.addChat(newChat);
    return response.data;
  }
);

export const updateChat = createAsyncThunk(
  "chat/updateChat",
  async (updatedChat: Chat) => {
    const response = await chatService.updateChat(updatedChat);
    return response.data;
  }
);

const hardcodedUserId = "user";

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (id: string) => {
    try {
      const response = await chatService.fetchChat(id);
      const chatToDelete: Chat = response.data;
      if (chatToDelete.createdBy === hardcodedUserId) {
        await chatService.deleteChat(id);
        return id;
      } else {
        throw new Error("You are not authorized to delete this chat.");
      }
    } catch (error: any) {
      throw new Error(`Failed to delete chat: ${error.message}`);
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (id: string) => {
    const response = await chatService.fetchChatMessages(id);
    return response.data;
  }
);

export const addMessages = createAsyncThunk(
  "chat/addMessages",
  async ({ id, newMessage }: { id: string; newMessage: Message }) => {
    const response = await chatService.addChatMessage(id, newMessage);
    return response.data;
  }
);
