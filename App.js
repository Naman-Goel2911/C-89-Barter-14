import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import SignupLogin from './screens/SignupLoginScreen'
import SearchScreen from './screens/SearchScreen'
import BarterRequestScreen from './screens/BarterRequestScreen'

export default class App extends React.Component{
  render()
  {
    return(
      
        <AppContainer />

    )
  }
}

const TabNavigator = createBottomTabNavigator({
  SearchScreen: {screen: SearchScreen, 
    navigationOptions: {
        tabBarIcon: <Image 
            source = {require('./assets/search.jpg')}
            style = {{width: 20, height: 20}}
        />,
        tabBarLabel: "Search Requests"
    }},
    BarterScreen: {screen: BarterRequestScreen,
        navigationOptions: {
            tabBarIcon: <Image 
                source = {require('./assets/requests.jpg')}
                style = {{width: 20, height: 20}}
            />,
            tabBarLabel: "Barter Requests"
        }
    }
})

const SwitchNavigator = createSwitchNavigator({
  SignUpScreen: {screen: SignupLogin},
  BottomTab: {screen: TabNavigator}
})

const AppContainer = createAppContainer(SwitchNavigator)

