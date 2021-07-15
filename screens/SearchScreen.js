import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import db from '../config'
import { ListItem} from 'react-native-elements'
import {Header} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import { RFValue } from 'react-native-responsive-fontsize';

export default class SearchScreen extends React.Component{

    constructor(props)
    {
        super(props)
        this.state = {
            search: '',
            requestedBarterList: []
        }
        this.requestRef = null
    }

    getRequestedBarterList = () => {
        this.requestRef = db.collection('itemRequests')
        .onSnapshot((snapshot)=>{
            var requestedBarterList = snapshot.docs.map(document=> document.data())
            this.setState({
                requestedBarterList: requestedBarterList
            })
        })
    }

    componentDidMount = () => {
        this.getRequestedBarterList()
    }

    componentWillUnmount = () => {
        this.requestRef()
    }

    keyExtractor = (item, index) => {
        index.toString()
    }

    renderItem = ({item, i}) => {
        return (
            <ListItem 
            key = {i}
            title = {item.item_name}
            subtitle = {item.item_description}
            titleStyle = {{color: 'black', fontWeight: 'bold'}}
            rightElement = {
                <TouchableOpacity 
                style = {styles.button}
                onPress = {()=> {
                    this.props.navigation.navigate('UserDetails', {'details': item})
                }}
                >
                    <Text style = {{color: "black"}}>Exchange</Text>
                </TouchableOpacity>
            }
            bottomDivider
            />
        )
    }

    render()
    {
        return(
            <View style = {{flex: 1}}>
               <View>
                    <MyHeader 
                    title = 'Barter' 
                    navigation = {this.props.navigation}
                    />
               </View>
               <View>
               {
                            this.state.requestedBarterList.length===0
                            ?(
                                <View style = {styles.subContainer}>
                                    <Text style = {{fontSize: RFValue(20)}}>List of all requested books</Text>
                                </View>
                            )
                            :(
                                <FlatList
                                keyExtractor = {this.keyExtractor}
                                data = {this.state.requestedBarterList}
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
    subContainer:{ 
        flex:1, 
        fontSize: RFValue(20), 
        justifyContent:'center', 
        alignItems:'center' 
    }, 
    button:{ 
        width:100, 
        height:30, 
        justifyContent:'center', 
        alignItems:'center', 
        backgroundColor:"#ff5722", 
        shadowColor: "#000", 
        shadowOffset: { 
            width: 0, 
            height: 8 
        } 
    } 
})