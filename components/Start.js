import React, { useState, useEffect } from 'react';

import { SvgXml } from 'react-native-svg';

import { StatusBar } from 'expo-status-bar';

import ColorChooser from './ColorChooser';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import PersonIcon from '../assets/icon.svg';

const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

export default function Start(props) {
  const [userName, setUserName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(colors.black);
  const [searchIcon, setSearchIcon] = useState(true);
  const [userNameAlert, setUserNameAlert] = useState(false);

  const { height } = Dimensions.get('window');

  const handleUserInput = (text) => {
    if (text.length > 0) {
      setUserNameAlert(false);
    } else {
      setSearchIcon(true);
    }
    setUserName({ text });
  };

  const handleUserSubmit = () => {
    if (!userName.text || userName.text === '') {
      setUserNameAlert(true);
    } else {
      props.navigation.navigate('Chat', {
        userName: userName.text,
        backgroundColor: backgroundColor,
        colors: colors,
      });
    }
  };

  const handleBackgroundColor = (color) => {
    setBackgroundColor(color);
  };

  return (
    <View style={[styles.container, { height: height }]}>
      <ImageBackground
        source={require('../assets/back.png')}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>Chat-App</Text>
        </View>
        <View style={[styles.wrapper, { height: height * 0.44 }]}>
          {userNameAlert && (
            <Text style={styles.textAlert}>Please enter a name</Text>
          )}
          <View style={styles.inputWrapper}>
            <View
              style={[
                styles.searchIcon,
                { display: searchIcon ? null : 'none' },
              ]}
            >
              <PersonIcon width={25} height={25} />
            </View>

            <TextInput
              style={styles.textInput}
              onChangeText={(text) => handleUserInput(text)}
              value={userName.text}
              placeholder={'Your Name'}
              clearTextOnFocus={true}
            />
          </View>
          <Text style={styles.chooseText}>Choose Background Color</Text>

          <View style={styles.colorChooseWrapper}>
            {/* takes current backgroundColor, click function called backgroundChange, and optional styles */}
            <ColorChooser
              // backgroundColor={backgroundColor}
              backgroundChange={(clr) => handleBackgroundColor(clr)}
              style={styles.colorChooseWrapper}
            />
          </View>

          <View style={styles.chatButtonWrapper}>
            <Pressable
              onPress={() => handleUserSubmit()}
              style={styles.chatButton}
              accessible={true}
              accessibilityLabel="Navigate to Chat Screen"
              accessibilityHint="Navigate to Chat Screen"
            >
              <Text style={styles.buttonText}>Start Chatting</Text>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerBox: {
    width: '88%',
    alignItems: 'center',
  },

  searchIcon: {
    position: 'absolute',
    top: 32,
    left: 10,
  },

  headerText: {
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    paddingTop: 100,
  },

  wrapper: {
    width: '88%',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  inputWrapper: {
    width: '88%',
    alignItems: 'center',
    paddingTop: 20,
  },

  textInput: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 50,
  },

  chooseText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    marginRight: 'auto',
    paddingLeft: '6%',
    paddingTop: 30,
  },

  colorChooseWrapper: {
    marginRight: 'auto',
    paddingTop: 10,
    alignItems: 'center',
    width: '85%',
    paddingLeft: 5,
  },

  textAlert: {
    color: 'red',
    position: 'absolute',
    top: '58%',
    fontSize: 20,
  },

  text: {
    fontSize: 20,
    paddingBottom: 10,
    color: '#fff',
  },

  chatButtonWrapper: {
    paddingTop: 70,
    width: '88%',
  },

  chatButton: {
    height: 60,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
