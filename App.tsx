import React from 'react'
import TabMain from './src/navigation/tab'
import { NavigationContainer } from '@react-navigation/native';
import {  SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import UserProvider from './src/context/UserContext';
import { I18nextProvider } from 'react-i18next';
import i18n from  './src/translation/i18n';


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
  <I18nextProvider i18n={i18n}>
    <NavigationContainer linking={linking}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
          <UserProvider>
            <TabMain />

          </UserProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </NavigationContainer>
    </I18nextProvider>
  </>
}

export default App