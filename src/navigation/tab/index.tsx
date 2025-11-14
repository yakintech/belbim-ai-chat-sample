import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStack from '../stack/ChatStack';
import HistoryStack from '../stack/HistoryStack';
import ProfileStack from '../stack/ProfileStack';
import Icon from '@react-native-vector-icons/evil-icons';
import ReportStack from '../stack/ReportStack';

const Tab = createBottomTabNavigator();



const TabMain = () => {
    return <>
        <Tab.Navigator 
        screenOptions={
            ({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = '';

                    if(route.name === 'HistoryStack') {
                        iconName = 'clock';
                    } else if(route.name === 'ChatStack') {
                        iconName = 'comment';
                    } else if(route.name === 'ProfileStack') {
                        iconName = 'user';
                    }
                    else if(route.name === 'ReportStack') {
                        iconName = 'chart';
                    }

                    return <Icon name={iconName} size={35} color={color} />
                },
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })
        }
        
        >
            <Tab.Screen name="HistoryStack" component={HistoryStack} />
            <Tab.Screen name="ChatStack" component={ChatStack} />
            <Tab.Screen name="ReportStack" component={ReportStack} />
            <Tab.Screen name="ProfileStack" component={ProfileStack} />
        </Tab.Navigator>
    </>
}

export default TabMain