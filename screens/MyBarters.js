import * as React from 'react'
import {Text, View, StyleSheet} from 'react-native'
import {Header} from 'react-native-elements'
import firebase from 'firebase'
import db from '../config'

export default class MyBarters extends React.Component{
    static navigationOptions = { header: null }

    constructor()
    {
        super()
        this.state = {
            userId: firebase.auth().currentUser.email,
            donorName: '',
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
            var myBarters = snapshot.docs.map(document => document.data());
            this.setState({
                allDonations: myBarters
            })
        })
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item, i}) => {
        <ListItem 
        key = {i}
        title = {item.item_name}
        subtitle = {'Receiver: ' + item.exchanger_name2+'n/status' + item.request_status}
        leftElement = {<Icon name = 'item' type = 'font-awesome' color = '#696969' />}
        titleStyle = {{color: 'black', fontWeight: 'bold'}}
        rightElement = {
            <TouchableOpacity style = {styles.button}>
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
                    <Header 
                    centerComponent = {{text: 'My Barters', style: {color: 'black', fontSize: 20, fontWeight: 'bold'}}}
                    backgroundColor = '#9c8210'
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