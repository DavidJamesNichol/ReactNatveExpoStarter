import axios from 'axios'
import Toast from 'react-native-toast-message';

export const CreateAccount = async (payload) => {
  try {
    let result = await axios({
      method: "post",
      url: `localhost:5000/users/register`,
      data: {
        ...payload
      },
      headers: {
        Accept: "*/*",
        "content-type": "application/json",
      },
    }).then((res) => {
      Toast.show({type: 'success', text1: 'Success! Your account has been made!',})
      return {token: res.data.token, bool: true, user: res.data.user, logs: res.data.logs.logs}
    }).catch((err) => {
      Toast.show({type: 'error', text1: 'Error, please try again.', text2: 'If the problem persists, try resetting your password.'})
      return {error: err, bool: false}
    })
    return result
  } catch (error) {
    Toast.show({type: 'error', text1: 'Error, please try again.', text2: 'If the problem persists, try resetting your password to see if you already have an account.'})
    return {error, bool: false}
  }
};

export const SignIn = async (payload) => {
  try {
    let result = await axios({
      method: "post",
      url: `localhost:5000/users/sign-in`,
      data: {
        ...payload
      },
      headers: {
        Accept: "*/*",
        "content-type": "application/json",
      },
    }).then((res) => {
      Toast.show({type: 'success', text1: `Welcome back, ${payload.email}`,})
      return {token: res.data.token, bool: true, user: res.data.user, logs: res.data.logs.logs}
    }).catch((err) => {
      Toast.show({type: 'error', text1: 'Error, please try again.', text2: 'If the problem persists, try resetting your password.'})
      return {error: err, bool: false}
    })
    return result
  } catch (error) {
    Toast.show({type: 'error', text1: 'Error, please try again.', text2: 'If the problem persists, try resetting your password.'})
    return {error, bool: false}
  }
};