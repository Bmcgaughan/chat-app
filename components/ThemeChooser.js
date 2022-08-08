import React, { Component } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import { RadioButton } from 'react-native-paper';

import { createResponder } from 'react-native-gesture-responder';

class ThemeChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      showBar: true,
      bounceValue: new Animated.Value(1000),
      menuBounce: new Animated.Value(1000),
      darkMode: props.isDarkMode,
    };

    this.Responder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: (evt, gestureState) => {
        this.pan(gestureState);
      },
      onPanResponderTerminationRequest: () => true,
      onResponderSingleTapConfirmed: (evt, gestureState) => {},
      onResponderRelease: (evt, gestureState) => {
        const { x, y } = this.state;
        console.log(y);
        if (y._value < 200) {
          this.state.bounceValue.setValue(550 + y._value);
          this.state.menuBounce.setValue(0 + y._value);
          this.handleSnapTransition(550, this.state.bounceValue);
          this.handleSnapTransition(0, this.state.menuBounce);
          y.setValue(0);
        }

        // }
        // console.log(y);
        // console.log(y);
        // this.setState({ y: new Animated.Value(0) });
      },
    });
  }

  componentDidMount() {
    this.handleMenuTransition('up');
    setTimeout(() => {
      this.handleDragTransition('up');
    }, 105);
  }

  pan = (gestureState) => {
    const { x, y } = this.state;

    const maxX = 0;
    const minX = 0;
    const maxY = 5000;
    const minY = 0;

    const xDiff = gestureState.moveX - gestureState.previousMoveX;
    const yDiff = gestureState.moveY - gestureState.previousMoveY;
    let newX = x._value + xDiff;
    let newY = y._value + yDiff;

    if (newX < minX) {
      newX = minX;
    } else if (newX > maxX) {
      newX = maxX;
    }

    if (newY < minY) {
      newY = minY;
    } else if (newY > maxY) {
      newY = maxY;
    }

    x.setValue(newX);
    y.setValue(newY);

    if (newY > 200) {
      this.handleMenuTransition('down');
      this.handleDragTransition('down');
    }
  };

  handleDragTransition(direction) {
    Animated.spring(this.state.bounceValue, {
      toValue: direction === 'down' ? 1000 : 550,
      velocity: 3,
      tension: 0,
      friction: 15,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && direction === 'down') {
        this.setState({ showBar: false });
        this.props.showHideTheme();
      }
    });
  }

  handleMenuTransition(direction) {
    Animated.spring(this.state.menuBounce, {
      toValue: direction === 'down' ? 1000 : 0,
      velocity: 3,
      tension: 4,
      friction: 15,
      useNativeDriver: false,
    }).start();
  }

  handleSnapTransition(offset, source) {
    Animated.spring(source, {
      toValue: offset,
      velocity: 1,
      tension: 4,
      friction: 3,
      useNativeDriver: false,
    }).start();
  }

  setChecked() {
    this.props.darkMode(!this.state.darkMode);
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    const { x, y, bounceValue, menuBounce, darkMode } = this.state;
    const imageStyle = { left: x, top: y };
    const menuSyle = { left: x, top: y };

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            { display: this.state.showBar ? null : 'none' },
            styles.dragContainer,
            { backgroundColor: this.state.darkMode ? 'black' : 'white' },
            imageStyle,
            {
              transform: [{ translateY: bounceValue }],
            },
          ]}
          {...this.Responder}
        >
          <View style={styles.dragTop}>
            <Image
              style={styles.lineImage}
              source={require('../assets/line.png')}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            menuSyle,
            {
              transform: [{ translateY: menuBounce }],
            },
          ]}
        >
          <View style={{ top: 600 }}>
            <View
              style={[
                styles.menuBody,
                { backgroundColor: this.state.darkMode ? 'black' : 'white' },
              ]}
            >
              <Text
                style={[
                  styles.menuText,
                  { color: this.state.darkMode ? 'white' : 'black' },
                ]}
              >
                Dark Mode
              </Text>
              <View
                style={[
                  styles.menuRow,
                  { backgroundColor: this.state.darkMode ? 'black' : 'white' },
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: this.state.darkMode ? 'white' : 'black' },
                  ]}
                >
                  On
                </Text>
                <RadioButton
                  value="first"
                  status={darkMode ? 'checked' : 'unchecked'}
                  onPress={() => this.setChecked()}
                  disabled={false}
                  color={darkMode ? 'white' : 'black'}
                  uncheckedColor={darkMode ? 'white' : 'black'}
                />
              </View>
              <View
                style={[
                  styles.menuRow,
                  { backgroundColor: this.state.darkMode ? 'black' : 'white' },
                ]}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    { color: this.state.darkMode ? 'white' : 'black' },
                  ]}
                >
                  Off
                </Text>
                <RadioButton
                  value="second"
                  status={darkMode ? 'unchecked' : 'checked'}
                  onPress={() => this.setChecked()}
                  disabled={false}
                  color={darkMode ? 'white' : 'black'}
                  uncheckedColor={darkMode ? 'white' : 'black'}
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dragContainer: {
    position: 'absolute',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    elevation: 1000,
  },
  dragTop: {
    width: '100%',
    height: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lineImage: {
    paddingTop: 20,
    width: 100,
    height: 1,
  },
  menuHeader: {
    height: 75,
    width: '100%',
    paddingTop: 10,
    zIndex: 1000,
    elevation: 1000,
  },
  menuText: {
    paddingLeft: 20,
    fontSize: 25,
  },
  menuBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 300,
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 50,
    paddingTop: 20,
    zIndex: 1000,
    elevation: 1000,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  menuItemText: {
    fontSize: 20,
  },
});

export default ThemeChooser;
