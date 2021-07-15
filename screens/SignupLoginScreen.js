import * as React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Header} from 'react-native-elements';
import * as firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'
import { RFValue } from 'react-native-responsive-fontsize';

export default class SignupLogin extends React.Component{
    
    constructor()
    {
        super();
        this.state = {
            emailID: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: '',
            currencyCode: ''
        }
    }

    userLogin = (email, password) => {
        
        firebase.auth().signInWithEmailAndPassword(email, password).
            then(() => {
                    this.props.navigation.navigate('SearchScreen')
                })
        .catch((error)=> {
            var errorCode = error.code
            var errorMessage = error.errorMessage
            return alert(errorMessage)
        })
    }
    
        userSignUp = (email, password, confirmPassword) => {
            if(password !== confirmPassword){
                return alert('Password does not match\nCheck your password')
            }
            else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(()=> {
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    address: this.state.address,
                    email_id: this.state.emailId,
                    currencyCode: this.state.currencyCode,
                    isExchangeRequestActive: false
                })
                return alert('User added successfully',
                '',
                [
                    {text: 'Ok', onPress: ()=>
                        this.setState({
                            isModalVisible: false
                        })
                    },
                ])
            })
            .catch((error) => {
                var errorCode = error.code
                var errorMessage = error.message
                return alert(errorMessage)
            })
            }
            
        }  
        
        showModal = () => {
            return(
            <Modal
            animationType = 'fade'
            transparent = {true}
            visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                    <ScrollView style = {{width: "100%"}}>
                        <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text  style = {styles.modalTitle}>Registration</Text>
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'First Name'}
                            maxLength = {8}
                            onChangeText = {(text)=> {
                                this.setState({
                                    firstName: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Last Name'}
                            maxLength = {8}
                            onChangeText = {(text)=> {
                                this.setState({
                                    lastName: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Contact'}
                            maxLength = {10}
                            keyboardType = {'numeric'}
                            onChangeText = {(text)=> {
                                this.setState({
                                    contact: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Address'}
                            multiline = {true}
                            onChangeText = {(text)=> {
                                this.setState({
                                    address: text
                                })
                            }}
                            />
                            <TextInput
                            style = {styles.formTextInput}
                            placeholder = {'Country currency code'}
                            maxLength = {20}
                            onChangeText = {(text)=> {
                                this.setState({
                                    currencyCode: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Email ID'}
                            keyboardType = {'email-address'}
                            onChangeText = {(text)=> {
                                this.setState({
                                    emailId: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Password'}
                            secureTextEntry = {true}
                            onChangeText = {(text)=> {
                                this.setState({
                                    password: text
                                })
                            }}
                            />
                            <TextInput 
                            style = {styles.formTextInput}
                            placeholder = {'Confrim Password'}
                            secureTextEntry = {true}
                            onChangeText = {(text)=> {
                                this.setState({
                                    confirmPassword: text
                                })
                            }}
                            />
                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity
                                style = {styles.registerButton}
                                onPress = {()=>{
                                    this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                                }}
                                >
                                    <Text>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity
                                style = {styles.cancelButton}
                                onPress = {()=>{
                                    this.setState({
                                        isModalVisible: false
                                    })
                                }}
                                >
                                    <Text style = {{color: 'red'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
            )
        }

    render()
    {
        return(
           
                <View>
                    {this.showModal()}
                    <MyHeader 
                    title = 'Barter' 
                    navigation = {this.props.navigation}
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
                            this.setState({
                                isModalVisible: true
                            })
                        }}
                        >
                            <Text style = {styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          
        )
    }
}

const styles = StyleSheet.create({
    loginBox:{ 
        width: 300, 
        height: 40, 
        borderBottomWidth: 1.5, 
        borderColor : '#ff8a65', 
        fontSize: RFValue(20), 
        margin:10, 
        paddingLeft:10 ,
        alignSelf: 'center'
    }, 
    button:{
        width:300, 
        height:50, 
        justifyContent:'center', 
        alignItems:'center', 
        borderRadius:25, 
        backgroundColor:"#ff9800", 
        shadowColor: "#000",
        alignSelf: 'center',
        padding: 10,
        marginTop: 20
    },
    buttonText:{ 
        color:  '#ffff', 
        fontWeight: '200', 
        fontSize:   RFValue(20),
    }, 
    modalContainer:{ 
        flex:1, 
        borderRadius:20, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ffff", 
        marginRight:30, 
        marginLeft : 30, 
        marginTop:80, 
        marginBottom:80, 
    },
    modalTitle :{ 
        justifyContent:'center', 
        alignSelf:'center', 
        fontSize:RFValue(30), 
        color:'#ff5722', 
        margin:50
    }, 
    formTextInput:{ 
        width:"75%", 
        height:35, 
        alignSelf:'center', 
        borderColor:'#ffab91', 
        borderRadius:10, 
        borderWidth:1, 
        marginTop:20, 
        padding:10 
    }, 
    registerButton:{ 
        width:200, 
        height:40, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderRadius:10, 
        marginTop:30,
        alignSelf: 'center'
    }, 
    registerButtonText:{ 
        color:'#ff5722', 
        fontSize:RFValue(15), 
        fontWeight:'bold' 
    }, 
    cancelButton:{ 
        width:200, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:5, 
        alignSelf: 'center'
    }
})