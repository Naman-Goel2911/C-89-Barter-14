import * as React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import * as firebase from 'firebase'
import db from '../config'

export default class SignupLogin extends React.Component{
    
    constructor()
    {
        super();
        this.state = {
            emailID: '',
            password: ''
        }
    }

    userLogin = (email, password) => {
        
        firebase.auth().signInWithEmailAndPassword(email, password).
        then(() => {
                return alert('Successfully logged in')
            })
        .catch((error)=> {
            var errorCode = error.code
            var errorMessage = error.errorMessage
            return alert(errorMessage)
        })
        }
    
        userSignUp = (email, password) => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response)=> {
                return alert('User added successfully')
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.errorMessage
                return alert(errorMessage)
            })
        }   

    render()
    {
        return(
            <SafeAreaProvider>
                <View>
                    <Header
                    backgroundColor = {'#9c8210'}
                    centerComponent = 
                    {{
                        text: 'Barter',
                        style: { color: '#fff', fontSize: 20 },
                    }}
                    />
                    <View>
                        <TextInput
                        style = {styles.loginBox}
                        placeholder = "abc@email.com"
                        keyboardType = 'email-address'
                        onChangeText = {(text)=> {
                            this.setState({
                                emailID: text
                            })
                        }}
                        />
                        <TextInput
                        style = {styles.loginBox}
                        placeholder = "Enter Password"
                        secureTextEntry = {true}
                        onChangeText = {(text)=> {
                            this.setState({
                                password: text
                            })
                        }}
                        />
                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{
                            this.userLogin(this.state.emailID, this.state.password)
                        }}
                        >
                            <Text style = {styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style = {styles.button}
                        onPress = {()=>{
                            this.userSignUp(this.state.emailID, this.state.password)
                        }}
                        >
                            <Text style = {styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaProvider>
        )
    }
}

const styles = StyleSheet.create({
    loginBox:{ 
        width: 300, 
        height: 40, 
        borderBottomWidth: 1.5, 
        borderColor : '#ff8a65', 
        fontSize: 20, 
        margin:10, 
        paddingLeft:10 
    }, 
    button:{
        width:300, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#ff9800", 
        shadowColor: "#000"
    },
    buttonText:{ 
        color:  '#ffff', 
        fontWeight: '200', 
        fontSize:   20,
    }, 
})