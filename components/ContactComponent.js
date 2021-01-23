import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements';

export default class Contact extends Component {

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {

        return (
            <View>
                <Card>
                    <Card.Title style={{ fontWeight: 'bold', fontSize: 15 }}>Contact Information</Card.Title>
                    <Card.Divider /> 
                    <Text style={{ margin: 10, lineHeight: 35, fontSize: 14 }}>
              {`121, Clear Water Bay Road
Clear Water Bay, Kowloon
HONG KONG
Tel: +852 1234 5678
Fax: +852 8765 4321
Email:confusion@food.net`}
            </Text>
                </Card>
            </View>
        )
    }
}