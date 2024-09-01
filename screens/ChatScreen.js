import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import RyansChatbot from "../components/RyansChatbot";
import BasicChatbot from "../components/BasicChatbot";
// prettier-ignore
export const CHATBOTS = {
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "Truth or Dare Dating Game",
    imageUrl: "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-07/gazali-marimbo-szshvnxh7lq-unsplash.jpg?itok=2Lb4VwIj",
    component: BasicChatbot,
  },
  "RyansChatbot": {
    id: "RyansChatbot",
    name: "Ryan's Trivia",
    imageUrl: "https://i.postimg.cc/FH5dd8nh/Dragon-Clipart.jpg",
    component: RyansChatbot,
  }
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
