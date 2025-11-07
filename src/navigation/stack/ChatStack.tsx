import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewChatScreen from '../../screens/chat/NewChatScreen';


const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return <>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="NewChatScreen" component={NewChatScreen} />
    </Stack.Navigator>
  </>
}

export default ChatStack