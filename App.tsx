import { View, Text } from 'react-native'
import React from 'react'
import TabMain from './src/navigation/tab'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaListener, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserProvider from './src/context/UserContext';
import ChatStack from './src/navigation/stack/ChatStack';


const linking : any  = {
  prefixes: ['aichatassistant://'],
  config: {
    screens: {
      ProfileStack: {
        screens: {
          ProfileMainScreen: 'profile'
        },
      },
      ChatStack: {
        screens: {
          NewChatScreen: 'chat/:chatId'
        },
      },
    },
  },
}

const App = () => {
  return <>
    <NavigationContainer linking={linking}>
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