import React, { Component } from 'react';
import { StyleSheet, Animated, View, Text, Image } from 'react-native';
import { createResponder } from 'react-native-gesture-responder';

export default class ThemeChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(0),
      y: new Animated.Value(500),
      showBar: true,
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
    });
  }

  pan = (gestureState) => {
    console.log('pan');
    const { x, y } = this.state;
    const maxX = 0;
    const minX = 0;
    const maxY = 5000;
    const minY = 500;

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

    console.log(newY);

    if (newY > 725) {
      this.setState({ showBar: false });
    }
    x.setValue(newX);
    y.setValue(newY);
  };
  render() {
    const { x, y } = this.state;
    const imageStyle = { left: x, top: y };

    return (
      <Animated.View
        style={[
          { display: this.state.showBar ? null : 'none' },
          styles.dragContainer,
          imageStyle,
        ]}
        {...this.Responder}
      >
        <View style={styles.dragTop}>
          <Image
            style={styles.lineImage}
            source={require('../assets/line.png')}
          />
        </View>
        <View style={styles.menuHeader}>
          <Text style={styles.menuText}>Dark Mode</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  dragContainer: {
    position: 'absolute',
    bottom: 0,
    left: 50,
    width: '100%',
    height: 300,
    backgroundColor: 'red',
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
    width: '100%',
    paddingTop: 10,
    borderBottomWidth: .5,

  },
  menuText: {
    paddingLeft: 20,
    fontSize: 25,
  },
});
