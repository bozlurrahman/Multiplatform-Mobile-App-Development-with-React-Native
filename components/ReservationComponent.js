import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button } from 'react-native';
import { Card } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';
// import DatePicker from 'react-native-datepicker'
import RNDateTimePicker from '@react-native-community/datetimepicker'

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    handleReservation() {
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            showDatePicker: false
        });
    }
    
    render() {
        return(
            <ScrollView>
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
                        title="Reserve" color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
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
    }
});

export default Reservation;