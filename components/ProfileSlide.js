import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function ProfileSlide(props) {
  const { colors, backgroundColor } = props;
  useEffect(() => {}, []);

  const handleClick = () => {
    props.picturePress();
  };

  const handleBackgroundChange = (color) => {
    props.backgroundChange(color);
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileWrapper}>
        <TouchableOpacity
          style={styles.profilePicture}
          onPress={() => handleClick()}
        >
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileIcon}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.menuName}>
        <Text style={styles.userNameText}>{props.userName}</Text>
      </View>
      <View style={styles.menuItem}>
        <Text style={styles.text}>Change Background Color</Text>
        <View style={styles.colorChooseWrapper}>
          <TouchableOpacity
            accessibilityRole="button"
            style={[
              styles.colorIcon,
              {
                backgroundColor: colors.black,
                borderWidth: backgroundColor === colors.black ? 3 : 0,
                borderColor: backgroundColor === colors.black ? 'red' : '#000',
              },
            ]}
            onPress={() => handleBackgroundChange(colors.black)}
          ></TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            style={[
              styles.colorIcon,
              {
                backgroundColor: colors.purple,
                borderWidth: backgroundColor === colors.purple ? 3 : 0,
                borderColor: backgroundColor === colors.purple ? 'red' : '#000',
              },
            ]}
            onPress={() => props.backgroundChange(colors.purple)}
          ></TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            style={[
              styles.colorIcon,
              {
                backgroundColor: colors.grey,
                borderWidth: backgroundColor === colors.grey ? 3 : 0,
                borderColor: backgroundColor === colors.grey ? 'red' : '#000',
              },
            ]}
            onPress={() => props.backgroundChange(colors.grey)}
          ></TouchableOpacity>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            style={[
              styles.colorIcon,
              {
                backgroundColor: colors.green,
                borderWidth: backgroundColor === colors.green ? 3 : 0,
                borderColor: backgroundColor === colors.green ? 'red' : '#000',
              },
            ]}
            onPress={() => props.backgroundChange(colors.green)}
          ></TouchableOpacity>
        </View>
      </View>
      <View style={styles.logOut}>
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          onPress={() => props.logOut()}
        >
          <Text style={styles.logOutText}>Log Out</Text>
        </TouchableOpacity>
        <Image
          source={require('../assets/logOut.png')}
          style={styles.logOutIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileWrapper: {
    alignItems: 'center',
  },
  profilePicture: {
    marginTop: 50,
    height: 75,
    width: 75,
    borderRadius: 50,
    justifyContent: 'center',
  },
  profileIcon: {
    height: '100%',
    width: '100%',
  },
  menuName: {
    height: 50,
    alignItems: 'center',
  },
  menuItem: {
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  userNameText: {
    fontSize: 20,
  },
  text: {},

  colorChooseWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingTop: 20,
  },

  colorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  logOut: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 110,
    paddingRight: 20,
  },
  logOutText: {
    fontSize: 15,
  },
  logOutIcon: {
    height: 20,
    width: 20,
    marginLeft: 10,
  },
});
