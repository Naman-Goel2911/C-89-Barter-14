import * as React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SignupLogin from './screens/SignupLoginScreen'
import {AppDrawerNavigator} from './components/AppDrawerNavigator'

export default class App extends React.Component{
  render()
  {
    return(      
        <AppContainer />
    )
  }
}

const switchNavigator = createSwitchNavigator({
  SignUpScreen: {screen: SignupLogin},
  Drawer: {screen: AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator)

