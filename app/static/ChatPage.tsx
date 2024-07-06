import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../core/redux/store";
import { addMessages, fetchMessages } from "../core/redux/chatOperations";
import { Chat, Message } from "../core/types";
import {
  initSocket,
  sendMessage,
  closeSocket,
} from "../core/api/socketService";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

type ChatPageRouteProp = RouteProp<RootStackParamList, "Chat">;

interface ChatPageProps {
  route: ChatPageRouteProp;
}

const ChatPage: React.FC<ChatPageProps> = ({ route }) => {
  const { chatId } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const chats = useSelector((state: RootState) => state.chat.chats);
  const chat = chats.find((chat: Chat) => chat.id === chatId);
  const [message, setMessage] = useState("");

  useEffect(() => {
    initSocket(dispatch);

    dispatch(fetchMessages(chatId));

    return () => {
      closeSocket();
    };
  }, [dispatch, chatId]);

  const handleSendMessage = () => {
    if (chat) {
      const newMessage: Message = {
        id: new Date().getTime().toString(),
        chatId: chat.id,
        text: message,
        timestamp: Date.now(),
      };

      dispatch(addMessages({ id: chatId, newMessage }));

      sendMessage(newMessage);
      setMessage("");
    }
  };

  if (!chat) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(chat.messages);

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>{chat.name}</Text>
      <FlatList
        data={chat.messages}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.messageItem}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
        style={styles.input}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  messageItem: {
    padding: 8,
    marginBottom: 4,
    backgroundColor: "#f5f6fa",
    borderWidth: 1,
    borderRadius: 10,
    maxWidth: "80%",
    borderColor: "#d3cfcf",
  },
  input: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#d3cfcf",
    borderRadius: 4,
    marginBottom: 8,
  },
});

export default ChatPage;
