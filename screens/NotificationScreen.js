import * as React from 'react'
import { View, Text, FlatList } from 'react-native'
import {Header, ListItem, Icon} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'
import MyHeader from '../components/MyHeader'

export default class NotificationScreen extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            userId: firebase.auth().currentUser.email,
            allNotifications: []
        }
        this.notificationRef = null;
    }

    componentDidMount = () => {
        this.getNotifications()
    }

    componentWillUnmount = () => {
        this.notificationRef()
    }

    getNotifications = () => {
        this.notificationRef = db.collection('notifications').where('notification_status', '==', 'unread')
        .where('targeted_user_id', '==', this.state.userId)
        .onSnapshot((snapshot)=> {
            var allNotifications = []
            snapshot.docs.map((doc)=> {
                var notifications = doc.data()
                notifications["doc_id"] = doc.id
                allNotifications.push(notifications)
            })
            this.setState({
                allNotifications: allNotifications
            })
        })
    }

    keyExtractor = (item, index)=>index.toString()

    renderItem = ({item, index}) => {
        return(
            <ListItem 
            key = {index}
            leftElement = {<Icon name = 'item' type = 'font-awesome' color = 'white' />}
            title = {item.item_name}
            titleStyle = {{color: 'black', fontWeight: 'bold'}}
            subtitle = {item.message}
            bottomDivider
            />
        )
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
                <View style = {{flex: 0.9}}>
                    {
                        this.state.allNotifications.length === 0
                        ?
                        (
                            <View>
                                <Text>You have no notifications</Text>
                            </View>
                        )
                        :
                        (
                            <FlatList 
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allNotifications}
                            renderItem = {this.renderItem}
                            />
                        )
                    }
                </View>
            </View>
        )
    }
}