import * as React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
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
            itemDescription: '',
            isExchangeRequestActive: '',
            userDocId: '',
            requestedItemName: '',
            itemStatus: '',
            docId: '',
            requestedItemName: ''
        }
    }

    componentDidMount = () => {
        this.getIsItemRequestActive()
        this.getItemRequest()
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
            'request_id': randomRequestId,
            'item_status': 'requested',
            'date': firebase.firestore.FieldValue.serverTimestamp()
        })
        
        this.setState({
            itemName: '',
            itemDescription: ''
        })

        return alert('Barter Requested Successfully');
    }

    getIsItemRequestActive = () => {
        db.collection('users').where('email_id', '==', this.state.userId)
        .onSnapshot((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                this.setState({
                    isItemRequestActive: doc.data().isItemRequestActive, 
                    userDocId: doc.id
                })
            })
        })
    }

    getItemRequest = () => {
        var bookRequest = db.collection('itemRequests').where('user_id', '==', this.state.userId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                if(doc.data().item_status!=='received')
                {
                    this.setState({
                        requestId: doc.data().request_id,
                        requestedItemName: doc.data().item_name,
                        itemStatus: doc.data().item_status,
                        docId: doc.id
                    })
                }
            })
        })
    }

    updateItemRequestStatus = () => {
        //updating the book status after receiving the book
        db.collection('itemRequests').doc(this.state.docId).update({
            item_status: 'received'
        })
        //getting the doc id to update the users doc
        db.collection('users').where('email_id', '==', this.state.userId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                db.collection('users').doc(doc.id).update({
                    isExchangeRequestActive: false
                })
            })
        })
    }

    sendNotification = () => {
        db.collection('users').where('user_id', '==', this.state.userId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                var name = doc.data().first_name
                var lastName = doc.data().last_name

                //to get the donor id and the book name
                db.collection('notifications').where('request_id', '==', this.state.requestId).get()
                .then((snapshot)=> {
                    snapshot.forEach((doc)=> {
                        var donorId = doc.data().donor_id
                        var itemName = doc.data().book_name

                        //target user id is the donor id to send notification to the user
                        db.collection('notifications').add({
                            targeted_user_id: donorId,
                            message: name+' '+ lastName + ' received the item '+itemName,
                            notification_status: 'unread',
                            item_name: itemName
                        })
                    })
                })
            })
        })
    }

    receivedItem = (itemName) => {
        var userId = this.state.userId
        var requestId = this.state.requestId

        db.collection('receivedBooks').add({
            user_id: userId,
            request_id: requestId,
            item_name: itemName,
            item_status: 'received'
        })
    }

    render()
    {
        if(this.state.isExchangeRequestActive === true)
        {
            return(
                <View style = {{flex: 1, justifyContent: 'center'}}>
                    <View style = {{borderColor: 'orange', borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                        <Text>Item Name: </Text>
                        <Text>{this.state.requestedItemName}</Text>

                    </View>
                    <View style = {{borderColor: 'orange', borderWidth: 2, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10}}>
                        <Text>
                            Item Status: 
                        </Text>
                        <Text>{this.state.itemStatus}</Text>
                    </View>
                    <TouchableOpacity 
                    style = {{borderWidth: 1, borderColor: 'orange', backgroundColor: 'orange', width: 300, alignSelf: 'center', alignItems: 'center', height: 30, marginTop: 30}}
                    onPress = {()=> {
                        this.updateItemRequestStatus()
                        this.sendNotification()
                        this.receivedItem(this.state.requestedItemName)
                    }}
                    >
                        <Text>I have received the item</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                
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
               
            )
        }
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