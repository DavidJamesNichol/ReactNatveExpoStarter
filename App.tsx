import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Toast from 'react-native-toast-message';
import { UserProvider } from "./components/Context/UserContext"
import Modal from './components/Modal';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <Modal />
          <Toast ref={(ref) => Toast.setRef(ref)} />
          <StatusBar />
        </SafeAreaProvider>
      </UserProvider>
      
    );
  }
}
