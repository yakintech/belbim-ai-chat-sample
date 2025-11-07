import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMainScreen from '../../screens/profile/ProfileMainScreen';
import LoginRegisterScreen from '../../screens/profile/LoginRegisterScreen';
import ConfirmCodeScreen from '../../screens/profile/ConfirmCodeScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileMainScreen} />
    <Stack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
  </Stack.Navigator>
}

export default ProfileStack