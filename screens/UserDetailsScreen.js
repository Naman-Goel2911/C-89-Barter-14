import * as React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header, Icon, Card} from 'react-native-elements'
import MyHeader from '../components/MyHeader'

export default class UserDetailsScreen extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            receiverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')['request_id'],
            itemName: this.props.navigation.getParam('details')["item_name"],
            itemDescription: this.props.navigation.getParam('details')['item_description'],
            itemValue: this.props.navigation.getParam('details')['item_value'],
            userName: '',
            userContact: '',
            userAddress: '',
            userRequestDocId: '',
            userName: ''
        }
    }

    componentDidMount()
    {
        this.getUserDetails()
    }

    getUserDetails = () => {
        db.collection('users').where('email_id', '==', this.state.receiverId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=> {
                this.setState({
                    userName: doc.data().first_name,
                    userContact: doc.data().contact,
                    userAddress: doc.data().address,
                })
            })
        })
        db.collection('itemRequests').where('request_id', '==', this.state.requestId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                this.setState({
                    receiverRequestDocId: doc.id,
                })
            })
        })
    }

    updateItemStatus = () => {
        db.collection('MyBarters').add({
            item_name: this.state.itemName,
            exchanger_name: this.state.requestId,
            exchanger_contact: this.state.userContact,
            exchanger_address: this.state.userAddress,
            exchanger_name2: this.state.userId,
            request_status: 'donorInterested'
        })
    }

    addNotifications = () => {
        var message = this.state.userName+' has shown interest in exchanging the item'
        db.collection('notifications').add({
            targeted_user_id: this.state.receiverId,
            donor_id: this.state.userId,
            request_id: this.state.requestId,
            book_name: this.state.itemName,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            notification_status: 'unread',
            message: message,
            item_name: this.state.itemName
        })
    }

    render()
    {
        return(
            <View style = {{flex: 1}}>
                 <View style = {{flex: 0.1}}>
                    <MyHeader 
                    title = 'Barter' 
                    navigation = {this.props.navigation}
                    />
                </View>
                <View style = {{flex: 0.6}}>
                    <Card
                    title = {'Item Information'}
                    titleStyle = {{fontSize: 20}}
                    >
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Name: {this.state.itemName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Description: {this.state.itemDescription}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Value: {this.state.itemValue}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style = {{flex: 0.3}}>
                <Card
                    title = {'Receiver Information'}
                    titleStyle = {{fontSize: 20}}
                    >
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Name: {this.state.receiverId}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Contact: {this.state.userContact}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Address: {this.state.userAddress}
                            </Text>
                        </Card>
                    </Card>
                </View>
                <View style = {styles.buttonContainer}>
                    {
                        this.state.receiverId !== this.state.userId
                        ?(
                            <TouchableOpacity
                            style = {styles.button}
                            onPress = {()=> {
                                this.updateItemStatus()
                                this.addNotifications()
                                this.props.navigation.navigate('DrawerNavigator')
                            }}
                            >
                                <Text>I want to donate</Text>
                            </TouchableOpacity>
                        )
                        : null
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { flex:1, }, 
    buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, 
    button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } 
})