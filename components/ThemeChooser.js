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
      darkMode: false,
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

    if (newY > 120) {
      this.handleMenuTransition('down');

      this.handleDragTransition('down');
    }
    x.setValue(newX);
    y.setValue(newY);
  };

  handleDragTransition(direction) {
    Animated.spring(this.state.bounceValue, {
      toValue: direction === 'down' ? 1000 : 600,
      velocity: 3,
      tension: 2,
      friction: 8,
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
      tension: 2,
      friction: 8,
      useNativeDriver: false,
    }).start();
  }

  setChecked() {
    console.log('clicked');
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    const { x, y, bounceValue, menuBounce, darkMode } = this.state;
    const imageStyle = { left: x, top: y };

    const menuYOffset = new Animated.Value(y._value + 600);

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
          <View
            style={[
              styles.menuHeader,
              { backgroundColor: this.state.darkMode ? 'black' : 'white' },
            ]}
          >
            <Text style={[styles.menuText, { color: this.state.darkMode ? 'white' : 'black' }]}>Dark Mode</Text>
          </View>

          <View
            style={[
              styles.menuBody,
              { backgroundColor: this.state.darkMode ? 'black' : 'white' },
            ]}
          >
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
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dragContainer: {
    width: '100%',
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dragTop: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lineImage: {
    paddingTop: 20,
    width: 200,
    height: 1,
  },
  draggable: {
    height: 50,
    width: 50,
  },
  menuHeader: {
    top: 600,
    height: 50,
    width: '100%',
    paddingTop: 10,
  },
  menuText: {
    paddingLeft: 20,
    fontSize: 25,
  },
  menuBody: {
    top: 600,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: 230,
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 50,
    paddingTop: 20,
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
