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
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                    }) 
                }
            />
            <Stack.Screen name="Dishdetail" component={Dishdetail} options={{
                title: 'Dish Details', drawerLabel: 'Dish Details', 
            }}/>
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

function ReservationNavigator(prop) {
    return (
        <Stack.Navigator  screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="Reservation" component={Reservation}
                options={ ({navigation}) => ({ 
                    title: 'Reserve Table', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                }) }
            />
        </Stack.Navigator>
    );
}

function FavoritesNavigator(prop) {
    return (
        <Stack.Navigator  screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="Favorites" component={Favorites}
                options={ ({navigation}) => ({ 
                    title: 'My Favorites', 
                    headerLeft: () => <Icon name="menu" size={24} color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />,                      
                }) }
            />
        </Stack.Navigator>
    );
}

function LoginNavigator(prop) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#512DA8'},
            headerTintColor: '#fff',
            headerTitleStyle: {color: '#fff'},
        }}>
            <Stack.Screen name="Login" component={Login}
                options={ ({navigation}) => ({ 
                    title: 'Login', 
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

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
 
        return (
            <NavigationContainer>                
                <Drawer.Navigator initialRouteName="Home" 
                    drawerStyle={{backgroundColor: '#D1C4E9'}}
                    screenOptions={{ drawerBackgroundColor: '#D1C4E9'}}
                    drawerContent={props => <CustomDrawerContentComponent {...props} />} >
                    <Drawer.Screen name="Login" component={LoginNavigator} options={{ 
                        title: 'Login', drawerLabel: 'Login',
                        drawerIcon: ({tintColor}) => ( <Icon name="sign-in" type="font-awesome" size={22} color={tintColor} />)
                    }} />                     
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
                    <Drawer.Screen name="Favorites" component={FavoritesNavigator} options={{ 
                        title: 'My Favorites', drawerLabel: 'My Favorites',
                        drawerIcon: ({tintColor}) => ( <Icon name='heart' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />)
                    }} /> 
                    <Drawer.Screen name="Reservation" component={ReservationNavigator} options={{ 
                        title: 'Reserve Table', drawerLabel: 'Reserve Table',
                        drawerIcon: ({tintColor}) => ( <Icon name='cutlery' type='font-awesome' size={24} iconStyle={{ color: tintColor }} />)
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);