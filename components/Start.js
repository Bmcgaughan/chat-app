import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

const backImage = require('../assets')

export default function Start(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: '../assets/back.png'}}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Text>Hello Start</Text>
        <Button
          title="Chat"
          onPress={() => props.navigation.navigate('Chat')}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
