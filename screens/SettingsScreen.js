import * as React from 'react'
import {Text, View} from 'react-native'
import {Header} from 'react-native-elements'

export default class SettingsScreen extends React.Component{
    render()
    {
        return(
            <View>
                <Header
                backgroundColor = {'#9c8210'}
                centerComponent = 
                {{
                    text: 'Barter',
                    style: { color: '#fff', fontSize: 20 },
                }}
                />
                <Text>Settings Screen</Text>
            </View>
        )
    }
}