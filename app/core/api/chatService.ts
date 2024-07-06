import axios from "axios";
import { Chat, Message } from "../types";

const API_URL = "http://localhost:3000";

const fetchChats = () => {
  return axios.get(`${API_URL}/chats`);
};

const fetchChat = (id: string) => {
  return axios.get(`${API_URL}/chats/${id}`);
};

const addChat = (newChat: Chat) => {
  return axios.post(`${API_URL}/chats`, newChat);
};

const updateChat = (updatedChat: Chat) => {
  return axios.put(`${API_URL}/chats/${updatedChat.id}`, updatedChat);
};

const deleteChat = (id: string) => {
  return axios.delete(`${API_URL}/chats/${id}`);
};

const fetchChatMessages = (id: string) => {
  return axios.get(`${API_URL}/chats/${id}`);
};

const updateChatMessages = (id: string, messages: Message[]) => {
  return axios.patch(`${API_URL}/chats/${id}`, { messages });
};

const addChatMessage = async (id: string, newMessage: Message) => {
  const response = await fetchChatMessages(id);
  const chat = response.data;
  const updatedMessages = [...chat.messages, newMessage];
  return updateChatMessages(id, updatedMessages);
};

export default {
  fetchChats,
  fetchChat,
  addChat,
  updateChat,
  deleteChat,
  fetchChatMessages,
  addChatMessage,
};
