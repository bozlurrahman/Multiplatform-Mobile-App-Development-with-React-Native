// Please Use Updated version of navigation plugins, Otherwise assignment may not work.
// "@react-navigation/drawer": "^5.11.5",
// "@react-navigation/native": "^5.9.0",
// "@react-navigation/stack": "^5.13.0",
// "react-native": "~0.63.4",
// "react-native-elements": "^3.1.0",
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { Button, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './HomeComponent';
import About from './AboutComponent'
import Contact from './ContactComponent'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigator(prop) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle: {backgroundColor: "#512DA8"},
            headerTitleStyle: {color: "#fff"},
            headerTintColor: "#fff"  
        }}>
            <Stack.Screen name="Home" component={Home}
                options={{ title: 'Home', drawerLabel: 'Home'}}
            />
            {/* <Stack.Screen name="Menu" component={Menu} options={{ dishes: dishes, title: 'Main Menu' }} /> */}
            {/* <Stack.Screen name="Dishdetail" component={Dishdetail} options={{ dishes: dishes, onPress: onPress }} /> */}
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
            <Stack.Screen name="About" component={About} />
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
            <Stack.Screen name="Contact" component={Contact} options={{title: "About Us"}} />
        </Stack.Navigator>
    );
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }
    onDishSelect(dishId) {
        this.setState({selectedDish: dishId})
    }
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
                    <Drawer.Screen name="About" component={AboutNavigator} />
                    <Drawer.Screen name="Contact" component={ContactNavigator} />                        
                </Drawer.Navigator>

            </NavigationContainer>
        );
    }
}
  
export default Main;