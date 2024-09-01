import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const CHATBOT_USER_OBJ = {
  _id: RyansChatbot,
  name: "Ryan's Trivia",
  avatar:
    "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
};

let questions = [
  ["Hello, welcome to simple trivia! Say 'Yes' when you're ready to play!","yes"],
  ["What's Ryan's name?","ryan"],
  ["How old is Ryan","14"],
  ["Who is shorter than Ryan","luis"],
  ["How u rate today's lunch from 0-10", "9"],
  ["You won the game!","No more questions!"]
]

export default function RyansChatbot() {
  const [messages, setMessages] = useState([]);
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    if (messages.length < 1) {
      // Add a "starting message" when chat UI first loads
      addBotMessage(
        questions[0][0]
      );
    }
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      //console.log("PREVIOUS MESSAGES:", previousMessages);
      // console.log("NEW MESSAGE:", newMessages);
      // console.log("current array ", messages)
      return GiftedChat.append(previousMessages, newMessages)
      // return GiftedChat.append(previousMessages, newMessages)
      
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
    console.log("Recent user msg:", userMessages[0].text);
    if (questionNum === 0) {
      if(userMessages[0].text.toLowerCase() === questions[questionNum][1]) {
        addBotMessage("Sweet! " + questions[questionNum+1][0]);
        setQuestionNum(questionNum+1)
      } else {
        addBotMessage("No rush! Say 'Yes' when you are ready to start!");
      }
    }
    if (questionNum >0 && questionNum<(questions.length-1)) {
      if(userMessages[0].text.toLowerCase() === questions[questionNum][1]) {
        addBotMessage("Sweet! " + questions[questionNum+1][0]);
        setQuestionNum(questionNum+1)
      } else {
        addBotMessage("Wrong answer! try again!");
      }
    }

    if (questionNum>=(questions.length-1)) {
      addBotMessage("You won the game! No more questions!")
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
        // Wait a sec before responding
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Baker",
      }}
      renderUsernameOnMessage={true}
    />
  );
}


