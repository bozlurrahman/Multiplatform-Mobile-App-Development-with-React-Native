import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

const contactInfo = [
    '121, Clear Water Bay Road',
    'Clear Water Bay, Kowloon',
    'HONG KONG',
    'Tel: +852 1234 5678',
    'Fax: +852 8765 4321',
    'Email:confusion@food.net'
];

const RenderContact = ({ contactInfo }) => {
    
    if ( Array.isArray(contactInfo) && contactInfo.length >=1 ) {
        return(
        <View>
            {contactInfo.map( (PieceOfInfo, index) => (
                <Text key={index} style={{margin: 10}}>
                    {PieceOfInfo}
                </Text> )
            )}
        </View> );
    } 
    return(<View></View>);
}


class Contact extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    };

    render() {

        const styles = StyleSheet.create({
            hrStyle:{
                borderWidth: 1,
                borderColor:'lightgrey',
                margin: 8 },
            cardHeaderStyle:{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 5
            }});

        return(
          <ScrollView>
            <Card>
              <Text style={styles.cardHeaderStyle}>Contact Information</Text>
              <View style={styles.hrStyle} />
              <RenderContact contactInfo={contactInfo} />
            </Card>
          </ScrollView>
        );
    }
}

export default Contact;