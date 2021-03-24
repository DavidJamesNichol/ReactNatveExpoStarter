import React, {useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { Camera as DefaultCamera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import { Ionicons } from '@expo/vector-icons';
import VideoPlayer from '../components/VideoPlayer'
import TextInput from '../components/TextInput'

export default function Camera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [videoLocation, setVideoLocation] = useState('');
  const [countDown, setCountDown] = useState(3);
  const [countDownText, setCountDownText] = useState(3);
  const [countDownActive, setCountDownActive] = useState(false)
  const [canPressRecord, setCanPressRecord] = useState(true)
  const [playback, setPlayback] = useState(false);
  const [cameraRef, setCameraRef] = useState(null)
  const [recording, setRecording] = useState(false)
  const [type, setType] = useState(DefaultCamera.Constants.Type.back);
  useEffect(() => {
      (async () => {
        const { status } = await DefaultCamera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const beginCountDown = async (time) => {
    // Show timer
    setCountDownActive(true)
    setCountDown(time - 1)
    // Still counting down
    if (time > 1) {
    setTimeout(() => {
        beginCountDown(time - 1)
      }, 1000)
    }
    // Once time elapses
    else {
      // Video stuff
      setRecording(true)
      let video = await cameraRef.recordAsync();
      setVideoLocation(video)
    }
  }


  return (
    <View style={{ flex: 1 }}>
      {
        playback === false ?
        <DefaultCamera style={{ flex: 1 }} type={type} ref={ref => {
          setCameraRef(ref) ;
    }}>

      {
        !!countDownActive === true ?
        <Text
          style={styles.countdownText}
        >
          {countDown}
        </Text>
        :
        null
      }
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'flex-end'
            }}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}>
              <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
              }}
              onPress={() => {
                setType(
                  type === DefaultCamera.Constants.Type.back
                    ? DefaultCamera.Constants.Type.front
                    : DefaultCamera.Constants.Type.back
                );
              }}>
              <TextInput 
                state={countDownText.toString()}
                setState={setCountDownText}
                keyboardType={'numeric'}
                style={{width: 50}}
              />
              
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
              if(cameraRef){
                let photo = await cameraRef.takePictureAsync();
                console.log('photo', photo);
              }
            }}>
              <View style={{ 
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: 'white',
                 height: 50,
                 width:50,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'}}
              >
                <View style={{
                   borderWidth: 2,
                   borderRadius:25,
                   borderColor: 'white',
                   height: 40,
                   width:40,
                   backgroundColor: 'white'}} >
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
              // Stops errors by making it impossible to start more than one countdown
              if(canPressRecord === true){
                setCanPressRecord(false)
                beginCountDown(countDownText)              
              } 
              // Finish recording
              else if (recording === true) {
                setRecording(false)
                cameraRef.stopRecording()
                // Unshow timer
                setCountDownActive(false)
                // Reset countDown with starting value
                setCountDown(countDownText)
                setPlayback(true)
                // Reset record button to be hit again
                setCanPressRecord(true)
              }
            }}>
              <View style={{ 
                 borderWidth: 2,
                 borderRadius:25,
                 borderColor: recording ? "blue":'red',
                 height: 50,
                 width:50,
                 display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center'}}
              >
                <View style={{
                   borderWidth: 2,
                   borderRadius:25,
                   borderColor: recording ? "blue":'red',
                   height: 40,
                   width:40,
                   backgroundColor: recording ? "blue":'red'
                  }} >
                </View>
              </View>
            </TouchableOpacity>
              </View>
          </View>
        </DefaultCamera>
        :
        <VideoPlayer
          uri={videoLocation.uri}
          setPlayback={setPlayback}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  countdownText: {
    fontSize: 36,
    color: 'red',
  }
})