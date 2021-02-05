import { Animated, Image, StyleSheet, View } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import { Button, CheckBox, Icon, Input } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store';
import React, { Component } from 'react';

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      remember: false
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync('userinfo')
      .then((userdata) => {
        let userinfo = JSON.parse(userdata);

        if (userinfo) {
          this.setState({ username: userinfo.username });
          this.setState({ password: userinfo.password });
          this.setState({ remember: true });
        }
      });
  };

  handleLogin() {
    console.log(JSON.stringify(this.state));

    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify(
          {
            username: this.state.username,
            password: this.state.password
          }
        )
      ).catch((error) => console.log('Could not save user info', error));
    } else {
      SecureStore.deleteItemAsync('userinfo')
        .catch((error) => console.log('Could not delete user info', error));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Input
          containerStyle={styles.formInput}
          leftIcon={{ type: 'font-awesome', name: 'user-o' }}
          onChangeText={(username) => this.setState({ username })}
          placeholder='Username'
          value={this.state.username}
        />
        <Input
          containerStyle={styles.formInput}
          leftIcon={{ type: 'font-awesome', name: 'key' }}
          onChangeText={(password) => this.setState({ password })}
          placeholder='Password'
          value={this.state.password}
        />
        <CheckBox
          center
          checked={this.state.remember}
          containerStyle={styles.formCheckbox}
          onPress={() => this.setState({ remember: !this.state.remember })}
          title='Remember Me'
        />
        <View style={styles.formButton}>
          <Button
            buttonStyle={{ backgroundColor: '#512DA8' }}
            icon={<Icon name='sign-in' type='font-awesome' color='#fff' />}
            onPress={() => this.handleLogin()}
            size={24}
            title='Login'
          />
        </View>
        <View style={styles.formButton}>
          <Button
            clear
            icon={<Icon name='user-plus' type='font-awesome' color='blue' />}
            onPress={() => this.props.navigation.navigate('Register')}
            size={24}
            title='Register'
            titleStyle={{ color: 'blue' }}
          />
        </View>
      </View>
    );
  };
};

class RegisterTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      imageUrl: baseUrl + 'images/logo.png',
      lastname: '',
      password: '',
      remember: false,
      username: ''
    }
  }

  getImageFromCamera = async () => {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);

    if (cameraPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!capturedImage.cancelled) {
        this.processImage(capturedImage.uri);
      }
    }
  };

  getImageFromGallery = async () => {
    const galleryPermission = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    if (galleryPermission.status === 'granted') {
      let galleryImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!galleryImage.cancelled) {
        this.processImage(galleryImage.uri);
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: 'png' }
    );

    this.setState({ imageUrl: processedImage.uri });
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));

    if (this.state.remember) {
      SecureStore.setItemAsync(
        'userinfo',
        JSON.stringify(
          {
            email: this.state.email,
            firstname: this.state.firstname,
            imageUrl: this.state.imageUrl,
            lastname: this.state.lastname,
            password: this.state.password,
            username: this.state.username
          }
        )
      ).catch((error) => console.log('Could not save user info', error));
    } else {
      SecureStore.deleteItemAsync('userinfo')
        .catch((error) => console.log('Could not delete user info', error));
    }
  };

  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              loadingIndicatorSource={require('./images/logo.png')}
              source={{ uri: this.state.imageUrl }}
              style={styles.image}
            />
            <Button
              onPress={this.getImageFromCamera}
              title='Camera'
            />
            <Button
              onPress={this.getImageFromGallery}
              title='Gallery'
            />
          </View>

          <Input
            containerStyle={styles.formInput}
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(username) => this.setState({ username })}
            placeholder='Username'
            value={this.state.username}
          />
          <Input
            containerStyle={styles.formInput}
            leftIcon={{ type: 'font-awesome', name: 'key' }}
            onChangeText={(password) => this.setState({ password })}
            placeholder='Password'
            value={this.state.password}
          />
          <Input
            containerStyle={styles.formInput}
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(firstname) => this.setState({ firstname })}
            placeholder='First Name'
            value={this.state.firstname}
          />
          <Input
            containerStyle={styles.formInput}
            leftIcon={{ type: 'font-awesome', name: 'user-o' }}
            onChangeText={(lastname) => this.setState({ lastname })}
            placeholder='Last Name'
            value={this.state.lastname}
          />
          <Input
            containerStyle={styles.formInput}
            leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
            onChangeText={(email) => this.setState({ email })}
            placeholder='Email'
            value={this.state.email}
          />
          <CheckBox
            center
            checked={this.state.remember}
            containerStyle={styles.formCheckbox}
            onPress={() => this.setState({ remember: !this.state.remember })}
            title='Remember Me'
          />
          <View style={styles.formButton}>
            <Button
              buttonStyle={{ backgroundColor: '#512DA8' }}
              icon={<Icon name='user-plus' type='font-awesome' color='#fff' />}
              onPress={() => this.handleRegister()}
              size={24}
              title='Register'
            />
          </View>
        </View>
      </Animated.ScrollView>
    );
  };
};

const Tab = createBottomTabNavigator();

const Login = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'Login') {
            iconName = 'sign-in';
          } else if (route.name === 'Register') {
            iconName = 'user-plus';
          }

          return <Icon type='font-awesome' name={iconName} size={24} color={color} />;
        },
      })}
      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        activeTintColor: '#fff',
        inactiveBackgroundColor: '#D1C4E9',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name="Login" component={LoginTab} />
      <Tab.Screen name="Register" component={RegisterTab} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
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
    marginBottom: 20
  },
  formCheckbox: {
    marginBottom: 20,
    backgroundColor: null
  },
  formButton: {
    marginBottom: 20
  }
});

export default Login;