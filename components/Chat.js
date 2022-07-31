import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { GiftedChat, SystemMessage, Day } from 'react-native-gifted-chat';

export default function Chat(props) {
  const [messages, setMessages] = useState([]);

  const { userName, backgroundColor } = props.route.params;

  //change Day color
  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: 'white' }} />;
  };

  //change system message color
  const renderSystemMessage = (props) => (
    <SystemMessage
      {...props}
      textStyle={{
        color: 'white',
        fontSize: 14,
      }}
    />
  );

  useEffect(() => {
    //set initial system message
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: `${userName} has joined the chat`,
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <View style={[{ flex: 1 }, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
  },
});
