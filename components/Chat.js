import React, { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat';

export default function Chat(props) {
  const [messages, setMessages] = useState([
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
      text: 'This is a system message',
      createdAt: new Date(),
      system: true,
     },
  ]);

  console.log(messages);

  const { userName, backgroundColor } = props.route.params;

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  };

  return (
    <View style={[{ flex: 1 }, { backgroundColor: '#fff' }]}>
      <GiftedChat
        messages={messages}
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
