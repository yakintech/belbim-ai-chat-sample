import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../../screens/history/HistoryScreen';
import { AuthContextType, userContext } from '../../context/UserContext';
import PublicScreen from '../../screens/public';
import HistoryScreenSwr from '../../screens/history/HistoryScreenSwr';
import HistoryScreenReactQuery from '../../screens/history/HistoryScreenReactQuery';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {

  const { isLoginedIn } = useContext(userContext) as AuthContextType;

  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HistoryScreen" component={isLoginedIn ? HistoryScreen : PublicScreen} />
  </Stack.Navigator>
}

export default HistoryStack