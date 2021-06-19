import * as React from 'react'
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {Header, ListItem, Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class MyBarters extends React.Component{
    static navigationOptions = { header: null }

    constructor()
    {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            userName: '',
            MyBarters: []
        }
        this.requestRef = null
    }

    componentDidMount = () => {
        this.getAllBarters()
    }

    componentWillUnmount()
    {
        this.requestRef()
    }

    getAllBarters = () => {
        this.requestRef = db.collection('MyBarters').where('exchanger_name2', '==', this.state.userId)
        .onSnapshot((snapshot)=> {
            var myBarters = []
            snapshot.docs.map((doc)=> {
                var donation = doc.data()
                donation['doc_id']= doc.id
                myBarters.push(donation)
            });
            this.setState({
                MyBarters: myBarters
            })
        })
    }

    sendNotification = (itemDetail, requestStatus) => {
        var requestId = itemDetail.request_id
        var donorId = itemDetail.donor_id
        db.collection('notifications').where('request_id', '==', requestId)
        .where('donor_id', '==', donorId).get()
        .then((snapshot)=> {
            snapshot.forEach((doc)=> {
                var message = ''
                if(requestStatus === 'itemSent')
                {
                    message = this.state.donorName+' sent you the item'
                }
                else{
                    message = this.state.donorName+ ' has shown interest in exchanging the item'
                }
                db.collection('notifications').doc(doc.id).update({
                    message: message,
                    notification_status: 'unread',
                    date: firebase.firestore.FieldValue.serverTimestamp()
                })
            })  
        })
    }

    sendItem = (itemDetails) => {
        if(itemDetails.request_status === "itemSent")
        {
            var requestStatus = 'donorInterested'
            db.collection('all_donations').doc(itemDetails.doc_id).update({
                request_status: 'donorInterested'
            })
            this.sendNotification(itemDetails, requestStatus)
        }
        else{
            var requestStatus = 'itemSent'
            db.collection('all_donations').doc(itemDetails.doc_id).update({
                request_status: 'itemSent'
            })
            this.sendNotification(itemDetails, requestStatus)
        }
    }


    keyExtractor = (item, index) => index.toString()

    renderItem = ({item, i}) => {
        <ListItem 
        key = {i}
        title = {item.item_name}
        subtitle = {'Receiver: ' + item.exchanger_name2+'n/status' + item.request_status}
        leftElement = {<Icon name = 'book' type = 'font-awesome' color = '#696969' />}
        titleStyle = {{color: 'black', fontWeight: 'bold'}}
        rightElement = {
            <TouchableOpacity 
            style = {styles.button}
            onPress = {()=> {
                this.sendItem()
            }}
            >
                <Text style = {{color: '#ffff'}}>Send Item</Text>
            </TouchableOpacity>
        }
        bottomDivider
        />  
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
                <View style = {{flex: 1}}>
                    {
                        this.state.MyBarters.length === 0 
                        ?(
                            <View style = {styles.subtitle}>
                                <Text style = {{fontSize: 20}}>
                                    List of all barters
                                </Text>
                            </View>
                        )
                        :(
                            <FlatList 
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.MyBarters}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width:200, 
        height:50, 
        justifyContent:'center', 
        alignItems : 'center', 
        borderRadius: 10, 
        backgroundColor: 'orange', 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 8 
        }, 
        elevation : 16 
    },
    subtitle: {
        color: 'red', 
        fontSize: 20, 
        fontWeight: 'bold'
    }
})