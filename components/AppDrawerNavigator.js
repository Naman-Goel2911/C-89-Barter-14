import {createDrawerNavigator} from 'react-navigation-drawer'
import AppTabNavigator from './AppTabNavigator'
import CustomSidebarMenu from './CustomSidebarMenu'
import SettingsScreen from '../screens/SettingsScreen'
import MyBarters from '../screens/MyBarters'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    Settings: {
        screen: SettingsScreen
    },
    Barters: {
        screen: MyBarters
    }
    },
    {
        contentComponent: CustomSidebarMenu
    },
    {
        initialRouteName: 'Home'
    }
)
