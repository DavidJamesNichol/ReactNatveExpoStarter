import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import LogInScreen from '../screens/LogInScreen';
import UserContext from '../components/Context/UserContext';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();


function RootNavigator() {

  const userContext = React.useContext(UserContext)
  const { token, } = userContext
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {
        !!token ?
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        :
        <Stack.Screen name="LogIn" component={LogInScreen} />
      }
    </Stack.Navigator>
  )
}