import { View, Text } from 'react-native'
import React from 'react'
import TabMain from './src/navigation/tab'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaListener, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserProvider from './src/context/UserContext';


const App = () => {
  return <>
    <NavigationContainer>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <UserProvider>
            <TabMain />
          </UserProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
  </>
}

export default App