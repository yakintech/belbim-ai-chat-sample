import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStack from '../stack/ChatStack';
import HistoryStack from '../stack/HistoryStack';
import ProfileStack from '../stack/ProfileStack';

const Tab = createBottomTabNavigator();



const TabMain = () => {
    return <>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HistoryStack" component={HistoryStack} />
            <Tab.Screen name="ChatStack" component={ChatStack} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    </>
}

export default TabMain