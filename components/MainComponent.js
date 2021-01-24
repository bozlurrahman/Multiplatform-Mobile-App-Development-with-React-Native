// Please Use Updated version of navigation plugins, Otherwise assignment may not work.
// "@react-navigation/drawer": "^5.11.5",
// "@react-navigation/native": "^5.9.0",
// "@react-navigation/stack": "^5.13.0",
// "react-native": "~0.63.4",
// "react-native-elements": "^3.1.0",
import React, { Component } from 'react';
import { Button, Image, Text, View, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import About from './AboutComponent'
import Menu from './MenuComponent';
import Contact from './ContactComponent'
import Dishdetail from './DishdetailComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigator({navigation}) {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle: {backgroundColor: "#512DA8"},
            headerTitleStyle: {color: "#fff"},
            headerTintColor: "#fff"  
        }}>
            <Stack.Screen name="Home" component={Home}
                options={ ({navigation}) => ({ 
                    title: 'Home', drawerLabel: 'Home', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                }) }
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
            <Stack.Screen name="Menu" component={Menu} 
                options={ ({navigation}) => ({  
                    title: 'Dish Details', drawerLabel: 'Dish Details', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                    }) 
                }
            />
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
            <Stack.Screen name="About" component={About}
                options={ ({navigation}) => ({ 
                    title: 'About Us', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                }) }
            />
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
            <Stack.Screen name="Contact" component={Contact}
                options={ ({navigation}) => ({ 
                    title: 'Contact Us', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                }) }
            />
        </Stack.Navigator>
    );
}


function CustomDrawerContentComponent({ progress, ...rest }) {
    const translateX = Animated.interpolate(progress, {
      inputRange: [0, 1],
      outputRange: [-100, 0],
    });
  
    return (
      <DrawerContentScrollView {...rest}>
        <Animated.View style={{ transform: [{ translateX }] }}>
            {/* <DrawerItem label="Help" onPress={() => alert('Link to help')} /> */}
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...rest} />
        </Animated.View>
      </DrawerContentScrollView>
    );
}


class Main extends Component {

    render() {
 
        return (
            <NavigationContainer>                
                <Drawer.Navigator initialRouteName="Home" 
                    drawerStyle={{backgroundColor: '#D1C4E9'}}
                    screenOptions={{ drawerBackgroundColor: '#D1C4E9'}}
                    drawerContent={props => <CustomDrawerContentComponent {...props} />} >
                    <Drawer.Screen name="Home" component={HomeNavigator}
                        options={{ 
                            title: 'Home', drawerLabel: 'Home',
                            drawerIcon: ({tintColor}) => ( <Icon name="home" type="font-awesome" size={24} color={tintColor} />)
                        }}
                    />
                    <Drawer.Screen 
                        name="Menu" component={MenuNavigator} 
                        options={{ 
                            title: 'Menu', drawerLabel: 'Menu',
                            drawerIcon: ({tintColor}) => ( <Icon name="list" type="font-awesome" size={24} color={tintColor} />)
                        }}
                    >                        
                    </Drawer.Screen>
                    <Drawer.Screen name="About" component={AboutNavigator} options={{ 
                        title: 'About Us', drawerLabel: 'About Us',
                        drawerIcon: ({tintColor}) => ( <Icon name="info-circle" type="font-awesome" size={24} color={tintColor} />)
                    }} />
                    <Drawer.Screen name="Contact" component={ContactNavigator} options={{ 
                        title: 'Contact Us', drawerLabel: 'Contact Us',
                        drawerIcon: ({tintColor}) => ( <Icon name="address-card" type="font-awesome" size={22} color={tintColor} />)
                    }} />                        
                </Drawer.Navigator>

            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
});
  
export default Main;