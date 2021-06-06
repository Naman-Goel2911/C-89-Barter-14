import {createStackNavigator} from 'react-navigation-stack'
import UserDetailsScreen from '../screens/UserDetailsScreen'
import AppDrawerNavigator from './AppDrawerNavigator'

export const AppStackNavigator = createStackNavigator({
    DrawerNavigator: {
        screen: AppDrawerNavigator,
        navigationOptions: {
            headerShown: false
        }
    },
    UserDetails: {
        screen: UserDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
},
{initialRouteName: 'BookDonateList'}
)