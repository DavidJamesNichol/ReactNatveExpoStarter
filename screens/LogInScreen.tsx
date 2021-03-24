import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import UserContext from '../components/Context/UserContext';
import { Text, ScrollView, View, FlatList } from '../components/Themed';
import TextInput from '../components/TextInput';
import useValidateEmail from '../hooks/useValidateEmail'
import useValidatePassword from '../hooks/useValidatePassword'

export default function SignInScreen({navigation}) {

  const [showLogin, setShowLogin] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [password, setPassword] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)

  const userContext = React.useContext(UserContext)
  const { token, signIn, signUp, } = userContext

  const setEmailText = (x) => {
    setEmail(x)
    setEmailError(false)
  }

  const setPasswordText = (x) => {
    setPassword(x)
    setPasswordError(false)
  }

  const handleSubmit = () => {
    // Logic for the create account functionality
    if (useValidateEmail(email) === false) {
      setEmailError(true)
    } else if (useValidatePassword(password) === false) {
      setPasswordError(true)
    }
    else {
      setEmailText(email)
      setPasswordText(password)
      if (showLogin === false) {
        signUp({
          email, 
          password
        })
      }
      // Logic for the login functionality
      else {
        signIn({
          email, 
          password,
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
      {
        showLogin === true ?
        'Log In'
        :
        'Sign Up'
      }
      </Text>
      <View style={styles.loginContainer}>
        <TextInput
          state={email}
          setState={setEmailText}
          placeholder={'Email@email.com'}
          error={emailError}
        />
          <View
            style={{display: emailError ? 'flex' : 'none'}}
          >
            <Text style={styles.errorContainer}>
              Please double check that you used a legitimate email
            </Text>
          </View>

        <TextInput
          state={password}
          setState={setPasswordText}
          placeholder={'********'}
          error={passwordError}
        />

        <View
          style={{display: passwordError ? 'flex' : 'none'}}
        >
          <Text style={styles.errorContainer}>
            Passwords must include at least 1 uppercase letter, 1 special character, and 1 number for your protection
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button onPress={handleSubmit} title='Submit' style={styles.button}/>
          <Text style={styles.changeText} onPress={() => setShowLogin(!showLogin)}>
            {
              showLogin === true ?
              'Sign up'
              :
              'Log In'
            }
          </Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  changeText: {
    color: 'blue'
  },
  container: {
    paddingTop: 16,
  },
  errorContainer: {
    color: '#ff0000',
    padding: 12,
  },
  input: {
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderRadius: 5,
    color: 'black',
    height: 60,
    margin: 12,
    padding: 16,
    fontSize: 16,
  },
  loginContainer: {
    padding: 16,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlign: 'left',
    width: '80%',
  },
});