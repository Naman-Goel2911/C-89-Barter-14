import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignupLogin from './screens/SignupLoginScreen'

export default class App extends React.Component{
  render()
  {
    return(
      <View>
        <SignupLogin />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});
