import * as React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import UserDetailsScreen from '../screens/UserDetailsScreen'
import SearchScreen from '../screens/SearchScreen'

export const AppStackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: SearchScreen,
        navigationOptions: {
            headerShown: false
        }
    },
    UserDetails: {
        screen: UserDetailsScreen,
        navigationOptions: {
            headerShown: true
        }
    },
},
{initialRouteName: 'DrawerNavigator'}
)