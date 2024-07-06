import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../core/redux/store";
import { Chat } from "../core/types";
import {
  fetchChats,
  addChat,
  updateChat,
  deleteChat,
} from "../core/redux/chatOperations";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import LoadingSpinner from "../shared/LoadingSpinner";

type RootStackParamList = {
  Home: undefined;
  Chat: { chatId: string };
};

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, "Chat">;

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomePageNavigationProp>();
  const { chats, isLoading } = useSelector((state: RootState) => state.chat);
  const [newChatName, setNewChatName] = useState("");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const handleChatPress = (chatId: string) => {
    navigation.navigate("Chat", { chatId });
  };

  const handleAddChat = () => {
    if (newChatName.trim()) {
      const newChat: Chat = {
        id: new Date().getTime().toString(),
        name: newChatName,
        messages: [],
        createdBy: "user",
      };
      dispatch(addChat(newChat));
      setNewChatName("");
    } else {
      Alert.alert("Error", "Chat name cannot be empty");
    }
  };

  const handleUpdateChat = () => {
    if (selectedChat) {
      const updatedChat: Chat = { ...selectedChat, name: newChatName };
      dispatch(updateChat(updatedChat));
      setSelectedChat(null);
      setNewChatName("");
    }
  };

  const handleDeleteChat = (chatId: string) => {
    const chatToDelete = chats.find((chat) => chat.id === chatId);
    if (!chatToDelete) {
      Alert.alert("Error", "Chat not found");
      return;
    }

    if (chatToDelete.createdBy === "user") {
      dispatch(deleteChat(chatId));
    } else {
      Alert.alert(
        "Unauthorized",
        "You are not authorized to delete this chat."
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <View style={styles.chatItem}>
            <TouchableOpacity onPress={() => handleChatPress(item.id)}>
              <Text style={styles.chatName}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.chatActions}>
              <Button
                title="Edit"
                onPress={() => {
                  setSelectedChat(item);
                  setNewChatName(item.name);
                }}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteChat(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={newChatName}
          onChangeText={setNewChatName}
          placeholder="Enter chat name"
          style={styles.input}
        />
        <Button
          title={selectedChat ? "Update Chat" : "Add Chat"}
          onPress={selectedChat ? handleUpdateChat : handleAddChat}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  chatItem: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#f8f6f6",
    borderWidth: 1,
    borderColor: "#d3cfcf",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chatName: {
    fontSize: 18,
  },
  chatActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
  },
  inputContainer: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#d3cfcf",
    borderRadius: 4,
    marginRight: 12,
  },
});

export default HomePage;
