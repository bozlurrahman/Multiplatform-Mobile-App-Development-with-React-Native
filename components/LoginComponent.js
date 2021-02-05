import React, { Component } from 'react';
import { View, StyleSheet, Platform, Text, ScrollView, Image } from 'react-native';
import { Card, Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { baseUrl } from '../shared/baseUrl';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

class LoginTab extends Component {

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
            <ScrollView>
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title="Register"
                        clear
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'blue'
                            />
                        }
                        titleStyle={{
                            color: "blue"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }

}

class RegisterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                this.processImage(capturedImage.uri);
            }
        }

    }
    
    getImageFromGallery = async() => {
        let pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [3, 4],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })

        if( !pickedImage.cancelled ){
            console.log(pickedImage)
            this.processImage(pickedImage.uri)
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri, 
            [
                {resize: {width: 400}}
            ],
            {compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        console.log(processedImage);
        this.setState({imageUrl: processedImage.uri });

    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (Platform.OS === 'ios' || Platform.OS === 'android' ) {
            if (this.state.remember)
                SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
                    .catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return(
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{uri: this.state.imageUrl}} 
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} 
                        />
                    <Button
                        title="Camera"
                        onPress={this.getImageFromCamera}
                        /> 
                    <Button
                        title='Gallery'
                        onPress={this.getImageFromGallery}
                        />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    />
                <Input
                    placeholder="First Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => this.setState({firstname})}
                    value={this.state.firstname}
                    />
                <Input
                    placeholder="Last Name"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => this.setState({lastname})}
                    value={this.state.lastname}
                    />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleRegister()}
                        title="Register"
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'            
                                size={24}
                                color= 'white'
                            />
                        }
                        buttonStyle={{
                            backgroundColor: "#512DA8"
                        }}
                        />
                </View>
            </View>
            </ScrollView>
        );
    }
}

class Login extends Component {

    render() {
        return (
            <Tab.Navigator
                tabBarOptions={{
                    activeBackgroundColor: '#9575CD',
                    inactiveBackgroundColor: '#D1C4E9',
                    activeTintColor: '#ffffff',
                    inactiveTintColor: 'gray'
                }}
            >
                <Tab.Screen name="Login" component={LoginTab}  options={
                    ({ route }) => ({
                        title: 'Login',
                        tabBarIcon: ({ tintColor }) => <Icon name='sign-in' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />,
                    })
                } />
                <Tab.Screen name="Register" component={RegisterTab} options={
                    ({ route }) => ({
                        title: 'Register',
                        tabBarIcon: ({ tintColor }) => <Icon name='user-plus' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />,
                    })
                }/>
            </Tab.Navigator>
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
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
      margin: 10,
      width: 80,
      height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 20
    }
});

export default Login;