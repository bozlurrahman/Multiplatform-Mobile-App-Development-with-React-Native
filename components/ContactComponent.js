// Please Use Updated version of navigation plugins, Otherwise assignment may not work.
// "@react-navigation/drawer": "^5.11.5",
// "@react-navigation/native": "^5.9.0",
// "@react-navigation/stack": "^5.13.0",
// "react-native": "~0.63.4",
// "react-native-elements": "^3.1.0",
import React, {Component} from 'react'
import { Card, Button, Icon } from 'react-native-elements';
import {Text} from 'react-native'
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

export class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  sendMail() {
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })
  }

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
      <Card>
        <Card.Title>Contact Information</Card.Title>
          
        <Text>
          {`121, Clear Water Bay Road

Clear Water Bay, Kowloon

HONG KONG

Tel: +852 1234 5678

Fax: +852 8765 4321

Email:confusion@food.net`}
        </Text>
        <Button
          title="Send Email"
          buttonStyle={{backgroundColor: "#512DA8"}}
          icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
          onPress={this.sendMail}
          />
      </Card>
      </Animatable.View>
    )
  }
}

export default Contact
