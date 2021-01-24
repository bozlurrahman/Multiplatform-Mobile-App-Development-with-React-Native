// Please Use Updated version of navigation plugins, Otherwise assignment may not work.
// "@react-navigation/drawer": "^5.11.5",
// "@react-navigation/native": "^5.9.0",
// "@react-navigation/stack": "^5.13.0",
// "react-native": "~0.63.4",
// "react-native-elements": "^3.1.0",
import React, { Component } from 'react';
import { Button, Image, Text, View, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import About from './AboutComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function LogoTitle(props) {
    console.log('props::', props);
    return (
        <TouchableOpacity  activeOpacity = { .5 } onPress={ props.toggleTheDwawer }>
            <Image style={{ width: 50, height: 50 }}
                source={require('./images/logo.png')}
            />
        </TouchableOpacity>
    );
}
function HomeNavigator({navigation}) {
    const toggleTheDwawer = () => navigation.toggleDrawer()

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle: {backgroundColor: "#512DA8"},
            headerTitleStyle: {color: "#fff"},
            headerTintColor: "#fff"  
        }}>
            <Stack.Screen name="Home" component={Home}
                options={ ({navigation}) => ({ 
                    title: 'Home', drawerLabel: 'Home', 
                    headerLeft: () => <LogoTitle toggleTheDwawer={toggleTheDwawer} />,
                    headerRight: () => (
                        <Button onPress={() => toggleTheDwawer()} title="Toggle Dwawer" />
                    )
                })}
            />
        </Stack.Navigator>
    );
}

function MenuNavigator(prop) {
    return (
        <Stack.Navigator initialRouteName="Menu" screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Dishdetail" component={Dishdetail} />
        </Stack.Navigator>
    );
}

function AboutNavigator(prop) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="About" component={About} options={{title: "About Us"}} />
        </Stack.Navigator>
    );
}

function ContactNavigator(prop) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="Contact" component={Contact} options={{title: "Contact Us"}} />
        </Stack.Navigator>
    );
}

class Main extends Component {

    render() {
 
        return (
            <NavigationContainer>                
                <Drawer.Navigator initialRouteName="Home" 
                    drawerStyle={{backgroundColor: '#D1C4E9'}}
                    statusBarAnimation="fade"
                    screenOptions={{ drawerBackgroundColor: '#D1C4E9'}}>
                    <Drawer.Screen name="Home" component={HomeNavigator}
                        options={{ title: 'Home', drawerLabel: 'Home'}}
                    />
                    <Drawer.Screen 
                        name="Menu" component={MenuNavigator} 
                        options={{ title: 'Menu', drawerLabel: 'Menu'}}
                    >                        
                    </Drawer.Screen>
                    <Drawer.Screen name="About" component={AboutNavigator} options={{ title: 'About Us', drawerLabel: 'About Us'}} />
                    <Drawer.Screen name="Contact" component={ContactNavigator} options={{ title: 'Contact Us', drawerLabel: 'Contact Us'}} />                        
                </Drawer.Navigator>

            </NavigationContainer>
        );
    }
}
  
export default Main;