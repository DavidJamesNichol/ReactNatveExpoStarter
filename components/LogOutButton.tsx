import * as React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import UserContext from "./Context/UserContext"
import { Text, View } from 'react-native'

export default function LogOutButton() {
  const userContext = React.useContext(UserContext)
  const { token, logOut } = userContext
  if (!!token) {
    return (
      <View style={styles.container}>
        <Icon
          size={30}
          style={{marginRight: 16}}
          name="logout"
          onPress={() => logOut()}
        />
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
}