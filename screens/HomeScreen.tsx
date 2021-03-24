import * as React from 'react';
import { StyleSheet, Button } from 'react-native';

import TextInput from '../components/TextInput';
import { Text, View } from '../components/Themed';
import useNotEmpty from '../hooks/useNotEmpty';

export default function HomeScreen() {
  const [title, setTitle] = React.useState('Home')
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        state={title}
        setState={setTitle}
        placeholder={'edit state'}
        textAlign={'center'}
      />
      <Button
        title='useNotEmpty'
        onPress={() => useNotEmpty({
          test: 'asdf',
          test1: 'asdf1',
          test2: 'asdf2',
          empty: '',
          empty1: '',
          empty2: '',
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
