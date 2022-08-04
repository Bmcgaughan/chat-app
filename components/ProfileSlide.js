import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';

export default function ProfileSlide(props) {
  const [bounceValue, setBounceValue] = useState(new Animated.Value(-55));

  const { colors, backgroundColor } = props;

  const handleClick = () => {
    props.picturePress();
  };

  const handleColorChooser = () => {
    props.handleEdit();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={styles.colorChooseWrapper}></Animated.View>
      <View style={styles.profileWrapper}>
        <TouchableOpacity
          style={styles.profilePicture}
          onPress={() => handleClick()}
        >
          <Image
            source={require('../assets/avatar.jpeg')}
            style={styles.profileIcon}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.menuName}>
        <Text style={styles.userNameText}>{props.userName}</Text>
      </View>
      <View style={styles.menuItem}>
        <Image
          source={require('../assets/colorchoose.png')}
          style={styles.menuIcon}
        />
        <TouchableOpacity onPress={() => handleColorChooser()}>
          <Text style={styles.text}>Change Background Color</Text>
        </TouchableOpacity>
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
    borderRadius: 50,
  },
  menuName: {
    height: 50,
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  menuIcon: {
    height: 20,
    width: 20,
    marginRight: 10,
  },

  userNameText: {
    fontSize: 20,
  },
  text: {},

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
