import React from 'react'
import { StyleSheet, TextInput as DefaultTextInput } from 'react-native';

export default function TextInput({state, setState, placeholder, error, style, textAlign, keyboardType,}) {
  return (
    <DefaultTextInput
      value={state || null}
      placeholder={placeholder || null}
      placeholderTextColor={error === true ? 'red' : "#888"}
      style={[styles.input, style]}
      textAlign={!!textAlign ? textAlign : 'left'}
      onChangeText={(x)=> setState(x)}
      keyboardType={!!keyboardType ? keyboardType : 'default'}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderRadius: 5,
    color: 'black',
    height: 60,
    margin: 12,
    padding: 16,
    fontSize: 16,
  },
})