import * as React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import UserContext from "./Context/UserContext"
import { Text, View } from 'react-native'

export default function NotificationsButton() {
  const userContext = React.useContext(UserContext)
  const { token } = userContext
  let newNotifications = userContext.notifications.filter(x => x.new === true)
  let style
  let show
  if (newNotifications.length < 1) {
    show = styles.hide
  }
  else if (newNotifications.length < 10) {
    style = styles.numberUnderNine
    show = styles.number
  }
  else {
    style = styles.numberOverNine
    show = styles.number
  }
  if (!!token) {
    return (
      <View style={styles.container}>
        <Icon
          size={30}
          style={{marginLeft: 16}}
          name="notifications-none"
          // Make the below drop a modal when ready
          onPress={() => userContext.openModal()}
          // onPress={() => alert('make context work, then hook this up to context')}
        />
        <Text style={[style, show]}>{newNotifications.length}</Text>
      </View>
    )
  }
  else {
    return null
  }
}

const styles = {
  container: {
    alignItems: 'center',
    // backgroundColor: '#f1f1f1',
    position: 'relative',
  },
  hide: {
    display: 'none',
  },
  number: {
    backgroundColor: 'red',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 4,
    position: 'absolute',
  },
  numberOverNine: {
    borderRadius: 50,
    fontSize: 8,
    right: -6,
    top: -4,
  },
  numberUnderNine: {
    borderRadius: 100,
    fontSize: 8,
    right: -8,
    top: -4,
    width: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    textAlign: 'left',
    width: '80%',
  },
}