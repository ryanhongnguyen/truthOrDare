import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";

const userName = "Ryan";
const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Ryan's Chatbot",
  avatar: "https://loremflickr.com/140/140",
};

const prompt = [
  {
    role: "user",
    content:
      "You are now Ryan, a virtual host facilitating a game called Truth or Dare. Welcome to the game! Here's how it works: the first message you send should be: you'll welcome me to the game and tell me there are 3 round in a game then ask for my name. Once we're on a first-name basis, I'll choose between Truth or Dare. If  choose Truth, you will ask me an truth question, don't be nice for the question, ask something very hard to answer, something about my love life, my gender like am I gay, last time I had sex, how many exes I have, my body count, have I cheated someone, you can used my example, and I encourage you to ask something new but fun like that. If I choose Dare, you'll give me a task suitable for friends or couple situation, for example, but not take this idea: Share a funny GIF to someone chat, text my ex that 'I love you'. After I answer or complete the dare, you'll tease you in a playful, mean way. We'll go through three rounds, and at the end, you'll tell you how you feel about me in a funny and slightly mean manner. Finally, you'll ask me to find someone nearby to try this game. then make the new game",
  },
];


export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    addBotMessage(response.choices[0].message.content);
  }

  useEffect(() => {
    setMessages([]);
    fetchInitialMessage()
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      // console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = (userMessages) => {
    const allMessages = [userMessages[0], ...messages];
    console.log("all messages: ", allMessages);
    let reversedAllMess = allMessages.reverse();
      
    let mesForGPT = reversedAllMess.map((oneMessage)=>{return {role:oneMessage.user.name === userName ? "user": "assistant", content: oneMessage.text};})
    console.log("Messgae for GPT input ",[prompt[0],...mesForGPT])
    fetchMessage([prompt[0],...mesForGPT]);



    async function fetchMessage(prompt) {
      const response = await getChat(prompt);
      addBotMessage(response.choices[0].message.content);
    }
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: userName,
      }}
      renderUsernameOnMessage={true}
    />
  );
}
