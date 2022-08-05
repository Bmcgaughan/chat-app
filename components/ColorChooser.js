import React, { useState} from 'react';

import { StyleSheet, View, TouchableOpacity } from 'react-native';

const colors = {
  black: '#090C08',
  purple: '#474056',
  grey: '#8A95A5',
  green: '#B9C6AE',
};

//takes current background color
//can take a click function as a prop backgroundChange
//can take optional styles as a prop

export default function ColorChooser(props) {
  const [backgroundColor, setBackgroundColor] = useState(
    props.backgroundColor ? props : 'black'
  );

  const handleBackgroundChange = (color) => {
    setBackgroundColor(color);
    if (props.backgroundChange) {
      props.backgroundChange(color);
    }
  };

  return (
    <View style={[styles.colorChooseWrapper, props.style]}>
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
        onPress={() => handleBackgroundChange(colors.purple)}
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
        onPress={() => handleBackgroundChange(colors.grey)}
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
        onPress={() => handleBackgroundChange(colors.green)}
      ></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  colorChooseWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },

  colorIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
