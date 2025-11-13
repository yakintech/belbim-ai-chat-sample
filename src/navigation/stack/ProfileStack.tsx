import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileMainScreen from '../../screens/profile/ProfileMainScreen';
import LoginRegisterScreen from '../../screens/profile/LoginRegisterScreen';
import ConfirmCodeScreen from '../../screens/profile/ConfirmCodeScreen';
import { AuthContextType, userContext } from '../../context/UserContext';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {

  const { isLoginedIn } = useContext(userContext) as AuthContextType

  return <Stack.Navigator screenOptions={{ headerShown: false }}>

    {isLoginedIn ? (
      <>
        <Stack.Screen name="ProfileMainScreen" component={ProfileMainScreen} />
      </>
    ) : (
      <>
        <Stack.Screen name="LoginRegisterScreen" component={LoginRegisterScreen} />
        <Stack.Screen name="ConfirmCodeScreen" component={ConfirmCodeScreen} />
      </>
    )}
  </Stack.Navigator>
}

export default ProfileStack