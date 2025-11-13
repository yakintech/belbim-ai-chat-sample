import { View, Text } from 'react-native'
import React, { use, useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewChatScreen from '../../screens/chat/NewChatScreen';
import { AuthContextType, userContext } from '../../context/UserContext';
import PublicScreen from '../../screens/public';


const Stack = createNativeStackNavigator();

const ChatStack = () => {

  const { isLoginedIn } = useContext(userContext) as AuthContextType

  return <>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NewChatScreen" component={isLoginedIn ? NewChatScreen : PublicScreen} />
    </Stack.Navigator>
  </>
}

export default ChatStack



