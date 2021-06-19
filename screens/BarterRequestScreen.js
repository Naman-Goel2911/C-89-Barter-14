import * as React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { KeyboardAvoidingViewBase } from 'react-native'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class BarterRequestScreen extends React.Component{
    constructor()
    {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            itemName: '',
            itemDescription: ''
        }
    }

    createUniqueId()
    {
        return Math.random().toString(36).substring(7)
    }

    addItem = (itemName, itemDescription) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('itemRequests').add({
            'user_id': userId,
            'item_name': itemName,
            'item_description': itemDescription,
            'request_id': randomRequestId
        })
        
        this.setState({
            itemName: '',
            itemDescription: ''
        })

        return alert('Barter Requested Successfully');
    }

    render()
    {
        return(
            <SafeAreaProvider>
                <View>
                    <MyHeader 
                    title = 'Barter' 
                    navigation = {this.props.navigation}
                    />
                    <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'Item Name'
                        onChangeText = {(text)=> {
                            this.setState({
                                itemName: text
                            })
                        }}
                        value = {this.state.itemName}
                        />
                        <TextInput 
                        style = {styles.formTextInput}
                        placeholder = 'Item Description'
                        multiline = {true}
                        numberOfLines = {10}
                        onChangeText = {(text)=> {
                            this.setState({
                                itemDescription: text
                            })
                        }}
                        value = {this.state.itemDescription}
                        />
                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=> {
                            this.addItem(this.state.itemName, this.state.itemDescription)
                        }}
                        >
                            <Text>Request</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({ 
    keyBoardStyle : { 
        flex:1, 
        alignItems:'center', 
        justifyContent:'center' 
    }, 
        formTextInput:{ 
            width:"75%", 
            height:35, 
            alignSelf:'center', 
            borderColor:'#ffab91', 
            borderRadius:10, 
            borderWidth:1, 
            marginTop:20, 
            padding:10, 
        }, 
        button:{ 
            alignSelf: 'center', 
            width:"75%", 
            height:50, 
            justifyContent:'center', 
            alignItems:'center', 
            borderRadius:10, 
            backgroundColor:"#ff5722", 
            shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 8, 
        }, 
        shadowOpacity: 0.44, 
        shadowRadius: 10.32, 
        elevation: 16, 
        marginTop:20 
    }, 
    })