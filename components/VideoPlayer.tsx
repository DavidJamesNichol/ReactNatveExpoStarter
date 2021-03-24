import * as React from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function App({uri, setPlayback}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.button}>
        <Button
          title={'go back'}
          onPress={() => setPlayback(false)
          }
        />
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  button: {
    bottom: 100,
    position: 'absolute',
    width: 100,
    left: windowWidth / 2 - 50,
  },
});