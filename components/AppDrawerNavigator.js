import * as React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import AppTabNavigator from './AppTabNavigator'
import CustomSidebarMenu from './CustomSidebarMenu'
import SettingsScreen from '../screens/SettingsScreen'
import MyBarters from '../screens/MyBarters'
import NotificationScreen from '../screens/NotificationScreen'
import { RFValue } from 'react-native-responsive-fontsize'
import {Icon} from 'react-native-elements'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'home'
            type = 'fontawesome5'
            />,
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'settings'
            type = 'fontawesome5'
            />,
            drawerLabel: 'Settings'
        }
    },
    Notifications: {
        screen: NotificationScreen,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'bell'
            type = 'font-awesome'
            />,
            drawerLabel: 'Notifications'
        }
    },
    Barters: {
        screen: MyBarters,
        navigationOptions: {
            drawerIcon: <Icon 
            name = 'gift'
            type = 'font-awesome'
            />,
            drawerLabel: 'Barters'
        }
    },
    },
    {
        contentComponent: CustomSidebarMenu
    },
    {
        initialRouteName: 'Home'
    }
)
