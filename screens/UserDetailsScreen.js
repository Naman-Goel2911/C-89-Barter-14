import * as React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header, Icon} from 'react-native-elements'

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
                    receiverName: doc.data().first_name,
                    receiverContact: doc.data().contact,
                    receiverAddress: doc.data().address,
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
            item_name: this.state.bookName,
            exchanger_name: this.state.requestId,
            exchanger_contact: this.state.userContact,
            exchanger_address: this.state.userAddress,
            exchanger_name2: this.state.userId,
            request_status: 'donorInterested'
        })
    }

    render()
    {
        return(
            <View style = {{flex: 1}}>
                 <View style = {{flex: 0.1}}>
                    <Header 
                    leftComponent = {<Icon name = 'arrow-left' type = 'feather' color = 'black' onPress = {()=> {
                        this.props.navigation.goBack()
                    }}
                    centerComponent = {{text: 'Barter Item', style: {color: 'black', fontSize: 20, fontWeight: 'bold'}}}
                    />}
                    backgroundColor = 'yellow'
                    />
                </View>
                <View style = {{flex: 0.3}}>
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
                                Description: {this.state.item_description}
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
                                Name: {this.state.receiverName}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Contact: {this.state.receiverContact}
                            </Text>
                        </Card>
                        <Card>
                            <Text style = {{fontWeight: 'bold'}}>
                                Address: {this.state.receiverAddress}
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