import React, { useState, useEffect, useContext } from 'react';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as firebase from 'firebase/app';
import { getStorage, uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

//firebase config settings and initialization
import firebaseConfig from '../fbaseconfig.js';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default function CustomActions(props) {
  const { showActionSheetWithOptions } = useActionSheet();

  //function taking local image uri and posting to firebase storage
  //it then returns the firebase uri to display in the chat component
  const uploadImage = async (uri) => {
    const img = await fetch(uri);
    const imgBlob = await img.blob();

    const imageNameBefore = uri.split('/');
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const imageRef = ref(storage, imageName);

    return uploadBytes(imageRef, imgBlob).then(async (snapshot) => {
      imgBlob.close();
      return getDownloadURL(snapshot.ref)
        .then((url) => {
          return url;
        })
        .catch((error) => {
          console.log('error', error);
        });
    });
  };

  //prompt user to select image from their device and asks for permission
  //calls uploadImage function to upload image to firebase storage
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      if (status === 'granted') {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!result.cancelled) {
          const imageUrl = await uploadImage(result.uri);
          props.onSend({
            image: imageUrl,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lets user take picture for message and asks for permission
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      if (status === 'granted') {
        let launchResult = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
        }).catch((error) => console.log(error));

        if (!launchResult.cancelled) {
          const photoUrl = await uploadImage(launchResult.uri);
          props.onSend({
            image: photoUrl,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //getting user location and getting coordinates - asks for permission
  const sendLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    try {
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({}).catch(
          (error) => console.log(error)
        );

        if (location) {
          props.onSend({
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //opens action menu
  const onActionPress = () => {
    const options = [
      'Choose Photo from Gallery',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            sendLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel="Message Options"
      accessibilityHint="Send Image, Take Photo, or send Location"
      style={[styles.container]}
      onPress={() => onActionPress()}
    >
      <View style={[styles.wrapper, props.wrapperStyle]}>
        <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
