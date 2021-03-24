import React, { Component, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { 
  CreateAccount, 
  SignIn, 
} from '../API/UserData'

let UserContext = createContext()

class UserProvider extends Component {

  state = {
    user: {},
    token: '',

    // Notifications
    showNotificationsModal: false,
    notifications: [
      {
        subject: 'What Gets Measured Gets Improved!',
        body: 'Familiarize yourself with our training log flow to make sure you are keeping track of your training data in our easy to record and analyze system',
        new: true,
        id: 2,
      },
      {
        subject: 'You Downloaded the App!',
        body: 'Hooray! Your experience with Gym just got 10 times better! Use our app to help you achieve your goals by: winning prizes, reading informative articles, watching our educational videos, setting up a training cycle, getting reminders to come work out on scheduled days, and tracking each session',
        new: false,
        id: 1,
      },
    ],
  }

  handleSave = async () => {
    await AsyncStorage.setItem("@state", JSON.stringify(this.state));
  };

  logOut = async () => {
    await AsyncStorage.setItem("@state", '');
    this.setState({
      token: '',
      loaded: false,
    })
  };

  signIn = async (payload) => {
    let result = await SignIn(payload)
    if (result.bool === true) {
      this.setState({
        user: result.user,
        token: result.token,
        logs: result.logs,
      })
      // need to prevent race condition
      setTimeout(() => {
        this.handleSave();
      }, 1000);
    }
  }

  signUp = async (payload) => {
    let result = await CreateAccount(payload)
    if (result.bool === true) {
      this.setState({
        user: result.user,
        logs: result.logs,
        token: result.token,
      })
      // need to prevent race condition
      setTimeout(() => {
        this.handleSave();
      }, 1000);
    }
  }

  // Notifications
  openModal = () => {
    if (this.state.showNotificationsModal === false) {
      this.setState({
        showNotificationsModal: !this.state.showNotificationsModal
      })
    }
    else {
      let newArr = this.state.notifications.map((x) => {
        x.new = false
        return x
      })
      this.setState({
        showNotificationsModal: !this.state.showNotificationsModal,
        notifications: newArr,
      })
    }
  }

  deleteNotifications = (id) => {
    let newArr = this.state.notifications.filter(x => x.id !== id)
    this.setState({
      notifications: newArr
    })
  }

  restart = async () => {
    let state = await AsyncStorage.getItem("@state");
    if (!!state) {
      state = JSON.parse(state)
      this.setState({
        ...state,
        loaded: true,
        retrievedData: false,
      })
      // this.retrieveData()
    }
  }

  componentDidMount = async () => {
    this.restart()
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          token: this.state.token,
          signIn: this.signIn,
          logOut: this.logOut,
          signUp: this.signUp,
          
          notifications: this.state.notifications,
          showNotificationsModal: this.state.showNotificationsModal,
          openModal: this.openModal,
          deleteNotifications: this.deleteNotifications,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserContext;

export { UserProvider }