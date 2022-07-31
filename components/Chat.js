import React, { useState, useEffect } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { GiftedChat, SystemMessage, Day } from 'react-native-gifted-chat';

//import firebase
import { initializeApp } from 'firebase/app';

//firebase config settings and initialization
import firebaseConfig from '../fbaseconfig.js';
const app = initializeApp(firebaseConfig);
import {
  doc,
  onSnapshot,
  getFirestore,
  collection,
  getDoc,
} from 'firebase/firestore';

const db = getFirestore(app);
let colRef = null;

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

  const onCollectionUpdate = (querySnapshot) => {
    const messageArray = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messageArray.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt,
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
      });
    });
    setMessages(messageArray);
  };

  useEffect(() => {
    colRef = collection(db, 'messages');
    let unsubscribe = onSnapshot(colRef, onCollectionUpdate);
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
