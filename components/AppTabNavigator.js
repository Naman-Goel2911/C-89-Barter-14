import * as React from 'react';
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BarterRequestScreen from '../screens/BarterRequestScreen'
import SearchScreen from '../screens/SearchScreen'

const TabNavigator = createBottomTabNavigator({
    SearchScreen: {screen: SearchScreen, 
      navigationOptions: {
          tabBarIcon: <Image 
              source = {require('../assets/search.jpg')}
              style = {{width: 20, height: 20}}
          />,
          tabBarLabel: "Search Requests"
      }},
      BarterScreen: {screen: BarterRequestScreen,
          navigationOptions: {
              tabBarIcon: <Image 
                  source = {require('../assets/requests.jpg')}
                  style = {{width: 20, height: 20}}
              />,
              tabBarLabel: "Barter Requests"
          }
      }
  })

export default TabNavigator