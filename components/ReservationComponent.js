import React,{Component} from 'react';
import {Alert,Text,View,StyleSheet,Picker,Switch,Button,Platform} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import Moment from 'moment';
class Reservation extends Component{
    constructor(props){
        super(props);
        this.state={
            guests: 1,
            smoking:false,
            date:new Date(),
            dateEnd:''
        }
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({
            date:currentDate
        })
      };

    static navigationOptions={
        title:'Reserve Table'
    }
    resetForm(){
        this.setState({
            guests: 1,
            smoking:false,
            date:new Date(),
            showModal: false
        });
    }
    handleReservation(){
        this.addReservationToCalendar();
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+this.state.guests+"\nSmoking? "+this.state.smoking+"\nDate and Time: "+this.state.date,
            [
                {
                    text:'Cancel',
                    onPress: ()=>this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: ()=>{
                        this.presentLocalNotification(this.state.date);
                        this.resetForm()
                    }
                }
            ],
            {cancelable:false}
        )
        console.log(JSON.stringify(this.state));
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+ date + ' requested',
            ios: {
                sound: true,
                _displayInForeground: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to calendar');
            }
        }
        return permission;
    }

    async addReservationToCalendar() {

        await this.obtainCalendarPermission();

        let dateCurr = Date.parse(this.state.date);
        let endDate = new Date(dateCurr + 3600 * 2 * 1000);

        const defaultCalendarSource=Platform.OS==='ios'?await this.getDefaultCalendarSource()
        : { isLocalAccount: true, name: 'Expo Calendar' };

        const defaultCalendarId=await Calendar.createCalendarAsync({
            title: 'Your Reservation at Con Fusion',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source : defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        });

        await Calendar.createEventAsync(defaultCalendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: this.state.date,
            endDate: endDate,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
    }

    render(){
        return(
            <ScrollView>
                <Animatable.View animation="zoomIn" duration={1000} >
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue,itemIndex)=> this.setState({guests:itemValue})}
                    >
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
                    <Switch style={styles.formItem}
                        value={this.state.smoking}
                        trackColor='#512DA8'
                        onValueChange={(value)=> this.setState({smoking:value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <DateTimePicker style={{flex:6,marginRight:20}}
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={330}
                        value={this.state.date}
                        mode='datetime'
                        display="default"
                        type='date'
                        customStyles={{
                            dateIcon:{
                                position:'absolute',
                                left:0,
                                top:4,
                                marginLeft:0
                            },
                            dateInput:{
                                marginLeft:36
                            }
                        }}
                        onChange={this.onChange}
                    />
                </View>
                <View style={styles.formRow}>
                    <Button
                        title='Reserve'
                        color='#512DA8'
                        onPress={()=>this.handleReservation()}
                        accessibilityLabel='Learn more about this purple button'
                    />

                </View>
                </Animatable.View>
            </ScrollView>
        )
    }
}

const styles=StyleSheet.create({
    formRow:{
        alignItems : 'center',
        justifyContent : 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    formLabel:{
        fontSize:18,
        flex:2
    },
    formItem:{
        flex:1
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
        padding:20
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