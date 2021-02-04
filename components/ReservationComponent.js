import React, { Component } from 'react';
import { Alert, Button, Modal, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
// import DatePicker from 'react-native-datepicker'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false,
            showModal: false
        }
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }
    
    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false,
            showModal: false
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }),
        });
        
        // due to depricated function presentLocalNotificationAsync, i use scheduleNotificationAsync function
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your Reservation',
                body: 'Reservation for '+ date + ' requested',
                sound: true, // 'email-sound.wav', // <- for Android below 8.0
                color: '#512DA8',
                vibrate: true,
            },
            trigger: null,
        });
        // taken a short note for future use.
        // Notifications.scheduleNotificationAsync({
        //     content: {
        //       title: 'Remember to drink water!',
        //     },
        //     trigger: {
        //       seconds: 5,
        //       repeats: true
        //     },
        // });

    }

    render() {
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={3000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking} onTintColor='#512DA8'
                        onValueChange={(value) => this.setState({smoking: value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <Button onPress={() => this.setState({showDatePicker: true}) }
                        title="Show Date Picker" color="#512DA8"/>
                    { this.state.showDatePicker && <RNDateTimePicker style={{flex: 2, marginRight: 20}} format=''
                        mode="datetime" placeholder="select date and Time"
                        confirmBtnText="Confirm" cancelBtnText="Cancel" value={this.state.date || new Date()}
                        onChange={(event, date) => {this.setState({date: date, showDatePicker: false})}}
                    />}
                </View>
                <View style={styles.formRow}>
                    <Button onPress={() => this.handleReservation()}
                        onPress= {() => {
                            Alert.alert(
                                'Your Reservation OK?',
                                'Number of guest: ' +this.state.guests + '\n' +
                                'Smoking?: ' + this.state.smoking + '\n' +
                                'Date and Time: ' + this.state.date + '\n',
                                [
                                    { 
                                        text: 'Cancel', 
                                        onPress: () => this.resetForm(),
                                        style: ' cancel'
                                    },
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            this.resetForm();
                                            this.presentLocalNotification(this.state.date);
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );
                        }}
                        title="Reserve" color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => { this.toggleModal(); this.resetForm(); } }
                    onRequestClose = {() => { this.toggleModal();  this.resetForm(); } }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date.toDateString()}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
                </Animatable.View>
            </ScrollView>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;