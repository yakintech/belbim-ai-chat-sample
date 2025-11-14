import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReportMainScreen from '../../screens/report/ReportMainScreen';

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ReportMain" component={ReportMainScreen} />
    </Stack.Navigator>
  )
}

export default ReportStack