import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatStack from '../stack/ChatStack';
import HistoryStack from '../stack/HistoryStack';
import ProfileStack from '../stack/ProfileStack';
import Icon from '@react-native-vector-icons/evil-icons';
import ReportStack from '../stack/ReportStack';
import { useTranslation } from 'react-i18next';



const Tab = createBottomTabNavigator();



const TabMain = () => {

    const { t } = useTranslation();

    return <>
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName = '';

                        if (route.name === 'HistoryStack') {
                            iconName = 'clock';
                        } else if (route.name === 'ChatStack') {
                            iconName = 'comment';
                        } else if (route.name === 'ProfileStack') {
                            iconName = 'user';
                        }
                        else if (route.name === 'ReportStack') {
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
            <Tab.Screen
                name="HistoryStack"
                component={HistoryStack}
                options={{ title: t('tab.history') }}
            />
            <Tab.Screen
                name="ChatStack"
                component={ChatStack}
                options={{ title: t('tab.chat') }} />
            <Tab.Screen
                name="ReportStack"
                component={ReportStack}
                options={{ title: t('tab.report') }} />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{ title: t('tab.profile') }} />
        </Tab.Navigator>
    </>
}

export default TabMain