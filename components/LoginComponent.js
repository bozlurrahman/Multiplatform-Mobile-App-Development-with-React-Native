import React, { Component } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { Card, Icon, Input, Text, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios' || Platform.OS === 'android' ) {
            SecureStore.getItemAsync('userinfo')
                .then((userdata) => {
                    let userinfo = JSON.parse(userdata);
                    if (userinfo) {
                        this.setState({username: userinfo.username});
                        this.setState({password: userinfo.password});
                        this.setState({remember: true})
                    }
            })
        }
    }

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (Platform.OS === 'ios' || Platform.OS === 'android' ) {
            if (this.state.remember)
                SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                    .catch((error) => console.log('Could not save user info', error));
            else
                SecureStore.deleteItemAsync('userinfo')
                    .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Input style={styles.formRow} placeholder="Username" leftIcon={{type: 'font-awesome', name: 'user-o'}} onChangeText={text => this.setState({username: text})} />
                <Input style={styles.formRow} placeholder="Password" leftIcon={{type: 'font-awesome', name: 'key'}} onChangeText={text => this.setState({password: text})} />
                <CheckBox title="Remember Me" center checked={this.state.remember} onPress={() => this.setState({remember: !this.state.remember})} />
                <View style={styles.formButton}>
                    <Button onPress={() => this.handleLogin()} title="Login" color="#512DA8" />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        margin: 0,
    },
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;