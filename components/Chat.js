import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Chat(props) {
  const { userName, backgroundColor } = props.route.params;

  return (
    <View
      style={[
        { flex: 1, justifyContent: 'center', alignItems: 'center' },
        { backgroundColor: backgroundColor },
      ]}
    >
      <Text style={styles.text}>Hello {userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 30,
  },
});
