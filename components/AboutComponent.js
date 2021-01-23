import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { Avatar, Card, ListItem } from 'react-native-elements'
import { LEADERS } from '../shared/leaders';


function History({ item, index }) {
    return (
        <ListItem key={index}>
            <Avatar title={item.name} source={require('./images/alberto.png')} rounded />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: '900', fontSize: 14}}>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 12 }}>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    );
}
export default class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        }
    }

    static navigationOptions = {
        title: 'About Us'
    }

    render() {
        return (
            <View>
                <Card>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: 15 }}>Our History</Card.Title>
                    <Card.Divider /> 
                    <Text style={{ margin: 10, lineHeight: 25, fontSize: 13 }}>
              {`Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.

The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.`}
            </Text>
                </Card>
                <Card>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: 15 }}>Corporate Leadership</Card.Title>
                    <Card.Divider />
                    <FlatList
                        data={this.state.leaders}
                        renderItem={History}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </View>
        )
    }
}