import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import ProfileSlide from './ProfileSlide.js';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import uuid from 'react-uuid';

import {
  GiftedChat,
  SystemMessage,
  Day,
  InputToolbar,
  Avatar,
} from 'react-native-gifted-chat';

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
  addDoc,
} from 'firebase/firestore';
import { color } from 'react-native-reanimated';

const db = getFirestore(app);
let colRef = null;

export default function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState();
  const [profileView, setProfileView] = useState(false);
  const [userAvatar, setUserAvatar] = useState();
  const [bounceValue, setBounceValue] = useState(new Animated.Value(-250));
  const [backgroundColor, setBackgroundColor] = useState(
    props.route.params['backgroundColor']
  );
  const { userName, colors } = props.route.params;

  //component mounting check if user is connected to internet
  useEffect(() => {
    NetInfo.fetch().then((connection) => {
      setIsConnected(connection.isConnected);
    });
  }, []);

  //listening for connection state changes
  useEffect(() => {
    if (isConnected) {
      colRef = collection(db, 'messages');
      let unsubscribe = onSnapshot(colRef, onCollectionUpdate);

      return () => unsubscribe();
    } else {
      getMessages();
    }
  }, [isConnected]);

  //calling to save messages to AsyncStorage when message state is updated
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  //change Day color
  const renderDay = (props) => {
    return <Day {...props} textStyle={{ color: 'white' }} />;
  };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return <InputToolbar {...props} />;
    }
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

  //handling updates to messages
  const onCollectionUpdate = (querySnapshot) => {
    const messageArray = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();

      if (data.system) {
        messageArray.push({
          _id: data.id,
          text: data.text,
          createdAt: data.createdAt,
          system: data.system,
        });
      } else {
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
      }
    });
    setMessages(messageArray.sort((a, b) => b.createdAt - a.createdAt));
  };

  const getMessages = async () => {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      setMessages(JSON.parse(messages));
    } catch (e) {
      console.log(e.message);
    }
  };

  const saveMessages = async () => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteMessages = async (message) => {
    try {
      await AsyncStorage.removeItem('messages');
      setMessages([]);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onSend = (messages = []) => {
    //set messages and savemessages
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    //send to firebase if user is online
    if (isConnected) {
      addDoc(colRef, {
        _id: messages[0]._id,
        text: messages[0].text || '',
        createdAt: Date.parse(messages[0].createdAt),
        user: messages[0].user,
        image: messages[0].image || null,
        location: messages[0].location || null,
      });
    }
  };

  const handleProfilePress = () => {
    if (profileView) {
      setProfileView(false);
      Animated.spring(bounceValue, {
        toValue: profileView ? -250 : 0,
        velocity: 3,
        tension: 2,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
  };

  const handleLogOut = () => {
    props.navigation.navigate('Welcome');
  };

  const handleProfileClick = () => {
    setProfileView(!profileView);
    Animated.spring(bounceValue, {
      toValue: profileView ? -250 : 0,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.topBar}>
        <TouchableOpacity
          accessibilityRole="button"
          style={[
            styles.profileAvatar,
            {
              backgroundColor: 'white',
            },
          ]}
          onPress={() => handleProfileClick()}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          styles.profileView,
          {
            transform: [{ translateX: bounceValue }],
          },
        ]}
      >
        <ProfileSlide
          picturePress={() => handleProfileClick()}
          backgroundChange={(clr) => handleBackgroundChange(clr)}
          userName={userName}
          colors={colors}
          backgroundColor={backgroundColor}
          logOut={() => handleLogOut()}
        />
      </Animated.View>
      {/* <TouchableWithoutFeedback onPress={() => handleProfilePress()}> */}
        <View style={styles.chatBox}>
          <GiftedChat
            messages={messages}
            renderSystemMessage={renderSystemMessage}
            renderInputToolbar={renderInputToolbar}
            renderDay={renderDay}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: 1,
            }}
            alignTop={false}
          />
        </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatBox: {
    flex: 1,
    //if android
    marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0,
  },
  topBar: {
    height: StatusBar.currentHeight + 50,
    paddingTop: 60,
    paddingLeft: 10,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    //align items to right
    alignItems: 'flex-start',
    zIndex: 100,
  },
  header: {
    backgroundColor: '#fff',
    height: 50,
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  headerText: {
    color: 'black',
    justifyContent: 'center',
    fontSize: 30,
    paddingLeft: 10,
  },
  profileAvatar: {
    width: 30,
    height: 30,
    aligncontent: 'end',
    justifyContent: 'center',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  profileView: {
    position: 'absolute',
    top: 50,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: 'white',
    zIndex: 100,
  },
});
