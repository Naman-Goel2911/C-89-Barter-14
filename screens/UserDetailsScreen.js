import * as React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import firebase from 'firebase'
import db from '../config'
import {Header, Icon, Card} from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize'

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
            userName: '',
            receiverRequestDocId: '',
            currencyCode: ''
        }
    }

    componentDidMount()
    {
        this.getUserDetails()
        this.getData()
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

    getCurrencyCode = () => {
        db.collection('users').where('email_id', '==', this.state.userId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                this.setState({
                    currencyCode: doc.data().currencyCode
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
        db.collection('itemRequests').doc(this.state.receiverRequestDocId).update({
            item_status: 'donorInterested'
        })
    }

    getData = () => {
        fetch('http://data.fixer.io/api/latest?access_key=f686450866f20da33500fcb2411d00e2')
        .then(response=> {
            return response.json()
        })
        .then(responseData=> {
            var currencyCode = this.state.currencyCode
            var currency = responseData.rates.INR
            var value = 69/currency
            var valueOfCurrencyCode = Math.round(value)
            this.setState({
                itemValue: valueOfCurrencyCode
            })
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
            <ScrollView style = {{flex: 1}}>
                 <View style = {{flex: 0.1}}>
                 <Header
                  leftComponent={
                    <Icon
                      name="arrow-left"
                      type="feather"
                      color="#ffffff"
                      onPress={() => this.props.navigation.goBack()}
                    />
                  }
                  centerComponent={{
                    text: "Barter",
                    style: {
                      color: "#ffffff",
                      fontSize: RFValue(20),
                      fontWeight: "bold",
                    },
                  }}
                  backgroundColor="#32867d"
                />
                </View>
                <View
                    style={{
                      flex: 0.6,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: RFValue(25),
                        textAlign: "center",
                      }}
                    >
                      {this.state.itemName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: RFValue(15),
                        textAlign: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      {this.state.itemDescription}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: RFValue(15),
                        textAlign: "center",
                        marginTop: RFValue(15),
                      }}
                    >
                      {this.state.itemValue}
                    </Text>
                  </View>
                <View style = {{flex: 0.3}}>
                <View
                  style={{
                    flex: 0.7,
                    padding: RFValue(20),
                  }}
                >
                  <View style={{ flex: 0.7 ,justifyContent:'center',alignItems:'center',marginTop:RFValue(50),borderWidth:1,borderColor:'#deeedd',padding:RFValue(10)}}>
                    <Text
                      style={{
                        fontWeight: "500",
                        fontSize: RFValue(30),
                      }}
                    >
                      Reciever Information
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: RFValue(20),
                        marginTop: RFValue(30),
                      }}
                    >
                      Name : {this.state.userName}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: RFValue(20),
                        marginTop: RFValue(30),
                      }}
                    >
                      Contact: {this.state.userContact}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: RFValue(20),
                        marginTop: RFValue(30),
                      }}
                    >
                      Address: {this.state.userAddress}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {this.state.recieverId !== this.state.userId ? (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          this.updateBookStatus();
                          this.addNotification();
                          this.props.navigation.navigate("Home");
                        }}
                      >
                        <Text>I want to Barter</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({ 
    container: { flex:1, }, 
    buttonContainer : { flex:0.3, justifyContent:'center', alignItems:'center' }, 
    button:{ width:200, height:50, justifyContent:'center', alignItems : 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation : 16 } 
})